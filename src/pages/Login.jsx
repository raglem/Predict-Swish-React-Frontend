import { useState } from "react"
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react"
import { motion, AnimatePresence } from "framer-motion"

const MotionFlex = motion(Flex)
const MotionButton = motion(Button)

function Login(){
    const [form, setForm] = useState("login")

    const selectedStyles = {
        justify: "center",
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
                <AnimatePresence mode="wait">
                    <motion.div
                        key={form}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Text fontSize="2rem" textAlign="center" color="blue.500">
                            {form === "login" ? "Login" : "Sign Up"}
                        </Text>
                    </motion.div>
                </AnimatePresence>

                {/* Form Switch */}
                <Flex 
                    direction="row"
                    borderRadius="5px"
                    borderStyle="solid"
                    borderWidth="1px"
                    borderColor="blue.400"
                >
                    <MotionFlex 
                        {...(form === "login" ? selectedStyles : unselectedStyles)}
                        onClick={() => setForm("login")}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Login
                    </MotionFlex>
                    <MotionFlex 
                        {...(form === "signup" ? selectedStyles : unselectedStyles)}
                        onClick={() => setForm("signup")}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Sign Up
                    </MotionFlex>
                </Flex>

                {/* Animated Inputs */}
                <motion.div
                    key={form}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Input 
                        size="md"
                        placeholder="Username"
                        _focus={{
                            borderColor: "blue.400",
                            transform: "scale(1.05)",
                            transition: "transform 0.2s ease-in-out"
                        }}
                    />
                    <Input 
                        size="md"
                        placeholder="Password" 
                        type="password"
                        mt="10px"
                        _focus={{
                            borderColor: "blue.400",
                            transform: "scale(1.05)",
                            transition: "transform 0.2s ease-in-out"
                        }}
                    />
                </motion.div>

                {/* Animated Button */}
                <MotionButton
                    h="35px"
                    color="white"
                    bgColor="blue.400"
                    borderRadius="5px"
                    mt="15px"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {form === "login" ? "Login" : "Sign Up"}
                </MotionButton>
            </MotionFlex>
        </Flex>
    )
}

export default Login
