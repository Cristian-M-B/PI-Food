const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const typesRouter = requiere('./types.js');
const recipesRouter = require('./recipes.js');
const typesRouter = require('./types.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.use('/types', typesRouter);
router.use('/recipe', recipesRouter);
router.use('/recipes', recipesRouter);
router.use('/types', typesRouter);

module.exports = router
