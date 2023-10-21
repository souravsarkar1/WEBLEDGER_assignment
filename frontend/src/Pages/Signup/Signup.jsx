import {
    Button,
    Flex,
    Text,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Image,
    InputGroup,
    InputRightElement,
    useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { AiFillGithub } from 'react-icons/ai'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { githubAuth, register } from '../../Redux/AuthReducer/action'
import ButtonLoader from '../../Components/Loader/ButtonLoader'
import { Link, useNavigate } from 'react-router-dom'
export default function Signup() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({ email: '', pass: '', age: "", name: "" });
    const dispatch = useDispatch();
    const toast = useToast();
    const isSignupLoading = useSelector(st=>st.AuthReducer.isSignupLoading);
    const navigation = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    //to={'https://github.com/login/oauth/authorize?client_id=35b6f2085fc9c793b59d&scope=user:email'}
    const handleSubmit = () => {
        console.log(formData);
        if (!formData.email || !formData.pass || !formData.age || !formData.name) {
            toast({
                title: 'Please fill all the filed',
                description: "Fill all the filed",
                status: 'error',
                duration: 2000,
                isClosable: true,
                position : "top"
              })
        } else {
            dispatch(register(formData,toast)).then((res)=>{
                navigation("/login")
            })
        }
        
    }

    const handleGithubAuth = () => {
        dispatch(githubAuth(toast));
    }

    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={4} w={'full'} maxW={'md'}>
                    <br />
                    <br />
                    <Heading fontSize={'2xl'}>Create your account</Heading>
                    <FormControl id="email">
                        <FormLabel>Name</FormLabel>
                        <Input type="text" value={formData.name} name='name' onChange={handleInputChange} placeholder='Enter Your Email' />
                    </FormControl>
                    <FormControl id="email">
                        <FormLabel>Age</FormLabel>
                        <Input type="text" value={formData.age} name='age' onChange={handleInputChange} placeholder='Enter Your Age' />
                    </FormControl>
                    <FormControl id="email">
                        <FormLabel>Email address</FormLabel>
                        <Input type="email" value={formData.email} name='email' onChange={handleInputChange} placeholder='Enter Your Email' />
                    </FormControl>
                    <FormControl id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <Input type={showPassword ? 'text' : 'password'} value={formData.pass} name='pass' onChange={handleInputChange} placeholder='Enter your Password' />
                            <InputRightElement h={'full'}>
                                <Button
                                    variant={'ghost'}
                                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <Stack spacing={6}>

                        <Button colorScheme={'blue'} variant={'solid'} onClick={handleSubmit}>
                           {isSignupLoading ? <ButtonLoader/> : " Sign in"}
                        </Button>
                        <Button colorScheme={'red'} variant={'solid'} onClick={handleGithubAuth}>
                            <a href={'https://github.com/login/oauth/authorize?client_id=35b6f2085fc9c793b59d&scope=user:email'}>                                <Flex justifyContent={"center"} gap={5}>
                                <AiFillGithub width={"40px"} /><Text>Contine With GitHub</Text>
                            </Flex>
                            </a>

                        </Button>
                        <Button colorScheme={'green'} variant={'solid'}>
                            <Link to={"/login"}>Already Have A Account? Login!</Link>
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
            <Flex flex={1}>
                <Image
                    alt={'Login Image'}
                    objectFit={'cover'}
                    src={
                        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
                    }
                />
            </Flex>
        </Stack>
    )
}