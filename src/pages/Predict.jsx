import { useEffect, useState } from "react"
import PredictCard from "../components/PredictCard"

import { Box, Flex, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import api from "@/api"

function Predict(){
    const [predictions, setPredictions] = useState([])
    useEffect(() => {
        getPredictions()
    }, [])
    async function getPredictions(){
        try{
            const response = await api.get('/predictions/')
            setPredictions(response.data.data)
            console.log(response)
        }
        catch(err){
            console.log(err)
        }
    }

    const maxColumns = getMaxColumns(predictions)
    const columns = getColumns()

    function getMaxColumns(days){
        // 4 is typically the max # of columns; however, we will check the schedule. if the # of
        // games for all given day does not exceed 4 (ex. 3), then we will format the columns so 3
        // is the max amount of columns and we can center the table
        let res = 0
        for(let i=0; i<days.length; i++){
            if(days[i].games.length == 4){
                return 4
            }
            res = Math.max((days[i].games.length % 4), res)
        }
        return res
    }
    function getColumns(){
        // we will typically have the # of columns decided by the current breakpoint (screen width).
        // however, if the calculated max number of columns is smaller (there are never a lot of games on 
        // a given day), we will adjust the number of columns based on content (# of games) instead of breakpoint
        let columns = []
        for(let i=0; i<4; i++){
            columns.push(Math.min(i+1, maxColumns))
        }
        return columns
    }

    function formatDate(dateString) {
        const [year, month, day] = dateString.split('-').map(Number);
        const date = new Date(year, month - 1, day); // month is 0-based
        const options = { weekday: 'short', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    return <Flex direction="column" justify="stretch">
        <VStack>
        {
            predictions.map((day, i) => (
                <Box key={i} w="100%">
                    <Text textStyle="lg">{formatDate(day.date)}</Text>
                    <SimpleGrid 
                        columns={columns}
                        maxW="1200px"
                        gap="0"
                    >
                        {day.games.map((game, j) => (
                            <PredictCard
                                predictionProp={game}
                                key={j}
                            />
                            
                        ))}
                    </SimpleGrid>
                </Box>
            ))
        }
        </VStack>
    </Flex>
}
export default Predict