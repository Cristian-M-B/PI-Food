import axios from 'axios';
import {GET_RECIPES} from './constants.js';
import {GET_DETAIL} from './constants.js';
import {REMOVE_DETAIL} from './constants.js';
import {GET_RECIPES_NAME} from './constants.js';

export function getRecipes() {
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

export function getDetail(id) {
    return async function (dispatch) {
        try {
            let detail = await axios.get(`http://localhost:3001/api/recipes/${id}`)
            return dispatch({
                type: GET_DETAIL,
                payload: detail.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function removeDetail() {
    return{
        type: REMOVE_DETAIL
    }
}


export function getRecipesName(name) {
    return async function (dispatch) {
        try {
            let recipes = await axios.get(`http://localhost:3001/api/recipes?name=${name}`)
            return dispatch({
                type: GET_RECIPES_NAME,
                payload: recipes.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}