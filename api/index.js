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
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('is listening at 3001'); // eslint-disable-line no-console
    // precargar la base de datos con los tipos
    let vegetarianType = Type.create({
      name: "vegetarian",
    });
    let pescetarianType = Type.create({
      name: "pescetarian",
    });
    let veganType = Type.create({
      name: "vegan",
    });
    let glutenFreeType = Type.create({
      name: "gluten free",
    });
    let paleolithicType = Type.create({
      name: "paleolithic",
    });
    let dairyFreeType = Type.create({
      name: "dairy free",
    });
    let whole30Type = Type.create({
      name: "whole30",
    });
    let primalType = Type.create({
      name: "primal",
    });
    let ketogenicType = Type.create({
      name: "ketogenic",
    });
    let lactoOvoVegetarianType = Type.create({
      name: "lacto ovo vegetarian",
    });
    Promise.all([vegetarianType, pescetarianType, veganType, glutenFreeType, paleolithicType, dairyFreeType, whole30Type, primalType, ketogenicType, lactoOvoVegetarianType
    ])
      .then(res => {
        console.log("Tipos precargados");
      })
  });
});
