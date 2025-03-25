import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import api from "../api"
import LeagueCard from "../components/LeagueCard"
import LeagueOwnerCard from "../components/LeagueOwnerCard"

import { Box, Button, Flex, HStack, SimpleGrid, Text } from "@chakra-ui/react"

function Leagues(){
    const navigate = useNavigate()

    const [leagues, setLeagues] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchLeagues = async () => {
            try {
                setLoading(true)
                const response = await api.get(`/leagues/`)
                setLeagues(response.data.data)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchLeagues()
    }, [])
    const buttonStyles = {
        h: "fit-content",
        color: "white",
        borderRadius: "5px",
        _hover: {
            cursor: "pointer",
            opacity: 0.5
        }
    }
    return <Flex direction="column" align="center" h="100%" w="100vw" p="10px" spaceY="20px" overflyY="auto">
        <LeagueOwnerCard />
        <Flex direction="column" align="stretch" w="100%" maxW="1024px">
            <HStack align="center" borderBottom="1px solid black">
                <Text textStyle="2xl">Leagues</Text>
                <Button {...buttonStyles} bgColor="blue.400" onClick={() => navigate("/leagues/create/")}>
                    Create League
                </Button>
            </HStack>
            <Flex direction="column" align="center" maxW="1440px" spaceY="20px">
                {
                    !loading && 
                    leagues.map((league) => {
                        return <LeagueCard
                            key={league.id}
                            info={league}
                        />
                        
                    })
                }
                {
                    loading && <Box>
                        <Text>Loading...</Text>
                    </Box>
                }
            </Flex>
        </Flex>
    </Flex>
}
export default Leagues