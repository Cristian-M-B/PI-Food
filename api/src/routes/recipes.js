const express = require('express')
const router = express.Router()
const axios = require('axios');
require('dotenv').config();
const { Recipe, Type, Op } = require('../db');
const {API_KEY} = process.env;

async function getAllRecipes(){

}

async function getRecipesByName(name) {

}

router.get('/', async (req, res) => {
    let { name, filter } = req.query;

    if(filter){
        // allRecipes = getRecipesByName(name);
        // allRecipes.length > 0 ? res.json(allRecipes) : res.send('Recipe Not Found');
        try {
            let dbRecipesPromise = await Recipe.findAll({
            include: Type
            });
            let dbRecipes=[];
            dbRecipesPromise.forEach(recipe => {
                recipe.Types.forEach(diet => {
                    diet.name === filter && dbRecipes.push({
                        id: recipe.id,
                        name: recipe.name,
                        image: recipe.image,
                        score: recipe.score,
                        diets: recipe.Types.map(diet => diet.name),
                        dishTypes: recipe.dishTypes
                    })
                })
            })

            let apiRecipesPromise = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?&apiKey=${API_KEY}&addRecipeInformation=true&number=5`)
            let apiRecipes = [];
            apiRecipesPromise.data.results.forEach(recipe => {
                recipe.diets.forEach(diet => {
                    diet === filter && apiRecipes.push({
                        id: recipe.id,
                        name: recipe.title,
                        image: recipe.image,
                        score: recipe.spoonacularScore,
                        diets: recipe.diets.map(diet => diet),
                        dishTypes: recipe.dishTypes.map(dish => dish),
                    })
                })
            })


            let allRecipes = dbRecipes.concat(apiRecipes);
            return allRecipes.length ? res.status(200).json(allRecipes) : res.status(200).send("Recipe Not Found");


        } catch (error) {
            return res.status(400).send(error);
        }
    }
    if(name){
        // allRecipes = getRecipesByName(name);
        // allRecipes.length > 0 ? res.json(allRecipes) : res.send('Recipe Not Found');
        try {
            let dbRecipesPromise = await Recipe.findAll({
                where: { name: { [Op. iLike]: `%${name}%` } },
                include: Type
            });
            let dbRecipes = dbRecipesPromise.map(recipe => {
                return {
                    id: recipe.id,
                    name: recipe.name,
                    image: recipe.image,
                    score: recipe.score,
                    diets: recipe.Types.map(diet => diet.name),
                    dishTypes: recipe.dishTypes
                }
            })
            let apiRecipesPromise = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?&apiKey=${API_KEY}&addRecipeInformation=true&query=${name}`)
            let apiRecipes = apiRecipesPromise.data.results.map(recipe => {
                return {
                    id: recipe.id,
                    name: recipe.title,
                    image: recipe.image,
                    score: recipe.spoonacularScore,
                    diets: recipe.diets.map(diet => diet),
                    dishTypes: recipe.dishTypes.map(dish => dish),
                }
            })
            let allRecipes = dbRecipes.concat(apiRecipes);
            allRecipes.length ? res.status(200).json(allRecipes) : res.status(200).send("Recipe Not Found");
        } catch (error) {
            res.status(400).send(error);
        }
    } else {
        // allRecipes = getAllRecipes();
        // res.json(allRecipes);
        try {
            let dbRecipesPromise = await Recipe.findAll({
                include: Type
            });
            let dbRecipes = dbRecipesPromise.map(recipe => {
                return {
                    id: recipe.id,
                    name: recipe.name,
                    image: recipe.image,
                    score: recipe.score,
                    diets: recipe.Types.map(diet => diet.name),
                    dishTypes: recipe.dishTypes
                }
            })
            let apiRecipesPromise = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?&apiKey=${API_KEY}&addRecipeInformation=true&number=1`)
            let apiRecipes = apiRecipesPromise.data.results.map(recipe => {
                return {
                    id: recipe.id,
                    name: recipe.title,
                    image: recipe.image,
                    score: recipe.spoonacularScore,
                    diets: recipe.diets.map(diet => diet),
                    dishTypes: recipe.dishTypes.map(dish => dish),
                }
            })
            let allRecipes = dbRecipes.concat(apiRecipes)
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
                let dbRecipesPromise = await Recipe.findOne({
                    where: {id},
                    include: Type
                });
                let dbRecipes = {
                        id: dbRecipesPromise.id,
                        name: dbRecipesPromise.name,
                        score: dbRecipesPromise.score,
                        healthScore: dbRecipesPromise.healthScore,
                        summary: dbRecipesPromise.summary,
                        diets: dbRecipesPromise.Types.map(diet => diet.name),
                        dishTypes: dbRecipesPromise.dishTypes,
                        steps: dbRecipesPromise.steps
                    }
                res.status(200).json(dbRecipes);
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
    }
})

router.post('/', async (req, res) => {
    let {name, image, score, healthScore, summary, steps, dishTypes, diets} = req.body;
        try {
            let createRecipe = await Recipe.create({
                name,
                image,
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
})

module.exports = router