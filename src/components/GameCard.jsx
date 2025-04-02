import { useState } from "react"
import { useNavigate } from "react-router-dom";

import { Box, Button, Flex, Group, HStack, Icon, Image, Spacer, Text, useBreakpointValue } from "@chakra-ui/react"
import { FaUserFriends } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { MdDone, MdDoneOutline } from "react-icons/md";

function GameCard({game}){
    const navigate = useNavigate()
    const isMobile = useBreakpointValue({base: true, md: false})

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

    const checkLength = (team) => {
        if(team === "Timberwolves"){
            return "T-Wolves"
        }
        else{
            return team
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
                        <Image src={ getImage(game.away_team )} maxW="100%"/>
                        <Text textAlign="center">{checkLength(game.away_team)}</Text>
                    </Flex>
                    <Text>vs</Text>
                    <Flex direction="column" justify="center">
                        <Image src={ getImage(game.home_team )} maxW="100%"/>
                        <Text textAlign="center">{checkLength(game.home_team)}</Text>
                    </Flex>
                </HStack>
                <HStack>
                    <Text textStyle="sm">{formatDate(game.date)}</Text>
                    <Spacer />
                    <Flex direction={isMobile ? "column": "row"} gap="2">
                        <Button {...buttonStyles} bgColor="green.500" onClick={() => navigate('/home')}>
                            Predict
                        </Button>
                    </Flex>
                </HStack>
            </Box>
            <Box {...leaderboardCardStyles} flex="1">
                {
                    game.predictions.map((member, i) => (
                        <HStack key={i}>
                            <Text>{member.username}</Text>
                            <Spacer />
                            <Group>
                                {member.status !== 'Pending' ? <Icon as={MdDoneOutline}/> : <Icon as={IoMdTime}/>}
                            </Group>
                        </HStack>
                    ))
                }
            </Box>
        </HStack>
    </Box>
}
export default GameCard