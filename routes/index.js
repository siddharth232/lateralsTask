var express = require('express');
var router = express.Router();
var Dictionary=require('oxford-dictionary');
var config={
  app_id:'e9e81222',
  app_key:'ce799100c5286ea7d6a73ee04418c248',
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
  console.log(req.params.word);
  var lookup=dict.definitions(req.params.word);
  lookup.then(function(resp){
    console.log(JSON.stringify(resp,null,4));
    res.send('1');
    console.log('crct');
    console.log(req.params.word);
  },function(err){
    console.log(err+':err');
    res.send('0');
    console.log('wrong');
    console.log(req.params.word);
  })
});

module.exports = router;
