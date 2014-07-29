var express = require('express'),
  bodyParser = require('body-parser'),
  Author = require('./models/author.js').Author,
  Post = require('./models/post.js').Post,
  app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());


//main page working!
app.get('/index', function (req, res) {
  res.render('index');
});

//set up blog list page!
app.get('/index/blog', function (req, res) {
  res.render('blog');
});

app.post('/index', function (req, res) {
  var newPost = req.body.post;
  Post.prototype = _.create(Post.prototype, {content: newPost});
  console.log(newPost);
  res.redirect('/blog');
});




app.listen(3000, function () {
  console.log("THE SERVER IS LISTENING ON localhost:3000");
});
