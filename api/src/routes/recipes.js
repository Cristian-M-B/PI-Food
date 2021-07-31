const express = require('express')
const router = express.Router()
const axios = require('axios');
require('dotenv').config();
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
        } catch (error) {
            res.status(400).send(error);
        }
    } else {
        res.status(400)
    }
})

module.exports = router