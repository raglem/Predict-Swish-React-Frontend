import { useState, useEffect } from "react";

import { Box, Flex, GridItem, HStack, Icon, Image, SimpleGrid, Spacer, Text } from "@chakra-ui/react"
import { FaUserFriends } from "react-icons/fa";

function LeagueCard({info}){
    const [league, setLeague] = useState({
        ...info,
        recent_games: [],
        ranking: 0,
        leaderboards: [],
        score: 0,
    })
    useEffect(() => {
        setLeague({
            ...info,
            recent_games: info.upcoming_games,
            ranking: 1,
            leaderboards: [{name: "bobby", mutualFriend: false, place: 1, totalScore: 10200}, {name: "jack", mutualFriend: true, place: 2, totalScore: 900}, {name: "danny", mutualFriend: false, place: 4, totalScore: 800}],
            score: 1200,
        })
    }, [])
    const dummyData = {
        name: "Hoopers",
        mode: "Classic Mode",
        team: null,
        upcomingGames: [
            {
                homeTeam: "Celtics",
                awayTeam: "Hornets",
                date: "2018-10-17 00:00:00+00"
            },
            {
                homeTeam: "Hornets",
                awayTeam: "Hawks",
                date: "2018-10-19 00:00:00+00"
            }
        ],
        recentGames: [
            {
                homeTeam: "Nets",
                awayTeam: "Hornets",
                date: "2018-10-17 00:00:00+00",
                userScore: 120,
                userPlace: 5
            },
            {
                homeTeam: "Bulls",
                awayTeam: "Celtics",
                date: "2018-10-19 00:00:00+00",
                userScore: 240,
                userPlace: 3
            }
        ],
        leaderboards: [
            {
                name: "bobby",
                mutualFriend: false,
                place: 1,
                totalScore: 10200
            },
            {
                name: "jack",
                mutualFriend: true,
                place: 2,
                totalScore: 900
            },
            {
                name: "danny",
                mutualFriend: false,
                place: 4,
                totalScore: 800
            }

        ]
    }

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
                        {league.recent_games.map((game) => (
                            <Flex direction="row" align="center" justify="space-between" key={game.balldontlie_id}>
                                <Flex justify="space-evenly" align="center" w="80%">
                                    <Image src={getImage(game.away_team)} display="inline-block" boxSize="50px" mr="5px" />
                                    {game.away_team} vs
                                    <Image src={getImage(game.home_team)} display="inline-block" boxSize="50px" ml="5px" />
                                    {game.home_team}
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
                                <Flex direction="row" width="100%" key={game.date}>
                                    <Flex w="80%">
                                        <SimpleGrid columns={4} w="100%">
                                            <Flex direction="column" justify="center" align="center" w="1fr">
                                                <Image src={getImage(game.away_team)} boxSize="50px" />
                                            </Flex>
                                            <Flex direction="column" justify="center" align="center" w="1fr">
                                                <Box>112</Box>
                                                <Box>{game.away_team}</Box>
                                            </Flex>
                                            <Flex direction="column" justify="center" align="center" w="1fr">
                                                <Box>112</Box>
                                                <Box>{game.home_team}</Box>
                                            </Flex>
                                            <Flex direction="column" justify="center" align="center" w="1fr">
                                                <Image src={getImage(game.home_team)} boxSize="50px" />
                                            </Flex>
                                        </SimpleGrid>
                                    </Flex>
                                    <Flex flex={1} direction="row-reverse" align="center" whiteSpace="nowrap">
                                        1st | 226pts
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
                    {league.leaderboards.map((leaderboard) => {
                        return <Flex direction="row" align="center" justify="space-between" borderBottom="1px solid white" key={leaderboard.name}>
                            <Box>{leaderboard.place}. {leaderboard.name}</Box>
                            <Box spaceX="5px">{leaderboard.mutualFriend && <Icon as={FaUserFriends} />} {leaderboard.totalScore}</Box>
                        </Flex>
                    })}
                </Box>
            </Box>

        </Flex>
    </Box>
}
export default LeagueCard