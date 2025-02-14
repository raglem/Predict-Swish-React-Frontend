import { useNavigate } from "react-router-dom"

import LeagueCard from "../components/LeagueCard"
import GameCard from "@/components/GameCard"

import { Box, Button, Flex, HStack, SimpleGrid, Text } from "@chakra-ui/react"

function Leagues(){
    const navigate = useNavigate()

    const buttonStyles = {
        h: "fit-content",
        color: "white",
        borderRadius: "5px",
        _hover: {
            cursor: "pointer",
            opacity: 0.5
        }
    }
    return <Flex direction="column" w="100vw" align="center">
        <Box p="10px" justify="center" spaceY="10px">
            <HStack align="center" borderBottom="1px solid black">
                <Text textStyle="lg">Leagues</Text>
                <Button {...buttonStyles} bgColor="blue.400" onClick={() => navigate("/leagues/create/")}>
                    Create League
                </Button>
            </HStack>
            <Flex justify="center">
                <SimpleGrid 
                    columns={[1, 1, 2, 2, 3]} 
                    gap={4} 
                    w="100%"
                >
                    <LeagueCard />
                    <LeagueCard />
                    <LeagueCard />
                </SimpleGrid>
            </Flex>
        </Box>
    </Flex>
}
export default Leagues