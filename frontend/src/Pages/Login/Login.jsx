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
} from '@chakra-ui/react'
import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Redux/AuthReducer/action';
export default function Login() {
    const [email, setEmial] = useState("");
    const [pass, setPass] = useState("");
    const dispatch = useDispatch();
    const isAuth = useSelector(st => st.AuthReducer);
    console.log(isAuth);
    const handleSubmit = () => {
        console.log(email, pass);
        dispatch(login({ email, pass }));
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
                            Sign in
                        </Button>
                        <Button colorScheme={'red'} variant={'solid'}>
                            <Flex justifyContent={"center"} gap={5}>
                                <FcGoogle width={"40px"} /><Text>Contine With Google</Text>
                            </Flex>
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