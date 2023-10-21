import axios from "axios";
import { ADD_RECIPES_FAIL, ADD_RECIPES_REQUEST, ADD_RECIPES_SUCESS, EREASEDATA, GET_RECIPES_FAIL, GET_RECIPES_REQUEST, GET_RECIPES_SUCESS, MY_RECIPE_GET_RECIPES_FAIL, MY_RECIPE_GET_RECIPES_REQUEST, MY_RECIPE_GET_RECIPES_SUCESS } from "./actionTypes"
export const getRecipes = (useRef, debounce, searchTerm, option) => (dispatch) => {
    return useRef(
        debounce((searchTerm, option) => {
            // setLoader(true);
            dispatch({ type: GET_RECIPES_REQUEST });
            axios
                .get(
                    `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&maxFat=250&number=200&apiKey=85a7dcf9acf5476eba0fc6eb2bfd879d&sort=${option}`
                )
                .then((res) => {
                    // setRecipes(res.data.results);
                    dispatch({ type: GET_RECIPES_SUCESS, payload: res.data.results })
                })
                .catch((err) => {
                    console.log(err);
                    dispatch({ type: GET_RECIPES_FAIL });
                })
                .finally(() => {
                    //setLoader(false);
                });
        }, 1000)
    ).current;
}



export const addRecipeFvt = (data, token, toast) => (dispatch) => {
    dispatch({ type: ADD_RECIPES_REQUEST });
    axios.post(`https://webleader.onrender.com/recipe/addrecipe`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    }).then((res) => {
      //  console.log(res.data);
        dispatch({ type: ADD_RECIPES_SUCESS })
        toast({
            title: 'Add to Features',
            description: "Add this Recipi to your Features",
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top',
        })
    }).catch((err) => {
        console.log(err);
        dispatch({ type: ADD_RECIPES_FAIL })
        toast({
            title: 'Something Went to wrong',
            description: "Bad Request",
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top',
        })
    })
}

export const getMyRecipes = (token) => (dispatch) => {
    dispatch({ type: MY_RECIPE_GET_RECIPES_REQUEST });
    axios.get('https://webleader.onrender.com/recipe/myrecipe', {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    }).then((res) => {
       // console.log(res.data);
        dispatch({ type: MY_RECIPE_GET_RECIPES_SUCESS, payload: res.data })
    }).catch((err) => {
        dispatch({ type: MY_RECIPE_GET_RECIPES_FAIL })
    })
}



export const deleteMyRecipes = (id,token,toast) => (dispatch) => {
    dispatch({ type: ADD_RECIPES_REQUEST });
    axios.delete(`https://webleader.onrender.com/recipe/myrecipe/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    }).then((res) => {
       // console.log(res.data);
        dispatch({ type: ADD_RECIPES_SUCESS })
        toast({
            title: 'Deleted from Features',
            description: "Add this Recipi to your Features",
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top',
        })
    }).catch((err) => {
        //console.log(err.message);
        dispatch({ type: ADD_RECIPES_FAIL })
        toast({
            title: 'Something Went to wrong',
            description: "Bad Request",
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top',
        })
    })
}

export const removeMyData = ()=>(dispatch)=>{
    dispatch({type : EREASEDATA});
}