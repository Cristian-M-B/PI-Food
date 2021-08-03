const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Recipe', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    score: {
      type: DataTypes.FLOAT,
    },
    healthScore: {
      type: DataTypes.FLOAT,
    },
    dishTypes: {
      type: DataTypes.STRING,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
  });
};
