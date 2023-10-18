import React, { useEffect, useState } from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import axios from 'axios';
import RecipeCard from './RecipeCard';

const RecipiMain = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=b2db2a372d9d41baa5f9205f1dbd866c&maxFat=250&number=200&page=1&limit=10000&`
      )
      .then((res) => {
        console.log(res.data);
        setRecipes(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
        {Array.isArray(recipes) &&
          recipes?.map((recipe) => <RecipeCard key={recipe.id} {...recipe} />)}
      </SimpleGrid>
    </Box>
  );
};

export default RecipiMain;
