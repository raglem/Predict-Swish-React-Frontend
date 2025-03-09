import api from "@/api";
import Predict from "./Predict";
import { useNotification } from "../components/Notification";

import { Box, Button, Flex, HStack, Input, SimpleGrid, Spacer, Text, VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";

function Home(){

    const [friends, setFriends] = useState([])
    const [requests, setRequests] = useState({ sentRequests: [], receivedRequests: [] })
    const [friendCode, setFriendCode] = useState('')
    const [loading, setLoading] = useState(true)
    const { showNotification } = useNotification()
    useEffect(() => {
        getPlayer()
    }, [])
    async function getPlayer(){
        setLoading(true)
        try{
            const response = await api.get('/players/')
            const { friends, sent_requests, received_requests } = response.data.data

            setFriends(friends)
            setRequests({ sentRequests: sent_requests, receivedRequests: received_requests })
        }
        catch(err){
            console.error(err)
        }
        finally{
            setLoading(false)
        }
    }
    async function addFriend(){
        if(friendCode.length != 8){
            showNotification("A friend's id must be an 8-digit number")
            return
        }

        try{
            setLoading(true)
            const response = await api.post('/players/add-friend/', { friendId: friendCode })
            console.log(response.data)
            setRequests({ 
                sentRequests: [...requests.sentRequests, { id: response.data.id,  name: response.data.data.name }], 
                receivedRequests: requests.receivedRequests 
            })
            showNotification(`${response.data.data.name} received your friend request`)
        }
        catch(err){
            console.error(err)
        }
        finally{
            setLoading(false)
        }
    }
    async function removeFriend({id, name}){
        setLoading(true)
        try{
            const response = await api.delete('/players/delete-friend/', { data: { friendId: id } })
            console.log(response)
            setFriends(friends.filter(friend => friend.id !== id))
            showNotification(`${name} was removed from your friend list`)
        }
        catch(err){
            console.error(err)
        }
        finally{
            setLoading(false)
        }
    }
    const boxStyles = {
        border: "1px solid black",
        w: ["90vw", "45vw"],
        maxW: "500px",
        p: "5px",
    }
    const headerStyles = {
        justify: "stretch",
        borderBottom: "1px solid black",
    }
    const rowStyles = (index) => ({
        align: "flex-end",
        py:"5px",
        borderBottom: index === friends.length - 1 ? "none" : "1px solid black",
    });
    const buttonStyles = {
        h:"fit-content",
        minW:"75px",
        color: "white",
        borderRadius: "5px",
        px: "5px",
        _hover: {
            cursor: "pointer",
            opacity: 0.5
        }
    }
    const inputStyles = {
        css: {
            '&:focus': {
                borderColor: 'blue.400',  
                outlineColor: 'white'
            }
        }
    }
    return <Flex direction="column" w="100vw" align="center">
        <Box p="10px" justify="center" spaceY="20px">
            <Flex {...headerStyles} direction={["column", "column", "row"]} align={["stretch", "stretch", "flex-end"]}>
                <Text textStyle="lg">Friends</Text>
                <Spacer/>
                <Flex direction={["column", "column", "row"]} spaceX="10px" align={["center", "center", "flex-end"]}>
                    <Text whiteSpace="nowrap">Add Friend</Text>
                    <Flex align="stretch" h="30px" marginBottom="2px">
                        <Input 
                            {...inputStyles}
                            h = "auto"
                            w = "200px"
                            placeholder="Ask a friend for their id"
                            value = { friendCode }
                            onChange = {(e) => setFriendCode(e.target.value)}
                        />
                        <Button {...buttonStyles } h="auto" bgColor="blue.400" onClick={() => addFriend()}>
                            Send
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
            <SimpleGrid columns={[1, 2]} gap="5">
                <Box>
                    <Text textStyle="md">My Friend List</Text>
                    <Box {...boxStyles}>
                        {
                            friends.map((friend, i) => (
                                <HStack {...rowStyles(i)} key={friend.id}>
                                    <Text textStyle="sm">{friend.name}</Text>
                                    <Spacer/>
                                    <Button {...buttonStyles} bgColor="red.500" onClick={() => removeFriend({ id: friend.id, name: friend.name })}>
                                        <Text fontSize="0.75rem">Remove</Text>
                                    </Button>
                                </HStack>
                            ))
                        }
                        {
                            friends.length === 0 && <Box {...rowStyles}>
                                <Text textStyle="sm">None</Text>
                            </Box>
                        }
                    </Box>
                </Box>
                <Box spaceY="10px">
                    <Box>
                        <Text textStyle="md">My Sent Requests</Text>
                        <Box {...boxStyles}>
                            {
                                requests.sentRequests.map((friend, i) => (
                                    <HStack {...rowStyles(i)} key={i}>
                                        <Text textStyle="sm">{friend.name}</Text>
                                        <Spacer/>
                                        <Button {...buttonStyles} bgColor="red.500">
                                            <Text fontSize="0.75rem">Remove</Text>
                                        </Button>
                                    </HStack>
                                ))
                            }
                            {
                                requests.sentRequests.length === 0 && <Box {...rowStyles}>
                                    <Text textStyle="sm">None</Text>
                                </Box>
                            }
                        </Box>
                    </Box>
                    
                    <Box>
                        <Text textStyle="md">My Received Requests</Text>
                        <Box {...boxStyles}>
                            {
                                requests.receivedRequests.map((friend, i) => (
                                    <HStack {...rowStyles(i)} key={i}>
                                        <Text textStyle="sm">{friend.name}</Text>
                                        <Spacer/>
                                        <Button {...buttonStyles} bgColor="green.500">
                                            <Text fontSize="0.75rem">Add</Text>
                                        </Button>
                                    </HStack>
                                ))
                            }
                            {
                                requests.receivedRequests.length === 0 && <Box {...rowStyles}>
                                    <Text textStyle="sm">None</Text>
                                </Box>
                            }
                        </Box>
                    </Box>
                </Box>
            </SimpleGrid>
            <Flex {...headerStyles}>
                <Text textStyle="lg">Pick Schedule</Text>
            </Flex>
            <Box>
                <Predict/>
            </Box>
        </Box>
    </Flex>
}
export default Home