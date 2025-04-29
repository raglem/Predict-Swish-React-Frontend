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
    const [windowSize, setWindowSize] = useState(window.innerWidth)

    useEffect(() => {
        setLeague(info)
        const handleResize = () => {
            setWindowSize(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
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
    const getName = (name) => {
        if (name === "Timberwolves"){
            return "Twolves"
        }
        if ( name === "Trail Blazers"){
            return "Blazers"
        }
        return name
    }
    const breakpoints = [480, 768, 1024, 1280]

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
                    <Flex justify="space-between">
                        <Flex textStyle="lg"> Upcoming Games </Flex>
                        {windowSize >= breakpoints[1] && <Flex justify="flex-end" textStyle="lg">Date</Flex>}
                    </Flex>
                    {windowSize < breakpoints[1] && league.upcoming_games.map((game) => (
                        <Flex direction="row" justify="space-between" borderBottom="1px solid black" marginBottom="10px" key={game.balldontlie_id} >
                            <Flex direction="column" align="center">
                                <Flex align="center">
                                    <Image src={getImage(game.away_team)} display="inline-block" boxSize="50px"/>
                                    <Flex>{getName(game.away_team)}</Flex>
                                </Flex>
                                <Flex align="center">
                                    <Image src={getImage(game.home_team)} display="inline-block" boxSize="50px"/>
                                    <Flex>{getName(game.home_team)}</Flex>
                                </Flex>
                            </Flex>
                            <Flex width="20%" justify="flex-end" align="center">
                                {formatDate(game.date)}
                            </Flex>
                        </Flex>
                    ))}
                    {windowSize >= breakpoints[1] && league.upcoming_games.map((game) => (
                        <Flex direction="row" justify="space-between" align="center" key={game.balldontlie_id}>
                            <Flex justify="space-evenly" align="center" w="80%" rowGap="10px">
                                <Image src={getImage(game.away_team)} display="inline-block" boxSize="50px" mr="5px" />
                                <Box w="15%" minW="fit-content">{getName(game.away_team)}</Box>
                                <Box w="15%" textAlign="center"> vs </Box>
                                <Image src={getImage(game.home_team)} display="inline-block" boxSize="50px" ml="5px"/>
                                <Box w="15%" minW="fit-content">{getName(game.home_team)}</Box>
                            </Flex>
                            <Box>{formatDate(game.date)}</Box>
                        </Flex>
                    ))}
                </Box>
                <Box>
                    <SimpleGrid columns={2} gap="10px">
                        <Flex textStyle="lg">Recent Games</Flex>
                        {windowSize >= breakpoints[1] && <Flex justify="flex-end" textStyle="lg">My Scores</Flex>}
                    </SimpleGrid>
                    <Box>
                        <Box>
                            {windowSize < breakpoints[1] && league.recent_games.map(game => (
                                <Flex direction="column" key={game.balldontlie_id} borderBottom="1px solid black" marginBottom="10px">
                                    <Flex direction="row" justify="space-between" align="center">
                                        <Flex align="center">
                                            <Image src={getImage(game.away_team)} display="inline-block" boxSize="50px"/>
                                            <Flex>{getName(game.away_team)}</Flex>
                                        </Flex>
                                        <Flex justify="flex-end" align="center">
                                            {game.away_team_score}
                                        </Flex>
                                    </Flex>
                                    <Flex direction="row" justify="space-between" align="center">
                                        <Flex align="center">
                                            <Image src={getImage(game.home_team)} display="inline-block" boxSize="50px"/>
                                            <Flex>{getName(game.home_team)}</Flex>
                                        </Flex>
                                        <Flex justify="flex-end" align="center">
                                            {game.home_team_score}
                                        </Flex>
                                    </Flex>
                                </Flex>
                            ))}
                            {windowSize >= breakpoints[1] && league.recent_games.map(game => (
                                <Flex direction="row" justify="space-between" align="center" key={game.balldontlie_id}>
                                    <Flex justify="space-evenly" align="center" w="80%" rowGap="10px">
                                        <Image src={getImage(game.away_team)} display="inline-block" boxSize="50px" mr="5px" />
                                        <Flex direction="column" justify="center" align="center" w="15%">
                                            <Box>{game.away_team_score}</Box>
                                            <Box>{getName(game.away_team)}</Box>
                                        </Flex>
                                        <Box w="15%" textAlign="center"> vs </Box>
                                        <Flex direction="column" justify="center" align="center" w="15%">
                                            <Box>{game.home_team_score}</Box>
                                            <Box>{getName(game.home_team)}</Box>
                                        </Flex>
                                        <Image src={getImage(game.home_team)} display="inline-block" boxSize="50px" ml="5px"/>
                                    </Flex>
                                    <Box>{formatDate(game.date)}</Box>
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