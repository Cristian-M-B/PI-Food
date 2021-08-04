import axios from 'axios';
import {GET_RECIPES} from './constants.js'

export default function getRecipes() {
    return async function (dispatch) {
        try {
            let recipes = await axios.get(`http://localhost:3001/api/recipes/`)
            return dispatch({
                type: GET_RECIPES,
                payload: recipes.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}