import { useState } from "react"

import Select from "../components/Select"

import { Box, Button, Flex, Group, HStack, Input, SimpleGrid, Spacer, Text, VStack } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"

import { MdInfoOutline } from "react-icons/md";

import { modes, modesInfo, teams} from "../assets/appInfo"

function CreateLeague(){
    const dummyData = {
        friends: [
            {
                name: "Danny",
                friend_id: "01972",
            },
            {
                name: "Bobby",
                friend_id: "01972",
            },
            {
                name: "Johnny",
                friend_id: "01972",
            },
            {
                name: "Pete",
                friend_id: "01972",
            },
        ]
    }
    const [gameDetails, setGameDetails] = useState({
        name: '',
        mode: null,
        team: null,
    })

    const handleGameDetailsChange = (option, detail) => {
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
        color: "white",
        bgColor: "blue.400",
        borderRadius: "5px"
    }
    const buttonStyles = {
        h: "fit-content",
        w: "80px",
        color: "white",
        borderRadius: "5px",
        py: "0.5",
        px: "2",
        _hover: {
            cursor: "pointer",
            bgColor: "blue.400",
            color: "white"
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
                    Create League
                </Text>
            </Flex>

            <VStack>
                <Box w="100%">
                    <Text textStyle="sm">Name</Text>
                    <Input 
                        {...inputStyles} 
                        size="xs"
                        placeholder="Enter a custom league name" 
                        onChange={(e) => handleGameDetailsChange(e.target.value, "name")}
                    />
                </Box>
                <Select 
                    label="Mode" 
                    detail="mode"
                    info={modesInfo}
                    placeholder="Select mode"
                    options={modes}
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
                <Flex {...boxStyles} direction="column" py="5px">
                    {
                        dummyData.friends.map((friend, i) => (
                            <HStack align="stretch" borderBottom="1px solid white" key={i}>
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

            <VStack align="stretch">
                <Box>
                    <Text size="md">Sent Invites</Text>
                    <Box {...boxStyles} py="5px">
                        {
                            dummyData.friends.map((friend, i) => (
                                <HStack align="stretch" borderBottom="1px solid white" key={i}>
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
                    <Box {...boxStyles} py="5px">
                        {
                            dummyData.friends.map((friend, i) => (
                                <HStack align="stretch" borderBottom="1px solid white" key={i}>
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
            </VStack>

            <Flex justify="flex-end">
                <Button {...buttonStyles} color="blue.400" bgColor="transparent" borderColor="blue.400" w="40vw" maxW="200px">
                    <Text textStyle="md">Create</Text>
                </Button>
            </Flex>
        </VStack>
    </Flex>
}
export default CreateLeague