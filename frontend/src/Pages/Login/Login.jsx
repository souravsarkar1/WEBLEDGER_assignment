import {
    Button,
    Checkbox,
    Flex,
    Text,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Image,
    useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { AiFillGithub } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { githubAuth, login } from '../../Redux/AuthReducer/action';
import ButtonLoader from '../../Components/Loader/ButtonLoader';
import { Link, useLocation, useNavigate } from 'react-router-dom';
export default function Login() {
    const [email, setEmial] = useState("");
    const [pass, setPass] = useState("");
    const dispatch = useDispatch();
    const loading = useSelector(st => st.AuthReducer.isLoginLoading);
    const isAuth = useSelector(st => st.AuthReducer.isAuth);
    const toast = useToast();
    const navigate = useNavigate();
    const location = useLocation();



    console.log(isAuth);
    const handleSubmit = () => {
        if (!email || !pass) {
            toast({
                title: 'Invalid credentials',
                description: "Please enter your email address and password",
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: "top"
            })
            return;
        } else {
            console.log(email, pass);
            dispatch(login({ email, pass }, toast)).then((res) => {
                navigate(location.state)
            });
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
                    <Heading fontSize={'2xl'}>Sign in to your account</Heading>
                    <FormControl id="email">
                        <FormLabel>Email address</FormLabel>
                        <Input type="email" value={email} onChange={(e) => setEmial(e.target.value)} placeholder='Enter Your Email' />
                    </FormControl>
                    <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder='Enter your password' />
                    </FormControl>
                    <Stack spacing={6}>
                        <Stack
                            direction={{ base: 'column', sm: 'row' }}
                            align={'start'}
                            justify={'space-between'}>
                            <Checkbox>Remember me</Checkbox>
                            <Text color={'blue.500'}>Forgot password?</Text>
                        </Stack>
                        <Button colorScheme={'blue'} variant={'solid'} onClick={handleSubmit}>
                            {loading ? <ButtonLoader /> : " Login"}
                        </Button>
                        <Button colorScheme={'red'} variant={'solid'} onClick={handleGithubAuth}>
                            <a href={'https://github.com/login/oauth/authorize?client_id=35b6f2085fc9c793b59d&scope=user:email'}>                                <Flex justifyContent={"center"} gap={5}>
                                <AiFillGithub width={"40px"} /><Text>Contine With GitHub</Text>
                            </Flex>
                            </a>

                        </Button>
                        <Button colorScheme={'green'} variant={'solid'}>
                            <Link to={'/signup'}>No Account Create a Account</Link>
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