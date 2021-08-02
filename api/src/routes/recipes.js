const express = require('express')
const router = express.Router()
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const { Recipe } = require('../db');
const {API_KEY} = process.env;

router.get('/', async (req, res) => {
    let { name } = req.query;
    if(name){
        try {
            let apiRecipesPromise = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?&apiKey=${API_KEY}&addRecipeInformation=true&query=${name}`)
            let apiRecipes = apiRecipesPromise.data.results;
            apiRecipes = apiRecipes.map(recite => {
                return {
                    id: recite.id,
                    name: recite.title,
                    image: recite.image,
                    diets: recite.diets.map(diet => diet),
                    dishTypes: recite.dishTypes.map(dish => dish),
                }
            })
            res.status(200).json(apiRecipes);
        } catch (error) {
            res.status(400).send(error);
        }
    } else {
        res.status(400).send("name no ingresado")
    }
})

router.get('/:id', async (req, res) => {
    let { id } = req.params;
    if(id){
        try {
            if(id.length>10){
                let dbiRecipesPromise = await Recipe.findByPk(id);
                res.status(200).json(dbiRecipesPromise);
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
                        })
                    }
                res.status(200).json(apiRecipes);
            }
        } catch (error) {
            res.status(400).send(error);
        }
    } else {
        res.status(400).send('id no ingresado');
    }
})

router.post('/', async (req, res) => {
    let {name, score, healthScore, summary, steps} = req.body;
    if(name && summary){
        try {
            const createdRecipe = await Recipe.create({
                id: uuidv4(),
                name,
                summary,
                score,
                healthScore,
                steps
            })
            res.json(createdRecipe)
        } catch(error) {
            console.log(error)
        }
    } else {
        res.send("Enviar los datos obligatorios")
    }
})

module.exports = router