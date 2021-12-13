//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Type } = require('./src/db.js');

// Syncing all the models at once.
const PORT = process.env.PORT || 3001

conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`is listening at ${PORT}`); // eslint-disable-line no-console
    // precargar la base de datos con los tipos
    let vegetarianType = Type.create({
      name: "vegetarian",
    });
    let glutenFreeType = Type.create({
      name: "gluten free",
    });
    let dairyFreeType = Type.create({
      name: "dairy free",
    });
    let lactoOvoVegetarianType = Type.create({
      name: "lacto ovo vegetarian",
    });
    let veganType = Type.create({
      name: "vegan",
    });
    let whole30Type = Type.create({
      name: "whole 30",
    });
    let primalType = Type.create({
      name: "primal",
    });
    let pescatarianType = Type.create({
      name: "pescatarian",
    });
    let fodmapFriendlyType = Type.create({
      name: "fodmap friendly",
    });
    let paleolithicType = Type.create({
      name: "paleolithic",
    });
    Promise.all([vegetarianType, glutenFreeType, dairyFreeType, lactoOvoVegetarianType, 
      veganType, whole30Type, primalType, pescatarianType, fodmapFriendlyType, paleolithicType
    ])
      .then(res => {
        console.log("Preloaded types");
      })
  });
});
