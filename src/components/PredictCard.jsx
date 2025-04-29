import api from "../api";
import { useNotification } from "./Notification";

import { useState } from "react";

import { Box, Button, Flex, Image, Spacer, VStack, Text } from "@chakra-ui/react"
import { NumberInputField, NumberInputRoot } from "@/components/ui/number-input"

function PredictCard({ predictionProp }){
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

    async function submitPrediction(){
        setLoading(true)
        try{
            const requestData = {
                predictionId: prediction.id,
                away_team_score: awayScore,
                home_team_score: homeScore
            }
            await api.post('/predictions/', requestData)
            showNotification(`Prediction for ${prediction.away_team} vs ${prediction.home_team} successfully submitted`)
            setPrediction({...prediction, status: 'Submitted'})
        }
        catch(err){
            showNotification('Something went wrong. Please try again')
            console.error(err)
        }
        finally{
            setLoading(false)
        }
    }

    function getLeagueNames(){
        let res = ""
        prediction.leagues.forEach(name => {
            res += name + " | "
        })
        if(res.lastIndexOf("|")!==-1) {
            res = res.slice(0, res.lastIndexOf("|"));
        }
        return res
    }

    const cardStyles = {
        direction: "column",
        justify: "space-evenly",
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

    return <Flex {...cardStyles}>
        <Box borderBottom="1px solid white">
            <Text textStyle="lg">{getLeagueNames()}</Text>
        </Box>

        <VStack>
            <Flex width="100%" direction="row" justify="flex-start" align="center">
                <Image 
                    maxBlockSize="40px"
                    src={ getImage(prediction.away_team) }
                />
                <Text marginRight="10px">{prediction.away_team}</Text>
                <Spacer/>
                <NumberInputRoot 
                    value={awayScore}
                    disabled={prediction.status !== 'Pending'}
                    onValueChange={(e) => handleScoreChange(e.value, "away")}
                >
                    <NumberInputField {...inputStyles} />
                </NumberInputRoot>

            </Flex>
            <Flex width="100%" direction="row" justify="flex-start" align="center">
                <Image 
                    maxBlockSize="40px"
                    src={ getImage(prediction.home_team) }
                />
                <Text marginRight="10px">{prediction.home_team}</Text>
                <Spacer/>
                <NumberInputRoot 
                    value={homeScore}
                    disabled={prediction.status !== 'Pending'}
                    onValueChange={(e) => handleScoreChange(e.value, "home")}
                >
                    <NumberInputField {...inputStyles} />
                </NumberInputRoot>
            </Flex>
        </VStack>

        <Flex justify="flex-end">
            <Button {...buttonStyles} disabled={prediction.status !== 'Pending'} onClick={() => submitPrediction()}>
                Lock Picks
            </Button>
        </Flex>
    </Flex>
}
export default PredictCard