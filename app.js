//jshint esversion:6
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const ServerlessHttp = require('serverless-http');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const posts = Array();

const app = express();

app.set('view engine', 'ejs');    //For rendering ejs

app.use(bodyParser.urlencoded({extended: true}));     //for recieving input from client
app.use(express.static("public"));                    //for rendering styles and images from public folder




app.get('/',function (req,res) { 
  res.render('home.ejs',{data: posts});
  // console.log(posts);

});


app.get('/about',function (req,res) { 
  res.render('about.ejs',{data: aboutContent});
});

app.get('/contact',function (req,res) { 
  res.render('contact.ejs',{data: contactContent});
});

app.get('/compose',function (req,res) { 
  res.render('compose.ejs');
});

app.post('/compose',function(req,res){
  let post = {
    title: req.body.composeTitle,
    bodyData: req.body.composeData
  }
  posts.push(post);
  res.redirect('/');
});

// express parameter routing (access passed path)

app.get('/posts/:something',function(req,res){
  console.log(req.params.something);          

  let param = _.lowerCase(req.params.something);
  
  posts.forEach(function(post){
    if(_.lowerCase(post.title) === param){
      res.render('post',{data:post});
    }
    else{
      console.log('Not found!');
    }
  })
});


module.exports = ServerlessHttp(app)


// app.listen(process.env.PORT||3000, function() {
//   console.log("Server started on port 3000");
// });
