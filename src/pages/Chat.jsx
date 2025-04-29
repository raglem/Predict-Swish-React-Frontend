import { useState, useEffect, useContext } from "react"
import { io } from "socket.io-client";

import api from "../api.js"
import { UserContext } from "../context/CurrentUser";

import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { MdCloseFullscreen } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { ACCESS_TOKEN } from "@/constants.js";

function Chat({gameInfo, leagueInfo, handleChat}){
    const user = useContext(UserContext)
    const [chatId, setChatId] = useState(null)
    const [socket, setSocket] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const handleEnterKey = (event) => {
            if (event.key === 'Enter') {
                sendMessage()
            }
        }

        document.addEventListener('keydown', handleEnterKey)

        return () => {
            document.removeEventListener('keydown', handleEnterKey)
        }
    }, [sendMessage]);

    useEffect(() => {
        const newSocket = io(import.meta.env.VITE_API_URL, {
            auth:{
                token: localStorage.getItem(ACCESS_TOKEN)
            }
        })
        newSocket.on('connect', () => {
            fetchChat(newSocket)
        })
        newSocket.on('joined-room', (chat) => {
            setLoading(false)
            setChatId(chat.id)
            console.log(chat.id)
            setMessages(chat.messages.map(message => formatMessage(message)))
        })
        newSocket.on('failed-join-room', () => {
            console.log("Could not join room")
        })
        newSocket.on('receive-message', (message) => {
            setMessages((prevMessages) => [formatMessage(message), ...prevMessages])
        })

        setSocket(newSocket)

        return(() => {
            if (newSocket) {
                newSocket.disconnect();
            }
        })
    }, [])

    function fetchChat(socket){
        setLoading(true)
        socket.emit('join-room', { gameId: gameInfo.id, leagueId: leagueInfo.id })
    }

    async function sendMessage(){
        if(!loading && socket){
            socket.emit('send-message', { chatId: chatId, message: newMessage })
            setNewMessage('')
        }

    }
    function formatMessage(message){
        return{
            sender: message.player_name,
            content: message.content,
        }
    }
    return <Flex direction="column" h="100%" w="100%" borderRadius="5px" borderLeft="2px solid white">
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
                {`${leagueInfo.name} | ${gameInfo.awayTeam} vs ${gameInfo.homeTeam}`}
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
                disabled={loading}
            />
            <Icon 
                as={IoSend} 
                boxSize="6" 
                color={ !loading ? "blue.400" : "gray.300" } 
                _hover={{
                    cursor: !loading ? "pointer" : "default",
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