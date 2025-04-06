import { useState, useEffect, useContext } from "react"

import { UserContext } from "../context/CurrentUser";

import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { MdCloseFullscreen } from "react-icons/md";
import { IoSend } from "react-icons/io5";

function Chat({gameId, gameInfo, handleChat}){
    const user = useContext(UserContext)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")

    useEffect(() => {
        setMessages([
            { content: "Hello", sender: "Julian" },
            { content: "Hello", sender: "Julian" },
            { content: "Hello", sender: "username2" },
        ])
        console.log(user.user)
    }, [])
    function sendMessage(){
        setMessages([
            {
                content: newMessage,
                sender: user.user
            },
        ...messages
        ])
        setNewMessage("")
    }
    return <Flex direction="column" h="100%" w="100%" borderRadius="5px">
        <Flex 
            h="50px" 
            justify="space-between" 
            align="center" 
            px="10px" 
            bgColor="red.500" 
            color="white"
            borderRadius="0px 0px 5px 5px"
        >
            <Text textStyle="md">
                {`${gameInfo.leagueName} | ${gameInfo.awayTeam} vs ${gameInfo.homeTeam}`}
            </Text>
            <Icon
                as={MdCloseFullscreen}
                boxSize="5"
                _hover={{ cursor: "pointer", color: "gray.300" }}
                onClick={handleChat}
            />
        </Flex>
        <Flex 
            flex={1}
            direction="column-reverse" 
            align="stretch"
            bgColor="blue.400" 
            p="10px" 
            overflowY="scroll" 
            borderRadius="5px" 
        >
            {
                messages.map((message ,i) => (
                    message.sender === user.user ? 
                    <SentMessage message={message} key={i} /> :
                    <ReceivedMessage message={message} key={i} />
                ))
            }
        </Flex>
        <Flex 
            justify="flex-end" 
            align="center" 
            p="10px" 
            h="100px" 
            spaceX="10px" 
            bgColor="red.500"
            borderRadius="5px 5px 0px 0px"
        >
            <input
                type="text"
                placeholder="Type a message"
                value={newMessage}
                style={{
                    padding: "10px",
                    width: "100%",
                    borderRadius: "5px",
                }}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <Icon 
                as={IoSend} 
                boxSize="6" 
                color="blue.400" 
                _hover={{
                    cursor: "pointer",
                    color: "gray.300"
                }}
                onClick={sendMessage}
            />
        </Flex>
    </Flex>
}
function SentMessage({message}){
    const messageStyles = {
        textAlign: "left",
        maxW: "70%",
        padding: "5px 10px 5px 5px",
        bgColor: "white",
        color: "black",
        borderRadius: "10px",
        textStyle: "md",
    }
    return <Flex direction="column" align="flex-end">
        <Text textStyle="md" color="white">Me</Text>
        <Box {...messageStyles}>
            {message.content}
        </Box>
    </Flex>
}
function ReceivedMessage({message}){
    const messageStyles = {
        maxW: "70%",
        padding: "5px 10px 5px 5px",
        bgColor: "gray.300",
        color: "black",
        borderRadius: "10px",
        textStyle: "md",
    }
    return <Flex direction="column" align="flex-start">
        <Text textStyle="md" color="white">{message.sender}</Text>
        <Box {...messageStyles}>
            {message.content}
        </Box>
    </Flex>
}
export default Chat