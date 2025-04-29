import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import api from "../api"
import LeagueCard from "../components/LeagueCard"
import LeagueOwnerCard from "../components/LeagueOwnerCard"
import { useNotification } from "@/components/Notification"

import { Box, Button, Flex, HStack, SimpleGrid, Text } from "@chakra-ui/react"
import EmptyLeagueCard from "@/components/loading/EmptyLeagueCard"
import EmptyLeagueOwnerCard from "@/components/loading/EmptyLeagueOwnerCard"

function Leagues(){
    const navigate = useNavigate()

    const [leagues, setLeagues] = useState([])
    const [ownedLeagues, setOwnedLeagues] = useState([])
    const [loadingLeagues, setLoadingLeagues] = useState(false)
    const { showNotification } = useNotification()

    useEffect(() => {
        const fetchLeagues = async () => {
            try {
                setLoadingLeagues(true)
                const response = await api.get(`/leagues/`)
                console.log(response.data)
                setLeagues(response.data.leagues)
                setOwnedLeagues(response.data.owned_leagues)
            } catch (err) {
                showNotification('Something went wrong retrieving your leagues')
                console.log(err)
            } finally {
                setLoadingLeagues(false)
            }
        }
        fetchLeagues()
    }, [])

    const getOwnedLeagueColumns = () => {
        if (window.innerWidth < 480){
            return 1
        }
        if (window.innerWidth < 768){
            return 2
        }
        return 3
    }

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
            {
                !loadingLeagues && <SimpleGrid columns={[1, 2, 3]} gap="20px">
                    {
                        ownedLeagues.map((league) => {
                            return <Box w="fit-content" key={league.id}>
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
                                <LeagueOwnerCard league={league}/>
                            </Box>
                        })
                    }
                </SimpleGrid>
            }
            {
                loadingLeagues && <Flex direction="column" textStyle="xl">
                    Loading...
                    <Flex columnGap="20px">
                        {
                            Array.from({ length: getOwnedLeagueColumns() }).map((league, i) => (
                                <EmptyLeagueOwnerCard key={i}/>
                            ))
                        }
                    </Flex>
                </Flex>
            }
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
                    !loadingLeagues && 
                    leagues.map((league) => {
                        return <LeagueCard
                            key={league.id}
                            info={league}
                        />
                    })
                }
                {
                    loadingLeagues && <EmptyLeagueCard />
                }
            </Flex>
        </Flex>
    </Flex>
}
export default Leagues