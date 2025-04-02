import { useNavigate } from "react-router-dom";

import { Box, Button, Flex, Icon, SimpleGrid, Text } from "@chakra-ui/react"
import { FaUserFriends, FaCheck } from "react-icons/fa";
import { CiSquareRemove } from "react-icons/ci";

function LeagueOwnerCard({info}){
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
            maxW="400px" 
            p="10px"
            bgColor="blue.400"
            borderRadius="10px"
        >
            <Flex direction="row" justify="space-between" align="center" borderBottom="1px solid white" textStyle="lg">
                <Box>
                    {league.name} | {league.mode} Mode { league.mode === 'Team' ? `| ${league.team}` : null}
                </Box>
                <Button h="fit-content" bgColor="red.500" onClick={() => navigate(`/leagues/update/${league.id}`)}>
                    Open
                </Button>
            </Flex>
            <SimpleGrid 
                columns={2} 
                w="100%"
                gap={"10px"}
            >
                <Flex direction="column">
                    <Box p="0px 5px 0px 5px" margin="5px 0px 5px 0px" borderRadius="2px" bgColor="red.500" color="white">Member Players</Box>
                    <Box fontSize="0.75rem">
                    {
                        league.member_players.map(player => (
                            <Flex justify="space-between" key={player.id}>
                                <Text>{player.name} | {player.rank} </Text>
                                {player.mutualFriend && <Icon as={FaUserFriends} boxSize="20px" />}
                            </Flex>
                        ))
                    }
                    </Box>
                </Flex>
                <Flex direction="column">
                    <Box p="0px 5px 0px 5px" margin="5px 0px 5px 0px" borderRadius="2px" bgColor="red.500" color="white">Invited Players</Box>
                    <Box fontSize="0.75rem"> 
                    {
                        league.invited_players.map(player => (
                            <Flex justify="space-between" key={player.id}>
                                <Text>{player.name} | {player.rank} </Text>
                                {player.mutualFriend && <Icon as={CiSquareRemove} boxSize="20px" color="red.500"/>}
                            </Flex>
                        ))
                    }
                    </Box>
                </Flex>
                <Flex direction="column">
                    <Box p="0px 5px 0px 5px" margin="5px 0px 5px 0px" borderRadius="2px" bgColor="red.500" color="white">League Numbers</Box>
                    <Box fontSize="0.75rem">
                        <Text># of Players: {league.member_players.length}</Text>
                        <Text>Total Games Played: {league.total_games_played}</Text>
                        <Text>Avg Game Score: {league.average_game_score}</Text>
                        <Text>Avg Total Score: {league.average_total_score}</Text>
                    </Box>
                </Flex>
                <Flex direction="column">
                <Box p="0px 5px 0px 5px" margin="5px 0px 5px 0px" borderRadius="2px" bgColor="red.500" color="white">Requesting Players</Box>
                    <Box fontSize="0.75rem">
                    {
                        league.requesting_players.map(player => (
                            <Flex justify="space-between" key={player.id}>
                                <Text>{player.name} | {player.rank} </Text>
                                {player.mutualFriend && <Icon as={FaCheck} boxSize="20px" color="green"/>}
                            </Flex>
                        ))
                    }
                    </Box>
                </Flex>
        </SimpleGrid>
        </Flex>
    )
}
export default LeagueOwnerCard