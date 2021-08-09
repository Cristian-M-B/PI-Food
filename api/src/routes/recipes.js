const express = require('express')
const router = express.Router()
const axios = require('axios');
require('dotenv').config();
const { Recipe, Type, Op } = require('../db');
const {API_KEY} = process.env;

async function getAllRecipes(){
    try {
        let dbRecipesPromise = await Recipe.findAll();
        let dbRecipes = dbRecipesPromise.map(recite => {
            return {
                id: recite.id,
                name: recite.name,
                image: recite.image,
                score: recite.score,
                diets: recite.Types.map(diet => diet.name),
                dishTypes: recite.dishTypes
            }
        })
        let apiRecipesPromise = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?&apiKey=${API_KEY}&addRecipeInformation=true&number=1`)
        let apiRecipes = apiRecipesPromise.data.results.map(recite => {
            return {
                id: recite.id,
                name: recite.title,
                image: recite.image,
                score: recite.score,
                diets: recite.diets.map(diet => diet),
                dishTypes: recite.dishTypes.map(dish => dish),
            }
        })
        let allRecipes = dbRecipes.concat(apiRecipes);
        // res.status(200).json(allRecipes);
        console.log(allRecipes);
        return allRecipes;
    } catch (error) {
        // res.status(400).send(error);
        console.log(error);
    }
}

async function getRecipesByName(name) {
    try {
        let dbRecipesPromise = await Recipe.findAll({
            where: { name: { [Op.like]: `%${name}%` } },
            include: Type
        });
        let dbRecipes = dbRecipesPromise.map(recite => {
            return {
                id: recite.id,
                name: recite.name,
                image: recite.image,
                score: recite.score,
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
                score: recite.score,
                diets: recite.diets.map(diet => diet),
                dishTypes: recite.dishTypes.map(dish => dish),
            }
        })
        let allRecipes = dbRecipes.concat(apiRecipes);
        // allRecipes.length ? res.status(200).json(allRecipes) : res.status(200).send("Recipe Not Found");
        console.log(allRecipes);
        return allRecipes;
    } catch (error) {
        // res.status(400).send(error);
        console.log(error);
    }
}

router.get('/', async (req, res) => {
    let { name, filter } = req.query;
    // let allRecipes = [];
    if(filter){
        // allRecipes = getRecipesByName(name);
        // allRecipes.length > 0 ? res.json(allRecipes) : res.send('Recipe Not Found');
        try {
            let dbRecipesPromise = await Recipe.findAll({
                include: Type
            });
            let dbiRecipes = [];
            dbRecipesPromise.forEach(recite => {
                recite.Types.forEach( r => {
                   if(r==filter){
                    dbiRecipes.push(recite
                        // id: recite.id,
                        // name: recite.name,
                        // image: recite.image,
                        // score: recite.score,
                        // diets: recite.Types,
                        // dishTypes: recite.dishTypes
                    );
                    console.log(recite);
                   }

                })
            })
            console.log(dbiRecipes)
            return res.json(dbiRecipes);
            let apiRecipesPromise = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?&apiKey=${API_KEY}&addRecipeInformation=true&number=5`)
            let apiRecipes = apiRecipesPromise.data.results.map(recite => {
                return {
                    id: recite.id,
                    name: recite.title,
                    image: recite.image,
                    score: recite.score,
                    diets: recite.diets.map(diet => diet),
                    dishTypes: recite.dishTypes.map(dish => dish),
                }
            })
            let allRecipes = dbiRecipes.concat(apiRecipes);
            return allRecipes.length > 0 ? res.status(200).json(allRecipes) : res.status(200).send("Recipe Not Found");
        } catch (error) {
            return res.status(400).send(error);
        }
    }
    if(name){
        // allRecipes = getRecipesByName(name);
        // allRecipes.length > 0 ? res.json(allRecipes) : res.send('Recipe Not Found');
        try {
            let dbRecipesPromise = await Recipe.findAll({
                where: { name: { [Op.like]: `%${name}%` } },
                include: Type
            });
            let dbiRecipes = dbRecipesPromise.map(recite =>{
                return {
                    id: recite.id,
                    name: recite.name,
                    image: recite.image,
                    score: recite.score,
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
                    score: recite.score,
                    diets: recite.diets.map(diet => diet),
                    dishTypes: recite.dishTypes.map(dish => dish),
                }
            })
            let allRecipes = dbiRecipes.concat(apiRecipes);
            allRecipes.length > 0 ? res.status(200).json(allRecipes) : res.status(200).send("Recipe Not Found");
        } catch (error) {
            res.status(400).send(error);
        }
    } else {
        // allRecipes = getAllRecipes();
        // res.json(allRecipes);
        try {
            let dbRecipesPromise = await Recipe.findAll();
            let apiRecipesPromise = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?&apiKey=${API_KEY}&addRecipeInformation=true&number=1`)
            let apiRecipes = apiRecipesPromise.data.results.map(recite => {
                return {
                    id: recite.id,
                    name: recite.title,
                    image: recite.image,
                    score: recite.spoonacularScore,
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
    let {name, image, score, healthScore, summary, steps, dishTypes, diets} = req.body;
    // if(name && summary){
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
    // } else {
    //     res.send("Falta enviar información")
    // }
})

module.exports = router