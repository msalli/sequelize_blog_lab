//creating a model for our post entries

function Post(sequelize, DataTypes) {
  //post is the model name
  return sequelize.define('post', {
    //specifying column name
    content: DataTypes.TEXT,
  });
};

//makes this available to any file that will need to require it
module.exports = Post;