const { DataTypes } = require('sequelize');
const { v4: uuidv4} = require('uuid') // HACERLO EN EL ROUTER DE DOGS
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height_max: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    height_min:{
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    weight_max:{
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    weight_min:{
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    lifeSpan: {
      type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'add'
    }
  });
};
