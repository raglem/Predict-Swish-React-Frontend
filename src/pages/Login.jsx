import api from '../api.js'
import { ACCESS_TOKEN } from '../constants.js' 
import { useNotification } from '../components/Notification'

import { useState, useContext } from "react"
import { useNavigate } from 'react-router-dom'
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react"
import { motion, AnimatePresence } from "framer-motion"
import { UserContext } from '../context/CurrentUser.jsx'
import Loading from '@/components/loading/Loading.jsx'

const MotionFlex = motion.create(Flex)

function Login(){
    const [form, setForm] = useState("login")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const { showNotification } = useNotification()

    const navigate = useNavigate()
    const { setUser } = useContext(UserContext)

    async function handleLogin(){
        setLoading(true)
        if(username === '' || !password === ''){
            showNotification('Please enter in all fields.')
            return
        }
        const formData = {
            username: username,
            password: password,
        }
        try{
            const response = await api.post('/users/login/', formData)
            localStorage.setItem(ACCESS_TOKEN, response.data.token)
            setUser(username)
            navigate('/home')
        } 
        catch(err){
            console.log(err)
            if(err?.status === 401){
                showNotification('Invalid user credentials. Please try again.')
            }
            else{
                console.log(err)
                showNotification('Something went wrong.')
            }
        }
        finally{
            setLoading(false)
        }
    }
    async function handleRegister(){
        setLoading(true)
        if(username === '' || !password === ''){
            showNotification('Please enter in all fields.')
            return
        }
        const formData = {
            username: username,
            password: password,
        }
        try{
            await api.post('/users/register/', formData)
            showNotification(`User ${username} successfully added. Please login with the same credentials`)
        } catch(err){
            console.error(err)
            if(err?.response?.data?.message){
                showNotification(err.response.data.message)
            }
            else{
                showNotification('Something went wrong.')
            }
        }
        finally{
            setLoading(false)
        }
    }
    const selectedStyles = {
        justify: "center",
        h: "35px",
        w: "50%",
        bgColor: "blue.400",
        color: "white",
        borderRadius: "5px",
        _hover: {
            cursor: "pointer"
        }
    }
    const unselectedStyles = {
        ...selectedStyles,
        bgColor: "white",
        color: "blue.400",
    }

    return (
        <Flex h="100vh" w="100vw" justify="center" align="center">
            <MotionFlex
                direction="column"
                justify="stretch"
                w="75vw"
                maxW="600px"
                p="20px"
                spaceY="20px"
                borderStyle="solid"
                borderWidth="1px"
                borderColor="blue.400"
                shadow="lg"
                bg="white"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >

                <Box>
                    <Text fontSize="2rem" textAlign="center" color="blue.500">
                        {form === "login" ? "Login" : "Sign Up"}
                    </Text>
                </Box>

                <Flex 
                    direction="row"
                    borderRadius="5px"
                    borderStyle="solid"
                    borderWidth="1px"
                    borderColor="blue.400"
                >
                    <Button 
                        {...(form === "login" ? selectedStyles : unselectedStyles)}
                        onClick = {() => setForm("login")}
                    >
                        Login
                    </Button>
                    <Button 
                        {...(form === "signup" ? selectedStyles : unselectedStyles)}
                        onClick = {() => setForm("signup")}
                    >
                        Sign Up
                    </Button>
                </Flex>

                <form>
                    <Input 
                        size="md"
                        placeholder="Username"
                        _focus={{
                            borderColor: "blue.400",
                        }}
                        value={ username }
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input 
                        size="md"
                        placeholder="Password" 
                        type="password"
                        mt="10px"
                        _focus={{
                            borderColor: "blue.400",
                        }}
                        value={ password }
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </form>

                { loading && <Loading />}

                <Button
                    h="35px"
                    color="white"
                    bgColor="blue.400"
                    borderRadius="5px"
                    onClick={() => form === "login" ? handleLogin(): handleRegister()}
                >
                    {form === "login" ? "Login" : "Sign Up"}
                </Button>
            </MotionFlex>
        </Flex>
    )
}

export default Login
