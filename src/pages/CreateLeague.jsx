import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import api from "../api"
import Form from "../components/Form"
import Select from "../components/Select"
import { useNotification } from "../components/Notification.jsx"

import { Box, Button, Checkbox, Flex, Group, HStack, Input, SimpleGrid, Spacer, Text, VStack } from "@chakra-ui/react"
import { MdInfoOutline } from "react-icons/md";

import { teams } from "../assets/appInfo"

function CreateLeague(){
    const [gameDetails, setGameDetails] = useState({
        name: '',
        mode: '',
        team: '',
    })
    const [invited_players, setInvitedPlayers] = useState([])
    const [friends, setFriends] = useState([])
    const { showNotification } = useNotification()
    const navigate = useNavigate()

    useEffect(() => {
        getFriends()
    }, [])

    async function getFriends(){
        try{
            const response = await api.get(`/players/`)
            setFriends(response.data.data.friends)
        }
        catch(err){
            console.log(err)
        }
    }

    const createLeague = async () => {
        if(!gameDetails.name){
            showNotification("Please enter a league name")
            return
        }
        else if(!gameDetails.mode){
            showNotification("Please select a mode")
            return
        }
        else if(gameDetails.mode === "Team" && !gameDetails.team){
            showNotification("Please select a team")
            return
        }
        const requestData = {
            name: gameDetails.name,
            mode: gameDetails.mode.trim().toLowerCase(),
            team: gameDetails.team,
            invited_players: invited_players,
        }

        console.log(requestData)

        try{
            const response = await api.post('/leagues/create/', requestData)
            showNotification(`League ${gameDetails.name} created successfully`)
            navigate(`/leagues/`)
            console.log(response)
        } 
        catch(err){
            console.log(err)
            showNotification("Something went wrong. Please try again")
        }
    }

    const handleGameDetailsChange = (detail, option) => {
        setGameDetails({
            ...gameDetails,
            [detail]: option
        })
        console.log(gameDetails)
    }
    const handleInvitedPlayersChange = (e, playerId) => {
        if(e.target.checked){
            setInvitedPlayers([...invited_players, playerId])
        } else {
            setInvitedPlayers(invited_players.filter(id => id !== playerId))
        }
    }

    const boxStyles = {
        p: "10px",
        paddingBottom: "15px",
        color: "black",
        borderRadius: "5px",
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "blue.400"
    }
    const buttonStyles = {
        h: "fit-content",
        w: "80px",
        bgColor: "blue.400",
        color: "white",
        borderRadius: "5px",
        py: "0.5",
        px: "2",
        _hover: {
            cursor: "pointer",
            transform: "scale(1.05)",
            transition: "0.2s ease-in-out"
        }
    }
    const headerStyles = {
        borderBottom: "1px solid black",
    }
    const inputStyles = {
        css: {
            '&:focus': {
                borderColor: 'blue.400',  
                outlineColor: 'white'
            }
        }
    }
    return <Flex h="100vw" w="100vw" justify="center" align="center">
        <Flex direction="column" w="90%" maxH="90vh" maxW="1280px" {...boxStyles} p="20px" spaceY="20px" overflowY="auto">
            <Flex {...headerStyles}>
                <Text textStyle="lg">
                    Create League
                </Text>
            </Flex>

            <VStack {...boxStyles}>
                <Box w="100%">
                    <Text textStyle="sm">Name</Text>
                    <Input 
                        {...inputStyles} 
                        size="xs"
                        placeholder="Enter a custom league name" 
                        onChange={(e) => handleGameDetailsChange("name", e.target.value)}
                    />
                </Box>
                <Select 
                    label="Mode" 
                    detail="mode"
                    info={"Choose between classic or team mode"}
                    placeholder="Select mode"
                    options={["Classic", "Team"]}
                    selected={gameDetails.mode}
                    onSelect={handleGameDetailsChange}
                >
                </Select>
                <Select 
                    label="Team" 
                    detail="team"
                    placeholder="Select team"
                    options={teams}
                    selected={gameDetails.team}
                    onSelect={handleGameDetailsChange}
                >
                </Select>
            </VStack>

            <Box>
                <Flex>
                    <Text textStyle="md">Invite Friends</Text>
                </Flex>
                <Flex {...boxStyles} direction="column" spaceY="10px">
                    {
                        friends.map((friend, i) => (
                            <HStack align="stretch" borderStyle="solid" borderBottomWidth="1px" borderColor="blue.400" key={i}>
                                <Flex align="flex-end">
                                    <Text textStyle="sm">{friend.name}</Text>
                                </Flex>
                                <Spacer/>
                                <input 
                                    type="checkbox"
                                    onChange = {(e) => handleInvitedPlayersChange(e, friend.id)}
                                />
                            </HStack>
                        ))
                    }
                </Flex>
            </Box>

            <Flex justify="flex-end">
                <Button {...buttonStyles} w="40vw" maxW="200px" onClick={createLeague}>
                    <Text textStyle="md">Create</Text>
                </Button>
            </Flex>
        </Flex>
    </Flex>
}
export default CreateLeague