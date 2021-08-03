import { GET_RECIPES } from "../actions/constants";

var initialState = {
    recipes: []
}

function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_RECIPES:
            return {
            ...state,
            recipes: action.payload
        }
        default: return state
    }
}

export default reducer;