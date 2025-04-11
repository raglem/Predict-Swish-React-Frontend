import { useState, useEffect } from "react"

import api from "../api";
import Chat from "../pages/Chat"
import GameCard from "../components/GameCard";
import { useNotification } from "../components/Notification";

import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";

function Games() {
    const [upcomingGames, setUpcomingGames] = useState([])
    const [recentGames, setRecentGames] = useState([])
    const [activeChatGameInfo, setActiveChatGameInfo] = useState({
        id: "",
        awayTeam: "",
        homeTeam: "",
    })
    const [activeChatLeagueInfo, setActiveChatLeagueInfo] = useState({
        id: "",
        name: ""
    })
    const [showChat, setShowChat] = useState(false)
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
    async function handleChat(game, league){
        if(!showChat){
            setShowChat(true)
            setActiveChatGameInfo({
                id: game.id,
                awayTeam: game.away_team,
                homeTeam: game.home_team
            })
            setActiveChatLeagueInfo({
                id: league.id,
                name: league.name
            })
        }
        else{
            setShowChat(false)
            setActiveChatGameInfo({
                id: "",
                awayTeam: "",
                homeTeam: "",
            })
            setActiveChatLeagueInfo({
                id: "",
                name: "",
            })
        }
    }
    return (
        <Flex direction="row" h="100vh" w="100vw" overflow="hidden">
            <Flex 
                direction="column" 
                h="100vh" 
                w={ showChat ? "70vw" : "100vw" } 
                align="center" 
                overflowY="auto" 
                marginRight={ showChat ? "30vw" : "0"}
            > 
                <Flex direction="column" p="10px" maxW="fit-content" align="center" spaceY="10px">
                    <Flex w="100%" minW={ showChat ? "80%" : "80vw"} borderBottom="1px solid black">
                        <Text textStyle="lg">Upcoming Games</Text>
                    </Flex>
                    <Flex justify="center" w="100%">
                        <SimpleGrid 
                            columns={[1, 1, 2, 2, 3]} 
                            gap={4}
                            minW="100%"
                        >
                            {
                                upcomingGames.map((game, i) => (
                                    <GameCard 
                                        upcoming={true} 
                                        game={game} 
                                        handleChat={() => handleChat(game, game.league)}
                                        key={i}
                                    />
                                ))
                            }
                        </SimpleGrid>
                    </Flex>
                </Flex>
                <Flex direction="column" p="10px" maxW="fit-content" align="center" spaceY="10px">
                    <Flex w="100%" minW={ showChat ? "80%" : "80vw"} borderBottom="1px solid black">
                        <Text textStyle="lg">Recent Games</Text>
                    </Flex>
                    <Flex justify="center" w="100%">
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
            {
                showChat && <Flex
                    position="fixed"
                    top="50px"
                    right="0"
                    h="calc(100vh - 50px)"
                    w="30vw"
                >
                    <Chat
                        gameInfo={activeChatGameInfo}
                        leagueInfo={activeChatLeagueInfo}
                        handleChat={handleChat}
                    />
                </Flex>
            }
        </Flex>
    );
}
export default Games;
