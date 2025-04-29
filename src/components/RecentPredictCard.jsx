import api from "../api";
import { useNotification } from "./Notification";

import { useState } from "react";

import { Box, Button, Flex, Image, Spacer, VStack, Text, SimpleGrid } from "@chakra-ui/react"
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

function RecentPredictCard({ predictionProp }){
    const [prediction, setPrediction] = useState(predictionProp)
    const[awayScore, setAwayScore] = useState(prediction.away_team_score || 0)
    const[homeScore, setHomeScore] = useState(prediction.home_team_score || 0)
    const [loading, setLoading] = useState(false)
    const { showNotification } = useNotification()

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

    const checkLength = (team) => {
        if(team === "Timberwolves"){
            return "TWolves"
        }
        else if(team === "Trail Blazers"){
            return "Blazers"
        }
        else{
            return team
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
        <Flex justify="space-between" align="center">
            <Text textStyle="xl">{prediction.score}/100</Text>
            <Text textStyle="md">Prediction</Text>
        </Flex>
        <Box>
            <SimpleGrid columns={4} columnGap={4} templateColumns="1fr 2fr 1fr 1fr" alignItems="center">
                <Image src={getImage(prediction.away_team)} maxBlockSize="40px" />
                <Text fontSize="lg">{checkLength(prediction.away_team)}</Text>
                <Text>{prediction.actual_away_team_score}</Text>
                <Flex direction="row" justify="space-evenly" alignItems="center" flexWrap="no-wrap"> 
                    {
                        prediction.actual_away_team_score > prediction.predicted_away_team_score ?
                        <FaCaretUp color="green" /> :
                        <FaCaretDown color="red" />
                    }
                    {prediction.predicted_away_team_score}
                </Flex>

                <Image src={getImage(prediction.home_team)} maxBlockSize="40px" />
                <Text fontSize="lg">{checkLength(prediction.home_team)}</Text>
                <Text>{prediction.actual_home_team_score}</Text>
                <Flex direction="row" justify="space-evenly" align="center" flexWrap="nowrap">
                    {
                        prediction.actual_home_team_score > prediction.predicted_home_team_score ?
                        <FaCaretUp color="green" /> :
                        <FaCaretDown color="red" />
                    }
                    {prediction.predicted_home_team_score}
                </Flex>
            </SimpleGrid>
        </Box>
        <Flex justify="flex-end">
            <Button {...buttonStyles} minW="80px" bgColor="red.500">
                View
            </Button>
        </Flex>
    </Box>
}
export default RecentPredictCard