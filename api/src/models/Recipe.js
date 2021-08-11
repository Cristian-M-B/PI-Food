const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Recipe', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    score: {
      type: DataTypes.FLOAT,
    },
    healthScore: {
      type: DataTypes.FLOAT,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dishTypes: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
  });
};
