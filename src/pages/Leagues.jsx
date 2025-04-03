import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import api from "../api"
import LeagueCard from "../components/LeagueCard"
import LeagueOwnerCard from "../components/LeagueOwnerCard"
import { useNotification } from "@/components/Notification"

import { Box, Button, Flex, HStack, SimpleGrid, Text } from "@chakra-ui/react"

function Leagues(){
    const navigate = useNavigate()

    const [leagues, setLeagues] = useState([])
    const [ownedLeagues, setOwnedLeagues] = useState([])
    const [loading, setLoading] = useState(false)
    const { showNotification } = useNotification

    useEffect(() => {
        const fetchLeagues = async () => {
            try {
                setLoading(true)
                const response = await api.get(`/leagues/`)
                setLeagues(response.data.leagues)
                setOwnedLeagues(response.data.owned_leagues)
                console.log(response.data.owned_leagues)
            } catch (err) {
                showNotification('Something went wrong retrieving your leagues')
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
    return <Flex direction="column" align="center" h="100%" w="100vw" p="10px" spaceY="20px" overflowY="auto">
        <Flex direction="column" align="stretch" w="100%" maxW="1024px" spaceY="20px">
            <Flex borderBottom="1px solid black">
                <Text textStyle="2xl">Owned Leagues</Text>
            </Flex>
            <SimpleGrid columns={[1,1,1,2]} gap="20px">
                {
                    ownedLeagues.map((league) => {
                        return <Box key={league.id}>
                            <Flex justify="space-between" align="center">
                                <Text textStyle="xl">{league.name} | {league.mode} {league.mode === 'Team' ? ' | ' + league.team : ''}</Text>
                                <Button
                                    {...buttonStyles} 
                                    bgColor="red.500"
                                    onClick={() => navigate(`/leagues/update/${league.id}`)}
                                >
                                    Open
                                </Button>
                            </Flex>
                            <LeagueOwnerCard info={league}/>
                        </Box>
                    })
                }
            </SimpleGrid>
        </Flex>
        <Flex direction="column" align="stretch" w="100%" maxW="1024px" spaceY="20px">
            <Flex align="center" borderBottom="1px solid black" spaceX="20px">
                <Text textStyle="2xl">Leagues</Text>
                <Button {...buttonStyles} bgColor="blue.400" onClick={() => navigate("/leagues/create/")}>
                    Create League
                </Button>
            </Flex>
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