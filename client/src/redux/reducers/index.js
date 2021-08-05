import { GET_RECIPES } from "../actions/constants";
import { GET_DETAIL } from "../actions/constants";
import { REMOVE_DETAIL } from "../actions/constants";

var initialState = {
    recipes: [],
    detail: {}
}

function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_RECIPES:
            return {
            ...state,
            recipes: action.payload
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
        default: return state
    }
}

export default reducer;