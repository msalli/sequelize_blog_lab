var fs        = require('fs')
  , path      = require('path')
  , Sequelize = require('sequelize')
  , lodash    = require('lodash')
  , env       = process.env.NODE_ENV || 'development'
  , config    = require(__dirname + '/../config/config.json')[env]
  , sequelize = new Sequelize(config.database, config.username, config.password, config)
  , db        = {}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

//Associations
db.author.hasMany(db.post);
db.post.belongsTo(db.author);

//Create function, to see if the associations we have set up are working
db.post.create({content: "NEW POST NEW POST!"})
  .success(function (post) {
    db.author.find(1)
    .success(function (author) {
      //clobbering the old posts
      //maybe there is a getPosts, and then push to an array? 
      //instances documentation might be helpful? 
      author.setPosts([post])
      .success(function (author) {
        console.log(author)
      })
    });
  });

//test test
// db.post.create({content: "This is a post, this is a post!"})
//   .success(function (postObj){
//     console.log("postObj", postObj);
//   });

//   db.author.create({name: "Emily Sanderson"})
//     .success(function (authorObj) {
//       console.log("this is our author object", authorObj);
//     });


module.exports = lodash.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db)
