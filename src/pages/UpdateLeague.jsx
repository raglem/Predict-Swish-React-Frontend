import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";

import api from "../api"
import Select from "../components/Select"
import { useNotification } from "@/components/Notification"

import { Box, Button, Flex, Group, HStack, Input, SimpleGrid, Spacer, Text, VStack } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { MdInfoOutline } from "react-icons/md";

import { teams } from "../assets/appInfo"


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
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchData() {
            getFriends()
            if (leagueId) {
                fetchLeagueDetails()
            }
        }
        fetchData();
    }, [leagueId]);

    async function getFriends() {
        try {
            const response = await api.get(`/players/`);
            setFriends(response.data.data.friends)
        } catch (err) {
            console.error(err);
        }
    }
    async function fetchLeagueDetails() {
        try {
            const response = await api.get(`/leagues/${leagueId}`);
            let rawLeague = response.data.data;
            rawLeague = {
                ...rawLeague,
                mode: rawLeague.mode.charAt(0).toUpperCase() + rawLeague.mode.substring(1),
            };
            console.log(rawLeague);
            setLeague(rawLeague);
            setOriginal(rawLeague);
        } catch (err) {
            console.error(err);
        }
    }
    async function updateLeague() {
        try {
            const response = await api.patch(`/leagues/update/${leagueId}`, {
                name: league.name,
                mode: league.mode,
                team: league.team,
            });
            showNotification(`${league.name} league successfully updated`);
        } catch (err) {
            showNotification('Something went wrong. Please try again');
            console.error(err);
        }
    }
    async function invitePlayer(playerId, name) {
        try {
            const response = await api.post('/leagues/add/', {
                leagueId: leagueId,
                players: [playerId],
            });
            showNotification(`${name} was successfully invited to ${original.name}`);
            setLeague({
                ...league,
                invited_players: [...league.invited_players, { id: playerId, name: name }],
            });
        } catch (err) {
            showNotification('Something went wrong. Please try again');
            console.error(err);
        }
    }
    async function removePlayer(playerId, name) {
        try {
            const response = await api.delete('/leagues/delete-player/', { data: {
                leagueId: leagueId,
                playerId: playerId
            }});
            console.log(response.data)
            showNotification(`${name} was successfully removed from ${original.name}`);
            setLeague({
                ...league,
                member_players: league.member_players.filter(player => player.id !== playerId),
                invited_players: league.invited_players.filter(player => player.id !== playerId),
                requesting_players: league.requesting_players.filter(player => player.id !== playerId)
            });
        } catch (err) {
            showNotification('Something went wrong. Please try again');
            console.error(err);
        }
    }
    const handleLeagueDetailsChange = (detail, option) => {
        setLeague({
            ...league,
            [detail]: option,
        });
    };
    const getPlayerStatus = (friendId) => {
        if (league.member_players.some(player => player.id === friendId)) return { label: "Member", color: "gray.500" };
        if (league.invited_players.some(player => player.id === friendId)) return { label: "Invited", color: "gray.500" };
        if (league.requesting_players.some(player => player.id === friendId)) return { label: "Requesting", color: "gray.500" };
        return null;
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
    const statusStyles = {
        justify: "center",
        align: "center",
        h: "fit-content",
        w: "80px",
        bgColor: "blue.400",
        color: "white",
        borderRadius: "5px",
        py: "0.5",
        px: "2",
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
                        disabled
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
                    disabled={true}
                    onSelect={handleLeagueDetailsChange}
                >
                </Select>
                <Select 
                    label="Team" 
                    detail="team"
                    placeholder="Select team"
                    options={teams}
                    selected={league.team}
                    disabled
                    onSelect={handleLeagueDetailsChange}
                >
                </Select>
            </VStack>

            <Box>
                <Text size="md">Members</Text>
                <Box {...boxStyles}>
                    {
                        league.member_players.map((player, i) => (
                            <HStack align="stretch" borderStyle="solid" borderBottomWidth="1px" borderColor="blue.400" key={i}>
                                <Flex align="flex-end">
                                    <Text textStyle="sm">{player.name}</Text>
                                </Flex>
                                <Spacer/>
                                {
                                    player.id !== league.owner ? 
                                        <Button {...buttonStyles} marginY="5px" bgColor="red.500" onClick={() => removePlayer(player.id, player.name)}>
                                            <Text textStyle="xs">Remove</Text>
                                        </Button> 
                                    :
                                        <Flex {...statusStyles} marginY="5px" bgColor="gray.500">
                                            <Text textStyle="xs">Owner</Text>
                                        </Flex>
                                }
                            </HStack>
                        ))
                    }
                    {
                        league.member_players.length == 0 && 
                        <HStack align="stretch" borderStyle="solid" borderBottomWidth="1px" borderColor="blue.400">
                            <Flex align="flex-end">
                                <Text textStyle="sm">None</Text>
                            </Flex>
                        </HStack>
                    }
                </Box>
            </Box>
            <Box>
                <Text size="md">Sent Invites</Text>
                <Box {...boxStyles}>
                    {
                        league.invited_players.map((player, i) => (
                            <HStack align="stretch" borderStyle="solid" borderBottomWidth="1px" borderColor="blue.400" key={i}>
                                <Flex align="flex-end">
                                    <Text textStyle="sm">{player.name}</Text>
                                </Flex>
                                <Spacer/>
                                <Button {...buttonStyles} marginY="5px" bgColor="red.500" onClick={() => removePlayer(player.id, player.name)}>
                                    <Text textStyle="xs">Withdraw</Text>
                                </Button>
                            </HStack>
                        ))
                    }
                    {
                        league.invited_players.length == 0 && 
                        <HStack align="stretch" borderStyle="solid" borderBottomWidth="1px" borderColor="blue.400">
                            <Flex align="flex-end">
                                <Text textStyle="sm">None</Text>
                            </Flex>
                        </HStack>
                    }
                </Box>
            </Box>
            <Box>
                <Text size="md">Received Requests</Text>
                <Box {...boxStyles}>
                    {
                        league.requesting_players.map((player, i) => (
                            <HStack align="stretch" borderStyle="solid" borderBottomWidth="1px" borderColor="blue.400" key={i}>
                                <Flex align="flex-end">
                                    <Text textStyle="sm">{player.name}</Text>
                                </Flex>
                                <Spacer/>
                                <Button {...buttonStyles} marginY="5px" bgColor="red.500" onClick={() => removePlayer(player.id, player.name)}>
                                    <Text textStyle="xs">Reject</Text>
                                </Button>
                            </HStack>
                        ))
                    }
                    {
                        league.requesting_players.length == 0 && 
                        <HStack align="stretch" borderStyle="solid" borderBottomWidth="1px" borderColor="blue.400">
                            <Flex align="flex-end">
                                <Text textStyle="sm">None</Text>
                            </Flex>
                        </HStack>
                    }
                </Box>
            </Box>
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
                        friends.map((friend, i) => {
                            const status = getPlayerStatus(friend.id);
                            const isNotInLeague = !status;
                            
                            return (
                                <HStack align="stretch" borderStyle="solid" borderBottomWidth="1px" borderColor="blue.400" key={i}>
                                    <Flex align="flex-end">
                                        <Text textStyle="sm">{friend.name}</Text>
                                    </Flex>
                                    <Spacer />
                                    {isNotInLeague ? (
                                        <Button {...buttonStyles} marginY="5px" bgColor="green.500" onClick={() => invitePlayer(friend.id, friend.name)}>
                                            <Text textStyle="xs">Invite</Text>
                                        </Button>
                                    ) : (
                                        <Flex {...statusStyles} marginY="5px" bgColor={status.color}>
                                            <Text textStyle="xs">{status.label}</Text>
                                        </Flex>
                                    )}
                                </HStack>
                            );
                        })                        
                    }
                </Flex>
            </VStack>
            
            <Flex justify="flex-end" spaceX="20px">
                <Button {...buttonStyles} bgColor="red.500" w="40vw" maxW="200px">
                    <Text textStyle="md" onClick={() => navigate('/leagues/')}>Delete</Text>
                </Button>
                <Button {...buttonStyles} w="40vw" maxW="200px">
                    <Text textStyle="md" onClick={() => navigate('/leagues/')}>Exit</Text>
                </Button>
            </Flex>
        </VStack>
    </Flex>
}
export default UpdateLeague