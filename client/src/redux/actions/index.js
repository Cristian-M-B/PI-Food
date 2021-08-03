import axios from 'axios';
import {GET_RECIPES} from './constants.js'

export default function getRecipes() {
    return function(dispatch) {
        return axios.get(`https://api.spoonacular.com/recipes/complexSearch?&apiKey=aea355740bbe4714b19e849dffa11bd9&addRecipeInformation=true&number=5`)
        .then((response) => {
            dispatch({
                type: GET_RECIPES,
                payload: response.data
            })
        })
    }
}