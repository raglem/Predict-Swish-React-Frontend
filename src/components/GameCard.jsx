import { useNavigate } from "react-router-dom";

import { Box, Button, Flex, Group, HStack, Icon, Image, Spacer, Text, useBreakpointValue } from "@chakra-ui/react"
import { FaUserFriends } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { MdDone, MdDoneOutline } from "react-icons/md";

function GameCard(){
    const dummyData = {
        league: 'Hoopers',
        awayTeam: 'Hawks',
        homeTeam: 'Celtics',
        awayTeamWins: '42',
        awayTeamLosses: '40',
        homeTeamWins: '42',
        homeTeamLosses: '40',
        date: '2018-10-17 00:00:00+00',
        friends: [
            {
                name: 'bobby',
                mutualFriend: true,
                predicted: false
            },
            {
                name: 'johnny',
                mutualFriend: false,
                predicted: true
            },
            {
                name: 'danny',
                mutualFriend: true,
                predicted: true
            },
        ]
    }

    const navigate = useNavigate()
    const isMobile = useBreakpointValue({base: true, md: false})

    const game = formatGame(dummyData)

    const images = import.meta.glob("../assets/logos/*.png", { eager: true });
    const getImage = (team) => images[`../assets/logos/${team}.png`]?.default;
    const team = game.homeTeam;

    function formatGame(data){
        const date = new Date(data.date)
        const formattedDate = new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric" }).format(date);
        return {
            ...data,
            awayTeamRecord: `${data.awayTeamWins}-${data.awayTeamLosses}`,
            homeTeamRecord: `${data.homeTeamWins}-${data.homeTeamLosses}`,
            date: formattedDate,
        }
    }

    const gameCardStyles = {
        h: "100%",
        w: "60%",
        maxW: "300px",
        p: "10px",
        spaceY: "5",
        bgColor: "blue.400",
        color: "white",
        borderRadius: "5px",
    }
    const leaderboardCardStyles = {
        ...gameCardStyles,
        w: "40%",
        maxW: "200px",
        bgColor: "red.500",
        spaceY: "2"
    }
    const buttonStyles = {
        h: "fit-content",
        color: "white",
        borderRadius: "5px",
        p: "5px",
        _hover: {
            cursor: "pointer",
            opacity: 0.8
        }
    }

    return <Box display="flex" w="fit-content">
        <HStack align="stretch" w="100%">
            <Box {...gameCardStyles}>
                <Box borderBottom="1px solid white">
                    <Text textStyle="lg">{game.league}</Text>
                </Box>
                <HStack paddingBottom="5px">
                    <Flex direction="column" justify="center">
                        <Image src={ getImage(game.awayTeam )}/>
                        <Text textAlign="center">{game.awayTeam}</Text>
                        <Text textAlign="center">{game.awayTeamRecord}</Text>
                    </Flex>
                    <Text>vs</Text>
                    <Flex direction="column" justify="center">
                        <Image src={ getImage(game.homeTeam )}/>
                        <Text textAlign="center">{game.homeTeam}</Text>
                        <Text textAlign="center">{game.homeTeamRecord}</Text>
                    </Flex>
                </HStack>
                <HStack>
                    <Text textStyle="sm">{game.date}</Text>
                    <Spacer />
                    <Flex direction={isMobile ? "column": "row"} gap="2">
                        <Button {...buttonStyles} bgColor="green.500" onClick={() => navigate('/home')}>
                            Predict
                        </Button>
                        <Button {...buttonStyles} bgColor="red.500">
                            Withdraw
                        </Button>
                    </Flex>
                </HStack>
            </Box>
            <Box {...leaderboardCardStyles} flex="1">
                {
                    game.friends.map((friend, i) => (
                        <HStack key={i}>
                            <Text>{friend.name}</Text>
                            <Spacer />
                            <Group>
                                {friend.mutualFriend && <Icon as={FaUserFriends}/>}
                                {friend.predicted ? <Icon as={MdDoneOutline}/> : <Icon as={IoMdTime}/>}
                            </Group>
                        </HStack>
                    ))
                }
            </Box>
        </HStack>
    </Box>
}
export default GameCard