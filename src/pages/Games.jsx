import { useState, useEffect } from "react"

import api from "../api";
import GameCard from "../components/GameCard";
import { useNotification } from "../components/Notification";

import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";

function Games() {
    const [upcomingGames, setUpcomingGames] = useState([])
    const [recentGames, setRecentGames] = useState([])
    const [loading, setLoading] = useState(false)
    const { showNotification } = useNotification()

    useEffect(() => {
        fetchGames()
    }, [])
    async function fetchGames(){
        setLoading(true)
        try{
            const response = await api.get('/games/')
            console.log(response.data)
            setUpcomingGames(response.data.upcoming_games)
            setRecentGames(response.data.recent_games)
        }
        catch(err){
            showNotification('Something went wrong with loading the games')
            console.error(err)
        }
        finally{
            setLoading(false)
        }
    }
    return (
        <Flex direction="column" w="100vw" align="center">
            <Flex direction="column" p="10px" justify="center" minW="80vw" spaceY="10px">
                <Flex justify="stretch" borderBottom="1px solid black">
                    <Text textStyle="lg">Upcoming Games</Text>
                </Flex>
                <Flex justify="center">
                    <SimpleGrid 
                        columns={[1, 1, 2, 2, 3]} 
                        gap={4}
                        minW="100%"
                    >
                        {
                            upcomingGames.map((game, i) => (
                                <GameCard upcoming={true} game={game} key={i}/>
                            ))
                        }
                    </SimpleGrid>
                </Flex>
            </Flex>
            <Flex direction="column" p="10px" justify="center" minW="80vw" spaceY="10px">
                <Flex justify="stretch" borderBottom="1px solid black">
                    <Text textStyle="lg">Recent Games</Text>
                </Flex>
                <Flex justify="center">
                    <SimpleGrid 
                        columns={[1, 1, 2, 2, 3]} 
                        gap={4}
                        minW="100%"
                    >
                        {
                            recentGames.map((game, i) => (
                                <GameCard recent={true} game={game} key={i}/>
                            ))
                        }
                    </SimpleGrid>
                </Flex>
            </Flex>

            
        </Flex>
    );
}
export default Games;
