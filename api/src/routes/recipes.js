const express = require('express')
const router = express.Router()
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const { Recipe, Type, Op } = require('../db');
const {API_KEY} = process.env;

router.get('/', async (req, res) => {
    let { name } = req.query;
    if(name){
        try {
            let dbRecipesPromise = await Recipe.findAll({
                where: { name: { [Op.like]: `%${name}%` } },
                include: Type
            });
            let dbiRecipes = dbRecipesPromise.map(recite =>{
                return {
                    id: recite.id,
                    name: recite.name,
                    diets: recite.Types.map(diet => diet.name),
                    dishTypes: recite.dishTypes
                }
            })
            let apiRecipesPromise = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?&apiKey=${API_KEY}&addRecipeInformation=true&query=${name}`)
            let apiRecipes = apiRecipesPromise.data.results.map(recite => {
                return {
                    id: recite.id,
                    name: recite.title,
                    image: recite.image,
                    diets: recite.diets.map(diet => diet),
                    dishTypes: recite.dishTypes.map(dish => dish),
                }
            })
            let allRecipes = dbiRecipes.concat(apiRecipes);
            allRecipes.length > 0 ? res.status(200).json(allRecipes) : res.status(200).send("No hubo coincidencias");
        } catch (error) {
            res.status(400).send(error);
        }
    } else {
        try {
            let dbRecipesPromise = await Recipe.findAll();
            let apiRecipesPromise = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?&apiKey=${API_KEY}&addRecipeInformation=true&number=1`)
            let apiRecipes = apiRecipesPromise.data.results.map(recite => {
                return {
                    id: recite.id,
                    name: recite.title,
                    image: recite.image,
                    diets: recite.diets.map(diet => diet),
                    dishTypes: recite.dishTypes.map(dish => dish),
                }
            })
            let allRecipes = dbRecipesPromise.concat(apiRecipes)
            res.status(200).json(allRecipes)
        } catch (error){
            console.log(error);
        }
    }
})

router.get('/:id', async (req, res) => {
    let { id } = req.params;
    if(id){
        try {
            if(id.length>10){
                let dbiRecipesPromise = await Recipe.findOne({
                    where: {
                        id
                    },
                    include: Type
                });
                let dbiRecipes = {
                        id: dbiRecipesPromise.id,
                        name: dbiRecipesPromise.name,
                        score: dbiRecipesPromise.score,
                        healthScore: dbiRecipesPromise.healthScore,
                        summary: dbiRecipesPromise.summary,
                        diets: dbiRecipesPromise.Types.map(diet => diet.name),
                        dishTypes: dbiRecipesPromise.dishTypes,
                        steps: dbiRecipesPromise.steps
                    }
                res.status(200).json(dbiRecipes);
            } else {
                let apiRecipesPromise = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?&apiKey=${API_KEY}`)
                let apiRecipes = apiRecipesPromise.data;
                apiRecipes = {
                        id: apiRecipes.id,
                        name: apiRecipes.title,
                        image: apiRecipes.image,
                        score: apiRecipes.spoonacularScore,
                        healthScore: apiRecipes.healthScore,
                        summary: apiRecipes.summary,
                        diets: apiRecipes.diets.map(diet => diet),
                        dishTypes: apiRecipes.dishTypes.map(dish => dish),
                        steps: apiRecipes.analyzedInstructions.map(instruction => {
                            return instruction.steps.map(step => step.step)
                        }).flat()
                    }
                res.status(200).json(apiRecipes);
            }
        } catch (error) {
            res.status(400).send(error);
        }
    } else {
        res.status(400).send('Falta enviar información');
    }
})

router.post('/', async (req, res) => {
    let {name, score, healthScore, summary, steps, dishTypes, diets} = req.body;
    if(name && summary){
        try {
            let createRecipe = await Recipe.create({
                id: uuidv4(),
                name,
                score,
                healthScore,
                dishTypes,
                summary,
                steps
            })
            let newRecipe = await createRecipe.addTypes(diets)
            res.json(newRecipe)
        } catch(error) {
            console.log(error)
        }
    } else {
        res.send("Falta enviar información")
    }
})

module.exports = router