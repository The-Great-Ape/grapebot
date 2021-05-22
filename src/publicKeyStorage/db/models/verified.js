/*eslint-disable*/
const {
    Model,
  } = require('sequelize');
  
  module.exports = (sequelize, DataTypes) => {
    class Verified extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
        // define association here
      }
    }
    Verified.init({
      discordId: DataTypes.STRING,
      discordServerId: DataTypes.STRING,
      generatedUserToken: DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'Verified',
    });
    return Verified;
  };
  