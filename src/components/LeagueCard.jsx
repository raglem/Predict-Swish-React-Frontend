import { useState, useEffect } from "react";

import { Box, Flex, GridItem, HStack, Icon, Image, SimpleGrid, Spacer, Text } from "@chakra-ui/react"
import { FaUserFriends } from "react-icons/fa";

function LeagueCard({info}){
    /*
     info = {
        id:
        mode:
        name:
        recent_games: [
            {
                balldontlie_id:
                date:
                status:
                home_team:
                away_team
                home_team_score:
                away_team_score:
                rank:
                score: 
            }
            ...
        ]
        upcoming_games: [
            {
                balldontlie_id:
                date:
                status:
                home_team:
                away_team
                home_team_score:
                away_team_score:
            }
            ...
        ]
        leaderboard: [
            {
                player_id,
                username,
                mutualFriend,
                totalScore,
            }
            ...
        ]
    */
    const [league, setLeague] = useState({
        id: null,
        balldontlie_id: null,
        name: '',
        mode: '',
        team: '',
        upcoming_games: [],
        recent_games: [],
        leaderboard: []
    })

    useEffect(() => {
        console.log(info)
        setLeague(info)
    }, [])

    const images = import.meta.glob("../assets/logos/*.png", { eager: true });
    const getImage = (team) => images[`../assets/logos/${team}.png`]?.default;
    const formatDate = (rawDate) => {
        try{
            const date = new Date(rawDate)
            return new Intl.DateTimeFormat("en-US", { month: "numeric", day: "numeric" }).format(date);
        }
        catch{
            return ""
        }
    }
    const getRankSuffix = (rank) => {
        switch (rank) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    }

    return <Box w="100%" maxW="1024px">
        <Flex direction="row" align="flex-end" justify="space-between" borderBottom="1px solid white" textStyle="xl">
            <Box>
                {league.name} | {league.mode} Mode { league.mode === 'Team' ? `| ${league.team}` : null}
            </Box>
            <Box>
                12 Players | {league.ranking} Place | Overall Score {league.score}
            </Box>
        </Flex>
        <Flex justify="space-between" columnGap="10px">
            <Box flex={2} p="10px" spaceY="20px" bgColor="blue.400" borderRadius="20px">
                <Box>
                    <SimpleGrid columns={2} justify="space-between">
                        <Flex textStyle="lg"> Upcoming Games </Flex>
                        <Flex justify="flex-end" textStyle="lg">Date</Flex>
                    </SimpleGrid>
                    <Box>
                        {league.upcoming_games.map((game) => (
                            <Flex direction="row" align="center" justify="space-between" key={game.balldontlie_id}>
                                <Flex justify="center" align="center" w="80%" paddingLeft="10%">
                                    <Image src={getImage(game.away_team)} display="inline-block" boxSize="50px" mr="5px" />
                                    <Box w="15%" minW="fit-content">{game.away_team}</Box>
                                    <Box w="15%" textAlign="center"> vs </Box>
                                    <Image src={getImage(game.home_team)} display="inline-block" boxSize="50px" ml="5px"/>
                                    <Box w="20%" minW="fit-content">{game.home_team}</Box>
                                </Flex>
                                <Box>{formatDate(game.date)}</Box>
                            </Flex>
                        ))}
                    </Box>
                </Box>
                <Box>
                    <SimpleGrid columns={2} gap="10px">
                        <Flex textStyle="lg">Recent Games</Flex>
                        <Flex justify="flex-end" textStyle="lg">My Scores</Flex>
                    </SimpleGrid>
                    <Box>
                        <Box>
                            {league.recent_games.map(game => (
                                <Flex direction="row" width="100%" key={game.balldontlie_id}>
                                    <Flex w="80%">
                                        <SimpleGrid columns={4} w="100%">
                                            <Flex direction="column" justify="center" align="center" w="1fr">
                                                <Image src={getImage(game.away_team)} boxSize="50px" />
                                            </Flex>
                                            <Flex direction="column" justify="center" align="center" w="1fr">
                                                <Box>{game.away_team_score}</Box>
                                                <Box>{game.away_team}</Box>
                                            </Flex>
                                            <Flex direction="column" justify="center" align="center" w="1fr">
                                                <Box>{game.home_team_score}</Box>
                                                <Box>{game.home_team}</Box>
                                            </Flex>
                                            <Flex direction="column" justify="center" align="center" w="1fr">
                                                <Image src={getImage(game.home_team)} boxSize="50px" />
                                            </Flex>
                                        </SimpleGrid>
                                    </Flex>
                                    <Flex flex={1} direction="row-reverse" align="center" whiteSpace="nowrap">
                                        { game.rank }{ getRankSuffix(game.rank) } | { game.score }
                                    </Flex>
                                </Flex>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box flex={1} p="10px" spaceY="20px" bgColor="red.500" borderRadius="20px" color="white">
                <Box textStyle="lg">Leaderboards</Box>
                <Box>
                    {league.leaderboard.map((player) => {
                        return <Flex direction="row" align="center" justify="space-between" borderBottom="1px solid white" key={player.playerId}>
                            <Box>{player.ranking}. {player.username}</Box>
                            <Box spaceX="5px">{player.mutualFriend && <Icon as={FaUserFriends} />} {player.totalScore}</Box>
                        </Flex>
                    })}
                </Box>
            </Box>

        </Flex>
    </Box>
}
export default LeagueCard