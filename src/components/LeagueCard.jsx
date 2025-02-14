import { Box, Flex, HStack, Icon, Image, Spacer, Text } from "@chakra-ui/react"
import { FaUserFriends } from "react-icons/fa";

function LeagueCard(){
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

    const gameCardStyles = {
        h: "100%",
        w: "100%",
        p: "10px",
        spaceY: "2",
        bgColor: "blue.400",
        color: "white",
        borderRadius: "5px",
    }
    const leaderboardCardStyles = {
        ...gameCardStyles,
        w: "100%",
        bgColor: "red.500",
        spaceY: "2"
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

    return <Flex>
        <HStack align="stretch" w="100%">
            <Box {...gameCardStyles}>
                <Box borderBottom="1px solid white">
                    <Text textStyle="lg">{dummyData.name}</Text>
                </Box>
                <Box>
                    <Text textStyle="md">Upcoming Games</Text>
                    {
                        dummyData.upcomingGames.map((game, i) => (
                            <HStack key={i}>
                                <HStack justify="space-between" align="center" w="90%">
                                    <Flex direction="row" align="center" w="50%">
                                        <Image
                                            src={getImage(game.awayTeam)}
                                            height="10"
                                        >
                                        </Image>
                                        <Text textStyle="sm">{game.awayTeam}</Text>
                                    </Flex>
                                    <Text textStyle="sm">
                                        vs.
                                    </Text>
                                    <Flex direction="row" align="center" w="50%">
                                        <Image
                                            src={getImage(game.homeTeam)}
                                            height="10"
                                        >
                                        </Image>
                                        <Text textStyle="sm">{game.homeTeam}</Text>
                                    </Flex>
                                </HStack>
                                <Spacer/>
                                <Flex justifyContent="flex-end" w="10%">
                                    <Text textStyle="sm">
                                        {formatDate(game.date)}
                                    </Text>
                                </Flex>
                            </HStack>
                        ))
                    } 
                </Box>
                <Box>
                    <Flex justify="space-between" align="flex-end" >
                        <Text textStyle="md">Recent Games</Text>
                        <Flex justify="flex-end">
                            <Text textStyle="sm">My Scores</Text>
                        </Flex>
                    </Flex>
                    {
                        dummyData.recentGames.map((game, i) => (
                            <HStack key={i}>
                                <HStack justify="space-between" align="center" w="90%">
                                    <Flex direction="row" align="center" w="50%">
                                        <Image
                                            src={getImage(game.awayTeam)}
                                            height="10"
                                        >
                                        </Image>
                                        <Text textStyle="sm">{game.awayTeam}</Text>
                                    </Flex>
                                    <Text textStyle="sm" textAlign="center">
                                        vs.
                                    </Text>
                                    <Flex direction="row" align="center" w="50%">
                                        <Image
                                            src={getImage(game.homeTeam)}
                                            height="10"
                                        >
                                        </Image>
                                        <Text textStyle="sm">{game.homeTeam}</Text>
                                    </Flex>
                                </HStack>
                                <Spacer/>
                                <Flex justifyContent="flex-end">
                                    <Text textStyle="sm">
                                        {game.userScore}
                                    </Text>
                                </Flex>
                            </HStack>
                        ))
                    }
                </Box>
                <Box>
                    <Box {...leaderboardCardStyles}>
                        <Text textStyle="md">Leaderboards</Text>
                        <Box>
                            {
                                dummyData.leaderboards.map((player, i) => (
                                    <HStack borderBottom="1px solid white" key={i}>
                                        <Text>
                                            {player.place}. {player.name}
                                        </Text>
                                        <Spacer>
                                            <HStack direction="row" justify="flex-end">
                                                {player.mutualFriend ? <Icon as={FaUserFriends}/> : null}
                                                {player.totalScore}
                                            </HStack>
                                        </Spacer>
                                    </HStack>
                                ))
                            }
                        </Box>
                    </Box>
                </Box>
            </Box>
        </HStack>
    </Flex>
}
export default LeagueCard