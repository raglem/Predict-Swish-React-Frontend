import { useState, useEffect } from "react"

import api from "../api"
import Select from "../components/Select"
import { useNotification } from "@/components/Notification"

import { Box, Button, Flex, Group, HStack, Input, SimpleGrid, Spacer, Text, VStack } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"

import { MdInfoOutline } from "react-icons/md";

import { teams } from "../assets/appInfo"

import { useParams } from "react-router-dom";

function UpdateLeague() {
    const { leagueId } = useParams();
    const [original, setOriginal] = useState({
        id: '',
        name: '',
        mode: '',
        team: '',
        join_code: '',
        member_players: [],
        invited_players: [],
        requesting_players: [],
    })
    const [league, setLeague] = useState({
        id: '',
        name: '',
        mode: '',
        team: '',
        join_code: '',
        member_players: [],
        invited_players: [],
        requesting_players: [],
    });
    const [friends, setFriends] = useState([]);
    const { showNotification } = useNotification()

    useEffect(() => {
        getFriends();
        if (leagueId) {
            fetchLeagueDetails();
        }
    }, [leagueId]);

    async function getFriends() {
        try {
            const response = await api.get(`/players/`);
            setFriends(response.data.data.friends);
        } catch (err) {
            console.error(err);
        }
    }

    async function fetchLeagueDetails() {
        try {
            const response = await api.get(`/leagues/${leagueId}`);
            let rawLeague = response.data.data
            rawLeague = {
                ...rawLeague,
                mode: rawLeague.mode.charAt(0).toUpperCase() + rawLeague.mode.substring(1)
            }
            setLeague(rawLeague);
            setOriginal(rawLeague)
        } catch (err) {
            console.error(err);
        }
    }
    async function updateLeague(){
        try{
            const response = await api.patch(`/leagues/update/${leagueId}`, {
                name: league.name,
                mode: league.mode,
                team: league.team
            })
            showNotification(`${league.name} league successfully updated`)
        }
        catch(err){
            showNotification('Something went wrong. Please try again')
            console.error(err)
        }
    }

    const handleLeagueDetailsChange = (detail, option) => {
        setLeague({
            ...league,
            [detail]: option,
        });
    };

    const formContainerStyles = {
        w: "80vw",
        maxW: "768px",
        align: "stretch",
        spaceY: "20px",
    };
    const boxStyles = {
        p: "10px",
        paddingBottom: "15px",
        color: "black",
        borderRadius: "5px",
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "blue.400",
    };
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
    return <Flex direction="column" w="100vw" p="10px" align="center" spaceY="20px">
        <VStack {...formContainerStyles}>
            <Flex {...headerStyles}>
                <Text textStyle="lg">
                    Update League | {original.name}
                </Text>
                <Spacer/>
                <Text textStyle="lg">
                    Join Code: {original.join_code}
                </Text>
            </Flex>

            <VStack>
                <Box w="100%">
                    <Text textStyle="sm">Name</Text>
                    <Input 
                        {...inputStyles} 
                        size="xs"
                        placeholder="Enter a custom league name" 
                        value={league.name}
                        onChange={(e) => handleLeagueDetailsChange("name", e.target.value)}
                    />
                </Box>
                <Select 
                    label="Mode" 
                    detail="mode"
                    info={"Choose between classic or team mode"}
                    placeholder="Select mode"
                    options={["Classic", "Team"]}
                    selected={league.mode}
                    onSelect={handleLeagueDetailsChange}
                >
                </Select>
                <Select 
                    label="Team" 
                    detail="team"
                    placeholder="Select team"
                    options={teams}
                    selected={league.team}
                    onSelect={handleLeagueDetailsChange}
                >
                </Select>
            </VStack>

            <Flex justify="flex-end">
                <Button {...buttonStyles} w="40vw" maxW="200px" onClick={() => updateLeague()}>
                    <Text textStyle="md">Update</Text>
                </Button>
            </Flex>

            <VStack align="stretch">
                <Flex direction={["column", "row"]} spaceX={["0", "20px"]}>
                    <Text textStyle="md">My Friends</Text>
                    <Flex direction="row">
                        <Input
                            {...inputStyles}
                            h="fit-content"
                            placeholder="Enter friend id"
                            borderRightRadius="0"
                        />
                        <Button
                            {...buttonStyles}
                            h="fit-content"
                            py="0"
                            borderLeftRadius="0"
                            bgColor="blue.400"
                        >
                            Send
                        </Button>
                    </Flex>
                </Flex>
                <Flex {...boxStyles} direction="column">
                    {
                        friends.map((friend, i) => (
                            <HStack align="stretch" borderStyle="solid" borderBottomWidth="1px" borderColor="blue.400" key={i}>
                                <Flex align="flex-end">
                                    <Text textStyle="sm">{friend.name}</Text>
                                </Flex>
                                <Spacer/>
                                <Button {...buttonStyles} marginY="5px" bgColor="green.500">
                                    <Text textStyle="xs">Invite</Text>
                                </Button>
                            </HStack>
                        ))
                    }
                </Flex>
            </VStack>

            <Box>
                <Text size="md">Sent Invites</Text>
                <Box {...boxStyles}>
                    {
                        friends.map((friend, i) => (
                            <HStack align="stretch" borderStyle="solid" borderBottomWidth="1px" borderColor="blue.400" key={i}>
                                <Flex align="flex-end">
                                    <Text textStyle="sm">{friend.name}</Text>
                                </Flex>
                                <Spacer/>
                                <Button {...buttonStyles} marginY="5px" bgColor="red.500">
                                    <Text textStyle="xs">Withdraw</Text>
                                </Button>
                            </HStack>
                        ))
                    }
                </Box>
            </Box>
            <Box>
                <Text size="md">Received Requests</Text>
                <Box {...boxStyles}>
                    {
                        friends.map((friend, i) => (
                            <HStack align="stretch" borderStyle="solid" borderBottomWidth="1px" borderColor="blue.400" key={i}>
                                <Flex align="flex-end">
                                    <Text textStyle="sm">{friend.name}</Text>
                                </Flex>
                                <Spacer/>
                                <Button {...buttonStyles} marginY="5px" bgColor="red.500">
                                    <Text textStyle="xs">Reject</Text>
                                </Button>
                            </HStack>
                        ))
                    }
                </Box>
            </Box>
            <Flex justify="flex-end">
                <Button {...buttonStyles} w="40vw" maxW="200px">
                    <Text textStyle="md">Exit</Text>
                </Button>
            </Flex>
        </VStack>
    </Flex>
}
export default UpdateLeague