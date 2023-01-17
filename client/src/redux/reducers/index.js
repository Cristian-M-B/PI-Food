import { GET_RECIPES } from "../actions/constants";
import { GET_DETAIL } from "../actions/constants";
import { REMOVE_DETAIL } from "../actions/constants";
import { GET_RECIPES_NAME } from "../actions/constants";
import { GET_TYPES } from "../actions/constants";
import { SORT_RECIPES_BY_NAME } from "../actions/constants";
import { SORT_RECIPES_BY_SCORE } from "../actions/constants";
import { FILTER_RECIPES_BY_TYPE } from "../actions/constants";
import { POST_RECIPE } from '../actions/constants';
import { GET_DB_RECIPES } from '../actions/constants';

var initialState = {
    recipes: [],
    apiRecipes: [],
    dbRecipes: [],
    types: [],
    detail: {}
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_RECIPES:
            let r = state.dbRecipes.length ? state.dbRecipes.concat(action.payload) : action.payload;
            return {
                ...state,
                recipes: r,
                apiRecipes: action.payload
            }
        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            }
        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload
            }
        case REMOVE_DETAIL:
            return {
                ...state,
                detail: {}
            }
        case GET_RECIPES_NAME:
            return {
                ...state,
                recipes: action.payload
            }
        case SORT_RECIPES_BY_NAME:
            let sortName = action.payload === 'asc' ?
                state.recipes.sort((a, b) => {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1
                    }
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {
                        return -1
                    }
                    return 0
                })
                : state.recipes.sort((a, b) => {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1
                    }
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {
                        return 1
                    }
                    return 0
                })
            return {
                ...state,
                recipes: sortName
            }
        case SORT_RECIPES_BY_SCORE:
            let sortScore = action.payload === 'lower' ?
                state.recipes.sort((a, b) => {
                    return a.healthScore - b.healthScore
                })
                : state.recipes.sort((a, b) => {
                    return b.healthScore - a.healthScore
                })
            return {
                ...state,
                recipes: sortScore
            }
        case FILTER_RECIPES_BY_TYPE:
            return {
                ...state,
                recipes: action.payload
            }
        case POST_RECIPE:
            return {
                ...state,
            }
        case GET_DB_RECIPES:
            return {
                ...state,
                dbRecipes: action.payload,
                recipes: [...action.payload, ...state.apiRecipes]
            }
        default: return state
    }
}

export default reducer;