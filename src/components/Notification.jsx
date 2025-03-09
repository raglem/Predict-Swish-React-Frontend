import { useState, useContext, createContext } from "react"
import { Box, Flex } from "@chakra-ui/react"
import { motion, AnimatePresence } from "framer-motion"

const NotificationContext = createContext(null);
const MotionFlex = motion.create(Flex)

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(null);

    const showNotification = (message) => {
        setNotification(message)
        setTimeout(() => setNotification(null), 3000)
    }

    return (
        // specify value to be passed from provider to be showNotification function
        <NotificationContext.Provider value={{ showNotification }}>
                {children}
            <AnimatePresence>
                {notification && <Notification message={notification} />}
            </AnimatePresence>
        </NotificationContext.Provider>
    )
}

// { showNotification } is meant to be passed from useNotification to specify a message and make the notification visible for 3s
export const useNotification = () => useContext(NotificationContext)

function Notification({ message }){
    return (
        <MotionFlex
            position="fixed"
            top="10vh"
            width="100vw"
            justify="center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ 
                duration: 0.5,
                exit: { duration: 0.2 }
             }}
        >
            <Box
                w="75vw"
                minW="200px"
                p="10px"
                backgroundColor="green.500"
                color="white"
                fontSize="1.5rem"
                borderRadius="10px"
            >
                { message }
            </Box>
        </MotionFlex>
    )
    
}