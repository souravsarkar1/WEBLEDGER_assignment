import { ADD_RECIPES_FAIL, ADD_RECIPES_REQUEST, ADD_RECIPES_SUCESS, GET_RECIPES_FAIL, GET_RECIPES_REQUEST, GET_RECIPES_SUCESS } from "./actionTypes";

const initialState = {
    recipeData: [],
    recipeIsLoading: false,
    recipeIsError: false,
    myAddRecipeData: [],
    myAddRrecipeIsLoading: false,
    myAddRecipeIsError: false,

}

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_RECIPES_REQUEST:
            return { ...state, recipeIsLoading: true }
        case GET_RECIPES_SUCESS:
            return { ...state, recipeData: payload, recipeIsLoading: false }
        case GET_RECIPES_FAIL:
            return { ...state, recipeIsError: true,recipeIsLoading : false }
        case ADD_RECIPES_REQUEST:
            return { ...state, myAddRrecipeIsLoading: true }
        case ADD_RECIPES_SUCESS:
            return { ...state, myAddRrecipeIsLoading: false }
        case ADD_RECIPES_FAIL:
            return { ...state, myAddRecipeIsError: true,myAddRrecipeIsLoading :false }
        default:
            return state;
    }
}