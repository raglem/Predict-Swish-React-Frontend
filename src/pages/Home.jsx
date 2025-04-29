import api from "@/api";
import Predict from "./Predict";
import { useNotification } from "../components/Notification";

import { Box, Button, Flex, HStack, Input, SimpleGrid, Spacer, Text, VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";

function Home(){

    const [friends, setFriends] = useState([])
    const [friendRequests, setFriendRequests] = useState({ sentRequests: [], receivedRequests: [] })
    const [friendCode, setFriendCode] = useState('')

    const [leagues, setLeagues] = useState([])
    const [leagueInvites, setLeagueInvites] = useState([])
    const [leagueRequests, setLeagueRequests] = useState([])
    const [leagueCode, setLeagueCode] = useState('')

    // loading is true if there is a post, patch, or delete request to the server (ex. addFriend & removeFriend)
    const [loading, setLoading] = useState(false)
    const [loadingFriends, setLoadingFriends] = useState(true)
    const [loadingLeagues, setLoadingLeagues] = useState(true)
    const { showNotification } = useNotification()

    useEffect(() => {
        getPlayer()
        getLeagues()
    }, [])

    async function getPlayer(){
        setLoadingFriends(true)
        try{
            const response = await api.get('/players/')
            const { friends, sent_requests, received_requests } = response.data.data

            setFriends(friends)
            setFriendRequests({ sentRequests: sent_requests, receivedRequests: received_requests })
        }
        catch(err){
            console.error(err)
        }
        finally{
            setLoadingFriends(false)
        }
    }
    async function getLeagues(){
        setLoadingLeagues(true)
        try{
            const response = await api.get('/leagues/invites')
            const { member_leagues, invited_leagues, requesting_leagues } = response.data.data
            setLeagues(member_leagues)
            setLeagueInvites(invited_leagues)
            setLeagueRequests(requesting_leagues)
        }
        catch(err){
            console.error(err)
        }
        finally{
            setLoadingLeagues(false)
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
            setFriendRequests({ 
                sentRequests: [...friendRequests.sentRequests, { id: response.data.id,  name: response.data.data.name }], 
                receivedRequests: friendRequests.receivedRequests 
            })
            showNotification(`${response.data.data.name} received your friend request`)
        }
        catch(err){
            showNotification('Something went wrong. Please try again')
            console.log(err)
        }
        finally{
            setLoading(false)
        }
    }
    async function acceptFriend({id, name}){
        setLoading(true)
        try{
            console.log(id)
            const response = await api.patch('/players/accept-friend/', { friendId: id })
            console.log(response)
            setFriends([...friends, {id, name}])
            setFriendRequests({ 
                sentRequests: friendRequests.sentRequests,
                receivedRequests: friendRequests.receivedRequests.filter(request => request.id !== id)
            })
            showNotification(`${name} was added to your friend list`)
        }
        catch(err){
            showNotification('Something went wrong. Please try again')
            console.error(err)
        }
        finally{
            setLoading(false)
        }
    }
    async function cancelFriendRequest({id, name}){
        setLoading(true)
        try{
            const response = await api.delete('/players/delete-request/', { data: { friendId: id } })
            setFriendRequests({
                sentRequests: friendRequests.sentRequests.filter(request => request.id !== id),
                receivedRequests: friendRequests.receivedRequests
            })
            showNotification(`Friend request to ${name} was canceled`)
        }
        catch(err){
            showNotification('Something went wrong. Please try again')
            console.log(err)
        }
        finally{
            setLoading(false)
        }
    }
    async function removeFriend({id, name}){
        setLoading(true)
        try{
            const response = await api.delete('/players/delete-friend/', { data: { friendId: id } })
            setFriends(friends.filter(friend => friend.id !== id))
            showNotification(`${name} was removed from your friend list`)
        }
        catch(err){
            showNotification('Something went wrong. Please try again')
            console.error(err)
        }
        finally{
            setLoading(false)
        }
    }
    async function acceptLeagueInvite(leagueId){
        setLoading(true)
        try{
            const response = await api.patch('/leagues/accept-invite/', { leagueId: leagueId })
            console.log(response)
            showNotification(`You accepted and were added to the ${response.data.data.name} league`)
            setLeagues([...leagues, response.data.data])
            setLeagueInvites(leagueInvites.filter(league => league.id !== leagueId))
        }
        catch(err){
            showNotification('Something went wrong. Please try again')
            console.error(err)
        }
        finally{
            setLoading(false)
        }
    }
    async function sendLeagueRequest(){
        if (!/^\d{8}$/.test(leagueCode)) {
            showNotification("A league code must be an 8-digit number");
            return;
        }
        setLoading(true)
        try{
            const response = await api.post('/leagues/request', { joinCode: leagueCode })
            setLeagueRequests([...leagueRequests, response.data.data])
            showNotification(`The ${response.data.data.name} league received your join request`)
        }
        catch(err){
            if(err.response.data.userMessage){
                showNotification(err.response.data.userMessage)
            }
            else{
                showNotification('Something went wrong. Please try again')
            }
            console.error(err)
        }
        finally{
            setLeagueCode('')
            setLoading(false)
        }
    }
    async function removeLeague(leagueId){
        setLoading(true)
        try{
            const response = await api.delete('/leagues/delete-current-player/', { data: { leagueId: leagueId } })
            showNotification(`You have been removed from the ${response.data.data.name} league`)
            setLeagues(leagues.filter(league => league.id !== leagueId))
            setLeagueInvites(leagueInvites.filter(league => league.id !== leagueId))
            setLeagueRequests(leagueRequests.filter(league => league.id !== leagueId))
        }
        catch(err){
            showNotification('Something went wrong. Please try again')
            console.error(err)
        }
        finally{
            setLoading(false)
        }
    }
    const boxStyles = {
        border: "1px solid black",
        p: "5px",
    }
    const headerStyles = {
        justify: "stretch",
        borderBottom: "1px solid black",
    }
    const rowStyles = {
        align: "flex-end",
        py:"5px",
        borderBottom: "1px solid black"
    }
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
        <Flex direction="column" p="10px" justify="center" w="100vw" maxW="1280px" spaceY="20px">
            <Flex {...headerStyles} direction={["column", "column", "row"]} align={["stretch", "stretch", "flex-end"]}>
                <Text textStyle="2xl">Friends</Text>
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
                                <HStack 
                                    {...rowStyles} 
                                    key={friend.id} 
                                    borderBottom={i === friends.length - 1 ? "0px" : rowStyles.borderBottom}
                                >
                                    <Text textStyle="sm">{friend.name}</Text>
                                    <Spacer/>
                                    <Button {...buttonStyles} bgColor="red.500" onClick={() => removeFriend({ id: friend.id, name: friend.name })}>
                                        <Text fontSize="0.75rem">Remove</Text>
                                    </Button>
                                </HStack>
                            ))
                        }
                        {
                            (loadingFriends || friends.length === 0) && <Box {...rowStyles}>
                                <Text textStyle="sm">{ loadingFriends ? "Loading..." : "None" }</Text>
                            </Box>
                        }
                    </Box>
                </Box>
                <Box spaceY="10px">
                    <Box>
                        <Text textStyle="md">My Sent Requests</Text>
                        <Box {...boxStyles}>
                            {
                                friendRequests.sentRequests.map((friend, i) => (
                                    <HStack 
                                        {...rowStyles} 
                                        key={i} 
                                        borderBottom={i === friendRequests.sentRequests.length - 1 ? "0px" : rowStyles.borderBottom}
                                    >
                                        <Text textStyle="sm">{friend.name}</Text>
                                        <Spacer/>
                                        <Button 
                                            {...buttonStyles} 
                                            bgColor="red.500"
                                            onClick={() => cancelFriendRequest({ id: friend.id, name: friend.name })}
                                        >
                                            <Text fontSize="0.75rem">Remove</Text>
                                        </Button>
                                    </HStack>
                                ))
                            }
                            {
                                (loadingFriends || friendRequests.sentRequests.length === 0) && <Box {...rowStyles} borderWidth="0px">
                                    <Text textStyle="sm">{ loadingFriends ? "Loading..." : "None" }</Text>
                                </Box>
                            }
                        </Box>
                    </Box>
                    
                    <Box>
                        <Text textStyle="md">My Received Requests</Text>
                        <Box {...boxStyles}>
                            {
                                friendRequests.receivedRequests.map((friend, i) => (
                                    <HStack 
                                        {...rowStyles} 
                                        key={i} 
                                        borderBottom={i === friendRequests.receivedRequests.length - 1 ? "0px" : rowStyles.borderBottom}
                                    >
                                        <Text textStyle="sm">{friend.name}</Text>
                                        <Spacer/>
                                        <Button 
                                            {...buttonStyles} 
                                            bgColor="green.500"
                                            onClick = {() => acceptFriend({ id: friend.id, name: friend.name})}
                                        >
                                            <Text fontSize="0.75rem">Add</Text>
                                        </Button>
                                    </HStack>
                                ))
                            }
                            {
                                (loadingFriends || friendRequests.receivedRequests.length === 0) && <Box {...rowStyles} borderWidth="0px">
                                    <Text textStyle="sm">{ loadingFriends ? "Loading..." : "None" }</Text>
                                </Box>
                            }
                        </Box>
                    </Box>
                </Box>
            </SimpleGrid>
            <Flex {...headerStyles} direction={["column", "column", "row"]} align={["stretch", "stretch", "flex-end"]}>
                <Text textStyle="2xl">Leagues</Text>
                <Spacer/>
                <Flex direction={["column", "column", "row"]} spaceX="10px" align={["center", "center", "flex-end"]}>
                    <Text whiteSpace="nowrap">Add League</Text>
                    <Flex align="stretch" h="30px" marginBottom="2px">
                        <Input 
                            {...inputStyles}
                            h = "auto"
                            w = "200px"
                            placeholder="Ask for a league code"
                            value = { leagueCode }
                            onChange = {(e) => setLeagueCode(e.target.value)}
                        />
                        <Button {...buttonStyles } h="auto" bgColor="blue.400" onClick={() => sendLeagueRequest()}>
                            Send
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
            <SimpleGrid columns={[1, 2]} gap="5">
                <Box>
                    <Text textStyle="md">My Leagues</Text>
                    <Box {...boxStyles}>
                        {
                            leagues.map((league, i) => (
                                <HStack 
                                    {...rowStyles} 
                                    key={league.id} 
                                    borderBottom={i === leagues.length - 1 ? "0px" : rowStyles.borderBottom}
                                >
                                    <Text textStyle="sm">{league.name}</Text>
                                    <Spacer/>
                                    <Button {...buttonStyles} bgColor="red.500" onClick={() => removeLeague(league.id)}>
                                        <Text fontSize="0.75rem">Remove</Text>
                                    </Button>
                                </HStack>
                            ))
                        }
                        {
                            (loadingLeagues || leagues.length === 0 )&& <Box {...rowStyles} borderWidth="0px">
                                <Text textStyle="sm">{ loadingLeagues ? "Loading..." : "None" }</Text>
                            </Box>
                        }
                    </Box>
                </Box>
                <Box spaceY="10px">
                    <Box>
                        <Text textStyle="md">League Invites</Text>
                        <Box {...boxStyles}>
                            {
                                leagueInvites.map((league, i) => (
                                    <HStack 
                                        {...rowStyles} 
                                        key={league.id} 
                                        borderBottom={i === leagueInvites.length - 1 ? "0px" : rowStyles.borderBottom}
                                    >
                                        <Text textStyle="sm">{league.name}</Text>
                                        <Spacer/>
                                        <Button 
                                            {...buttonStyles} 
                                            bgColor="green.500"
                                            onClick ={ () => acceptLeagueInvite(league.id) }
                                        >
                                            <Text fontSize="0.75rem">Add</Text>
                                        </Button>
                                    </HStack>
                                ))
                            }
                            {
                                (loadingLeagues || leagueInvites.length === 0 )&& <Box {...rowStyles} borderWidth="0px">
                                    <Text textStyle="sm">{ loadingLeagues ? "Loading..." : "None" }</Text>
                                </Box>
                            }
                        </Box>
                    </Box>
                    
                    <Box>
                        <Text textStyle="md">Pending League Requests</Text>
                        <Box {...boxStyles}>
                            {
                                leagueRequests.map((league, i) => (
                                    <HStack 
                                        {...rowStyles} 
                                        key={league.id} 
                                        borderBottom={i === leagueRequests.length - 1 ? "0px" : rowStyles.borderBottom}
                                    >
                                        <Text textStyle="sm">{league.name}</Text>
                                        <Spacer/>
                                        <Button 
                                            {...buttonStyles} 
                                            bgColor="red.500"
                                            onClick = {() => removeLeague(league.id)}
                                        >
                                            <Text fontSize="0.75rem">Withdraw</Text>
                                        </Button>
                                    </HStack>
                                ))
                            }
                            {
                                (loadingLeagues || leagueRequests.length === 0 )&& <Box {...rowStyles} borderWidth="0px">
                                    <Text textStyle="sm">{ loadingLeagues ? "Loading..." : "None" }</Text>
                                </Box>
                            }
                        </Box>
                    </Box>
                </Box>
            </SimpleGrid>
            <Predict />
        </Flex>
    </Flex>
}
export default Home