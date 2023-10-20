import React, { useEffect, useRef, useState } from 'react';
import { Box, Flex, Input, Select, SimpleGrid } from '@chakra-ui/react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import RecipeCard from './RecipeCard';
import { options } from '../../Data/RecipeData';
import PageLoader from '../../Components/Loader/PageLoader';

const RecipiMain = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [items, setItems] = useState('');
  const [loader, setLoader] = useState(false);
  const ref = useRef(null);

  const debouncedSearch = useRef(
    debounce((searchTerm, option) => {
      setLoader(true);
      axios
        .get(
          `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&maxFat=250&number=200&apiKey=b2db2a372d9d41baa5f9205f1dbd866c&sort=${option}`
        )
        .then((res) => {
          console.log(res.data.results);
          setRecipes(res.data.results);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoader(false);
        });
    }, 1000)
  ).current;

  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    debouncedSearch(searchTerm, selectedOption);
    setItems(searchTerm);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    debouncedSearch(items, selectedOption);
  }, [items, selectedOption, debouncedSearch]);

  if (loader) {
    return (
      <Flex height="100vh" justify="center" align="center">
        <PageLoader />
      </Flex>
    );
  }

  return (
    <Box p={4}>
      <br />
      <br />
      <br />

      <Flex direction="row" align="center" justify="center" gap={4}>
        <Select id="options" value={selectedOption} onChange={handleOptionChange} mb={4}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
        <Input
          value={items}
          onChange={handleInputChange}
          placeholder="Enter your item"
          mb={4}
          ref={ref}
        />
      </Flex>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
        {Array.isArray(recipes) &&
          recipes?.map((recipe) => <RecipeCard key={recipe.id} {...recipe} />)}
      </SimpleGrid>
    </Box>
  );
};

export default RecipiMain;
