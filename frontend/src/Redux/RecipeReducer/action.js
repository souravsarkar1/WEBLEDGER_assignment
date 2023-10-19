import axios from "axios";
import { ADD_RECIPES_FAIL, ADD_RECIPES_REQUEST, ADD_RECIPES_SUCESS, GET_RECIPES_FAIL, GET_RECIPES_REQUEST, GET_RECIPES_SUCESS } from "./actionTypes"
export const getRecipes = (useRef,debounce,searchTerm,option)=>(dispatch)=>{
   return   useRef(
        debounce((searchTerm, option) => {
         // setLoader(true);
         dispatch({type : GET_RECIPES_REQUEST});
          axios
            .get(
              `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&maxFat=250&number=200&apiKey=85a7dcf9acf5476eba0fc6eb2bfd879d&sort=${option}`
            )
            .then((res) => {
             // setRecipes(res.data.results);
             dispatch({type : GET_RECIPES_SUCESS,payload : res.data.results})
            })
            .catch((err) => {
              console.log(err);
              dispatch({type : GET_RECIPES_FAIL});
            })
            .finally(() => {
              //setLoader(false);
            });
        }, 1000)
      ).current;
}



export const addRecipeFvt = (data,token,toast)=>(dispatch)=>{
    dispatch({type : ADD_RECIPES_REQUEST});
    axios.post(`https://webleader.onrender.com/recipe/addrecipe`,data,{
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    }).then((res)=>{
        console.log(res.data);
        dispatch({type : ADD_RECIPES_SUCESS})

    }).catch((err)=>{
        console.log(err.message);
        dispatch({type : ADD_RECIPES_FAIL})
    })
}

export const getMyRecipes = ()=>()=>{

}