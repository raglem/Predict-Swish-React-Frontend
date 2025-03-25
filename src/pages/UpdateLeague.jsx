import { useState, useEffect } from "react"

import api from "../api"
import Select from "../components/Select"

import { Box, Button, Flex, Group, HStack, Input, SimpleGrid, Spacer, Text, VStack } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"

import { MdInfoOutline } from "react-icons/md";

import { teams } from "../assets/appInfo"

function UpdateLeague(){
    const [gameDetails, setGameDetails] = useState({
        name: '',
        mode: '',
        team: '',
    })
    const [friends, setFriends] = useState([])

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

    const handleGameDetailsChange = (detail, option) => {
        setGameDetails({
            ...gameDetails,
            [detail]: option
        })
        console.log(gameDetails)
    }

    const formContainerStyles = {
        w: "80vw",
        maxW: "768px",
        align:"stretch",
        spaceY:"20px"
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
    return <Flex direction="column" w="100vw" p="10px" align="center" spaceY="20px">
        <VStack {...formContainerStyles}>
            <Flex {...headerStyles}>
                <Text textStyle="lg">
                    Update League
                </Text>
            </Flex>

            <VStack>
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
                    <Text textStyle="md">Create</Text>
                </Button>
            </Flex>
        </VStack>
    </Flex>
}
export default CreateLeague