import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyRecipes } from '../../Redux/RecipeReducer/action';
import { Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import MyRecipeCard from './MyFctRecipesCard';
import PageLoader from '../../Components/Loader/PageLoader';


const MyFvtRecipes = () => {
  const token = useSelector(st => st.AuthReducer.token);
  const data = useSelector(st => st.RecipeReducer.myRecipe.data);

  const myRecipeLoading = useSelector(st => st.RecipeReducer.myRecipeLoading);
  console.log(data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyRecipes(token))
  }, [dispatch, token]);

  if (myRecipeLoading) {
    return (
      <Flex h={"100vh"} justifyContent={"center"} align={"center"}>
        <PageLoader />
      </Flex>
    )
  }
  return (
    <div>
      <br />
      <br />
      <br />
      <Heading>My Feavriouts </Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
        {data?.map((el) => (
          <MyRecipeCard key={el.id} {...el} />
        ))}
      </SimpleGrid>

    </div>
  )
}

export default MyFvtRecipes
