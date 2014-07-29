//creating a model for author entries

function Author(sequelize, DataTypes) {
  //author is the model name
  return sequelize.define('author', {
    //specifying column name
    name: DataTypes.STRING
  });
};

//makes this available to any file that will need to require this
module.exports = Author;