import { useState } from "react";

import { Box, Button, Flex, Image, Spacer, VStack, Text } from "@chakra-ui/react"
import { NumberInputField, NumberInputRoot } from "@/components/ui/number-input"

function PredictCard({ game }){
    const formattedGame = formatGame(game)

    const[awayScore, setAwayScore] = useState(0)
    const[homeScore, setHomeScore] = useState(0)

    function handleScoreChange(value, team){
        if(value >=0){
            if(team === "away"){
                setAwayScore(value)
            }
            else{
                setHomeScore(value)
            }
        }
    }

    const images = import.meta.glob("../assets/logos/*.png", { eager: true });
    const getImage = (team) => images[`../assets/logos/${team}.png`]?.default;

    function formatGame(game){
        // const date = new Date(game.date)
        // const formattedDate = new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric" }).format(date);
        return {
            ...game,
            // date: formattedDate
        }
    }

    const cardStyles = {
        w: "100%",
        p: "10px",
        spaceY: "10px",
        bgColor: "blue.400",
        color: "white",
        border: "1px solid white"
    }
    const buttonStyles = {
        h: "fit-content",
        p: "5px",
        bgColor: "green.500",
        color: "white",
        borderRadius: "5px",
        _hover: {
            cursor: "pointer",
            opacity: 0.8
        }
    }
    const inputStyles = {
        placeholder: "Enter score",
        size: "xs",
        css: {
            '&:focus': {
                borderColor: 'white',  
                outlineColor: 'white'
            }
        }
    }

    return <Box {...cardStyles}>
        <Box borderBottom="1px solid white">
            <Text textStyle="lg">Hoopers</Text>
        </Box>

        <VStack>
            <Flex width="100%" direction="row" justify="flex-start" align="center">
                <Image 
                    h="40px"
                    src={ getImage(formattedGame.awayTeam) }
                />
                <Text marginRight="10px">{formattedGame.awayTeam}</Text>
                <Spacer/>
                <NumberInputRoot 
                    defaultValue="0"
                    value={awayScore}
                    onValueChange={(e) => handleScoreChange(e.value, "away")}
                >
                    <NumberInputField {...inputStyles} />
                </NumberInputRoot>

            </Flex>
            <Flex width="100%" direction="row" justify="flex-start" align="center">
                <Image 
                    h="40px"
                    src={ getImage(formattedGame.homeTeam) }
                />
                <Text marginRight="10px">{formattedGame.homeTeam}</Text>
                <Spacer/>
                <NumberInputRoot 
                    defaultValue="0"
                    value={homeScore}
                    onValueChange={(e) => handleScoreChange(e.value, "home")}
                >
                    <NumberInputField {...inputStyles} />
                </NumberInputRoot>
            </Flex>
        </VStack>

        <Flex justify="flex-end">
            <Button {...buttonStyles}>
                Lock Picks
            </Button>
        </Flex>
    </Box>
}
export default PredictCard