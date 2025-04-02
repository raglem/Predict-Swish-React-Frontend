import { useState, useEffect } from "react"

import api from "../api";
import GameCard from "../components/GameCard";
import { useNotification } from "../components/Notification";

import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";

function Games() {
    const [games, setGames] = useState([])
    const { showNotification } = useNotification()

    useEffect(() => {
        fetchGames()
    }, [])
    async function fetchGames(){
        try{
            const response = await api.get('/games/')
            setGames(response.data.data)
        }
        catch(err){
            showNotification('Something went wrong with loading the games')
            console.error(err)
        }
    }
    return (
        <Flex direction="column" w="100vw" align="center">
            <Box p="10px" justify="center" spaceY="10px">
                <Flex justify="stretch" borderBottom="1px solid black">
                    <Text textStyle="lg">Pending Games</Text>
                </Flex>
                <Flex justify="center">
                    <SimpleGrid 
                        columns={[1, 1, 2, 2, 3]} 
                        gap={4} 
                    >
                        {
                            games.map((game, i) => (
                                <GameCard game={game} key={i}/>
                            ))
                        }
                    </SimpleGrid>
                </Flex>
            </Box>

            
        </Flex>
    );
}
export default Games;
