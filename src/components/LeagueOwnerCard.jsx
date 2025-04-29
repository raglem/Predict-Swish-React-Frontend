import { useNavigate } from "react-router-dom";

import { Box, Button, Flex, Icon, SimpleGrid, Text } from "@chakra-ui/react"
import { FaUserFriends, FaCheck } from "react-icons/fa";
import { CiSquareRemove } from "react-icons/ci";

function LeagueOwnerCard(props){
    const navigate = useNavigate()
    const league = {
        id: '67d736bbcb27b3e94bc0b77e',
        name: "League 1",
        mode: "Team",
        team: "Lakers",
        member_players: [
            { id: 1, name: "Player 1", rank: 1, mutualFriend: true },
            { id: 2, name: "Player 2", rank: 2, mutualFriend: false },
        ],
        invited_players: [
            { id: 1, name: "Player 1", rank: 1, mutualFriend: true },
            { id: 2, name: "Player 2", rank: 2, mutualFriend: false },
        ],
        requesting_players: [
            { id: 1, name: "Player 1", rank: 1, mutualFriend: true },
            { id: 2, name: "Player 2", rank: 2, mutualFriend: false },
        ],
        total_games_played: 10,
        average_game_score: 100,
        average_total_score: 1000,
    }
    return (
        <Flex
            direction="column"
            w="100%"
            maxW="768px" 
            p="10px"
            bgColor="blue.400"
            borderRadius="10px"
        >
            <SimpleGrid 
                columns={2} 
                w="100%"
                gap={"10px"}
            >
                <Flex direction="column">
                    <Box p="0px 5px 0px 5px" margin="5px 0px 5px 0px" borderRadius="2px" bgColor="red.500" color="white">League</Box>
                    <Box fontSize="0.75rem">
                        <Text># of Players: {props.league.stats.total_players}</Text>
                        <Text>Total Games Played: {props.league.stats.total_games_played}</Text>
                        <Text>Avg Game Score: {props.league.stats.total_score_of_all_games}</Text>
                        <Text>Avg Total Score: {props.league.stats.total_of_average_player_score_per_game}</Text>
                    </Box>
                </Flex>
                <Flex direction="column">
                    <Flex direction="column">
                        <Box p="0px 5px 0px 5px" margin="5px 0px 5px 0px" borderRadius="2px" bgColor="red.500" color="white" textStyle="md">Invited Players</Box>
                        <Box fontSize="0.75rem"> 
                        {
                            props.league.invited_players.map((player, i) => (
                                <Flex justify="space-between" key={i}>
                                    <Text>{player.name}</Text>
                                    {player.mutualFriend && <Icon as={CiSquareRemove} boxSize="20px" color="red.500"/>}
                                </Flex>
                            ))
                        }
                        {
                            props.league.invited_players.length === 0 && <Text>None</Text>
                        }
                        </Box>
                    </Flex>
                    <Flex direction="column">
                    <Box p="0px 5px 0px 5px" margin="5px 0px 5px 0px" borderRadius="2px" bgColor="red.500" color="white" textStyle="md">Requesting Players</Box>
                        <Box fontSize="0.75rem">
                        {
                            props.league.requesting_players.map(player => (
                                <Flex justify="space-between" key={player.id}>
                                    <Text>{player.name}</Text>
                                    {player.mutualFriend && <Icon as={FaCheck} boxSize="20px" color="green"/>}
                                </Flex>
                            ))
                        }
                        {
                            props.league.requesting_players.length === 0 && <Text>None</Text>
                        }
                        </Box>
                    </Flex>
                </Flex>
        </SimpleGrid>
        </Flex>
    )
}
export default LeagueOwnerCard