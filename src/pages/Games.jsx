import { useState, useEffect } from "react"

import api from "../api";
import Chat from "../pages/Chat"
import GameCard from "../components/GameCard";
import EmptyGameCard from "../components/loading/EmptyGameCard"
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
    const [loadingGames, setLoadingGames] = useState(false)
    const { showNotification } = useNotification()

    useEffect(() => {
        fetchGames()
    }, [])
    async function fetchGames(){
        setLoadingGames(true)
        try{
            const response = await api.get('/games/')
            console.log({ "Games": response.data })
            setUpcomingGames(response.data.upcoming_games)
            setRecentGames(response.data.recent_games)
        }
        catch(err){
            showNotification('Something went wrong with loading the games')
            console.error(err)
        }
        finally{
            setLoadingGames(false)
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
    function getGameColumns(){
        if(window.innerWidth < 768){
            return 1
        }
        else if(window.innerWidth < 1280){
            return 2
        }
        return 3
    }
    return (
        <Flex h="100vh" w="100vw" overflow="hidden">
        {
            !loadingGames && 
                <Flex 
                    direction="column" 
                    h="100vh" 
                    w="100vw"
                    paddingBottom="50px"
                    align="center" 
                    overflowY="auto" 
                    marginRight={ showChat ? ["0vw", "0vw", "0vw", "30vw"] : "0"}
                > 
                    <Flex direction="column" align="stretch" p="10px" spaceY="10px" maxW="1280px">
                        <Flex w="100%" borderBottom="1px solid black">
                            <Text textStyle="lg">Upcoming Games</Text>
                        </Flex>
                        <Flex justify="center">
                            <SimpleGrid 
                                columns={[1, 1, 2, 2, 3]} 
                                gap={4}
                                w="100%"
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
                    <Flex direction="column" align="stretch" p="10px" spaceY="10px" maxW="1280px">
                        <Flex w="100%" borderBottom="1px solid black">
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
        }    
        {
            !loadingGames && showChat && <Flex
                position="fixed"
                top="50px"
                right="0"
                h="calc(100vh - 50px)"
                w={["100vw", "100vw", "30vw"]}
            >
                <Chat
                    gameInfo={activeChatGameInfo}
                    leagueInfo={activeChatLeagueInfo}
                    handleChat={handleChat}
                />
            </Flex>
        }
        {
            loadingGames && <Flex 
                direction="column" 
                h="100vh" 
                w="100vw"
                paddingBottom="50px"
                align="center" 
                overflowY="auto" 
            > 
                <Flex direction="column" align="stretch" p="10px" spaceY="10px" maxW="1280px">
                    <Flex w="100%" borderBottom="1px solid black">
                        <Text textStyle="lg">Upcoming Games</Text>
                    </Flex>
                    <Flex justify="center">
                        <SimpleGrid 
                            columns={[1, 1, 2, 2, 3]} 
                            gap={4}
                            minW="100%"
                        >
                            {
                                Array.from({ length: getGameColumns() }).map((game, i) => (
                                    <EmptyGameCard key={i}/>
                                ))
                            }
                        </SimpleGrid>
                    </Flex>
                    <Flex w="100%" borderBottom="1px solid black">
                        <Text textStyle="lg">Recent Games</Text>
                    </Flex>
                    <Flex justify="center">
                        <SimpleGrid 
                            columns={[1, 1, 2, 2, 3]} 
                            gap={4}
                            minW="100%"
                        >
                            {
                                Array.from({ length: getGameColumns() }).map((game, i) => (
                                    <EmptyGameCard key={i}/>
                                ))
                            }
                        </SimpleGrid>
                    </Flex>
                </Flex>
            </Flex>
        }
        </Flex>
    );
}
export default Games;
