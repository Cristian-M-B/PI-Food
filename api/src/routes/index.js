const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const typesRouter = requiere('./types.js');
const recipesRouter = require('./recipes.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.use('/types', typesRouter);
router.use('/recipes', recipesRouter);

module.exports = router;
