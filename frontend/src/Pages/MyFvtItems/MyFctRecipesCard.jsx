import { useState } from 'react'
import {
  Box,
  Text,
  Img,
  Flex,
  Center,
  useColorModeValue,
  HStack,
  Container,
  useToast,
} from '@chakra-ui/react'
import { BsArrowUpRight, BsHeartFill, BsHeart } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMyRecipes } from '../../Redux/RecipeReducer/action'

export default function MyRecipeCard({ image, title, nutrition, _id, }) {
  const [liked, setLiked] = useState(false)
  const token = useSelector(st => st.AuthReducer.token);
  const dispatch = useDispatch();
  const toast = useToast();
  console.log(token);
  const handleButton = () => {
    dispatch(deleteMyRecipes(_id, token, toast));
  }
  return (
    <Center py={6}>
      <Box
        w="xs"
        rounded={'sm'}
        my={5}
        mx={[0, 5]}
        overflow={'hidden'}
        bg="white"
        border={'1px'}
        borderColor="black"
        boxShadow={useColorModeValue('6px 6px 0 black', '6px 6px 0 cyan')}>
        <Box h={'200px'} borderBottom={'1px'} borderColor="black">
          <Img
            src={
              image
            }
            roundedTop={'sm'}
            objectFit="cover"
            h="full"
            w="full"
            alt={'Blog Image'}
          />
        </Box>
        <Box p={4}>
          <Box bg="black" display={'inline-block'} px={2} py={1} color="white" mb={2}>
            {JSON.stringify()}
            {nutrition.nutrients.map((el) => (
              <Container>
                <Text fontSize={'xs'} fontWeight="medium">
                  {el.name}
                </Text>
                <Text fontSize={'xs'} fontWeight="medium">
                  {el.amount + " " + el.unit}
                </Text>

              </Container>
            ))}

          </Box>
          <Text color={'gray.500'} noOfLines={2}>
            {title}
          </Text>
        </Box>
        <HStack borderTop={'1px'} color="black">
          <Flex
            p={4}
            alignItems="center"
            justifyContent={'space-between'}
            roundedBottom={'sm'}
            cursor={'pointer'}
            w="full">
            <Text fontSize={'md'} fontWeight={'semibold'} onClick={handleButton}>
              Delete From Favorite
            </Text>
            <BsArrowUpRight />
          </Flex>
          <Flex
            p={4}
            alignItems="center"
            justifyContent={'space-between'}
            roundedBottom={'sm'}
            borderLeft={'1px'}
            cursor="pointer"
            onClick={() => setLiked(!liked)}>
            {liked ? (
              <BsHeartFill fill="red" fontSize={'24px'} />
            ) : (
              <BsHeart fontSize={'24px'} />
            )}
          </Flex>
        </HStack>
      </Box>
    </Center>
  )
}