import Predict from "./Predict";

import { Box, Button, Flex, HStack, SimpleGrid, Spacer, Text, VStack } from "@chakra-ui/react";

function Home(){
    const friends = [
        {
            id: 1,
            name: "Bob Smith"
        },
        {
            id: 2,
            name: "Daniel Danny"
        },
        {
            id: 3,
            name: "Ryan Park"
        },
        {
            id: 4,
            name: "Ronald Phan"
        },
        {
            id: 5,
            name: "Brad Kim"
        },
    ]
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
    return <Flex direction="column" w="100vw" align="center">
        <Box p="10px" justify="center" spaceY="10px">
            <Flex {...headerStyles}>
                <Text textStyle="lg">Friends</Text>
            </Flex>
            <SimpleGrid columns={[1, 2]} gap="5">
                <Box>
                    <Text textStyle="md">My Friend List</Text>
                    <Box {...boxStyles}>
                        {
                            friends.map((friend, i) => (
                                <HStack {...rowStyles(i)}>
                                    <Text textStyle="sm">{friend.name}</Text>
                                    <Spacer/>
                                    <Button {...buttonStyles} bgColor="red.500">
                                        <Text fontSize="0.75rem">Remove</Text>
                                    </Button>
                                </HStack>
                            ))
                        }
                    </Box>
                </Box>
                <Box spaceY="10px">
                    <Box>
                        <Text textStyle="md">My Sent Requests</Text>
                        <Box {...boxStyles}>
                            {
                                friends.map((friend, i) => (
                                    <HStack {...rowStyles(i)}>
                                        <Text textStyle="sm">{friend.name}</Text>
                                        <Spacer/>
                                        <Button {...buttonStyles} bgColor="red.500">
                                            <Text fontSize="0.75rem">Remove</Text>
                                        </Button>
                                    </HStack>
                                ))
                            }
                        </Box>
                    </Box>
                    
                    <Box>
                        <Text textStyle="md">My Received Requests</Text>
                        <Box {...boxStyles}>
                            {
                                friends.map((friend, i) => (
                                    <HStack {...rowStyles(i)}>
                                        <Text textStyle="sm">{friend.name}</Text>
                                        <Spacer/>
                                        <Button {...buttonStyles} bgColor="green.500">
                                            <Text fontSize="0.75rem">Add</Text>
                                        </Button>
                                    </HStack>
                                ))
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