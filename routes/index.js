var express = require('express');
var router = express.Router();
var Dictionary=require('oxford-dictionary');
var config={
  app_id:'ac023d09',
  app_key:'	bef2faa83711a14df79fdf1bff2e7007',
  source_lang:"en-us"
};
var dict=new Dictionary(config);
var roomlist=[];
var socketlist={};
/* GET home page. */
router.get('/',function(req,res,next){
  res.render('Index');
})
router.post('/Game/:username',function(req,res,next){
  roomlist.push({roomname:req.body.room,password:req.body.password,player:req.params.username});
  res.render('index',{username:req.params.username});
})
router.post('/username',function(req,res,next){
  res.render('CreateRoom',{username:req.body.username});
})
router.post('/check/:word',function(req,res,next){
  var lookup=dict.definitions(req.params.word);
  lookup.then(function(resp){
    res.send(1);
  },function(err){
    res.send(0);
  })
});

module.exports = router;
