import { useEffect, useState } from "react"
import PredictCard from "../components/PredictCard"
import RecentPredictCard from "../components/RecentPredictCard.jsx"

import { Box, Flex, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import api from "@/api"
import EmptyPredictCard from "@/components/loading/EmptyPredictCard"
import { clipPath } from "framer-motion/client"

function Predict(){
    const [upcomingPredictions, setUpcomingPredictions] = useState([])
    const [recentPredictions, setRecentPredictions] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getPredictions()
    }, [])
    async function getPredictions(){
        setLoading(true)
        try{
            const response = await api.get('/predictions/')
            setUpcomingPredictions(response.data.upcoming_predictions)
            setRecentPredictions(response.data.recent_predictions)
            console.log(response)
        }
        catch(err){
            console.log(err)
        }
        finally{
            setLoading(false)
        }
    }

    const maxColumns = getMaxColumns(upcomingPredictions)
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
    function getLoadingColumns(){
        return window.innerWidth < 480 ? 1 : window.innerWidth < 768 ? 2 : window.innerWidth < 1024 ? 3 : 4
    }

    function formatDate(dateString) {
        const [year, month, day] = dateString.split('-').map(Number);
        const date = new Date(year, month - 1, day); // month is 0-based
        const options = { weekday: 'short', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    return <Flex direction="column" justify="stretch" spaceY="10px">
        <Box textStyle="2xl" borderBottom="1px solid black">Upcoming Predictions</Box>
        <VStack align="stretch">
        {
            upcomingPredictions.map((day, i) => (
                <Box key={i} w="100%">
                    <Text textStyle="lg">{formatDate(day.date)}</Text>
                    <SimpleGrid 
                        columns={[1, 2, 3, 4]}
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
        {
            loading && <SimpleGrid 
                columns={getLoadingColumns()}
                maxW="1200px"
                gap="0"
            >
                {
                    Array.from({ length: getLoadingColumns() }).map((game, j) => (
                        <EmptyPredictCard key={j}/>
                    ))
                }
            </SimpleGrid>
        }
        </VStack>
        <br/>
        <Box textStyle="2xl" borderBottom="1px solid black">Recent Predictions</Box>
        <VStack align="stretch">
        {
            recentPredictions.map((day, i) => (
                <Box key={i} w="100%">
                    <Text textStyle="lg">{formatDate(day.date)}</Text>
                    <SimpleGrid 
                        columns={[1, 2, 3, 4]}
                        maxW="1200px"
                        gap="0"
                    >
                        {day.games.map((game, j) => (
                            <RecentPredictCard
                                predictionProp={game}
                                key={j}
                            />
                            
                        ))}
                    </SimpleGrid>
                </Box>
            ))
        }
        {
            loading && <SimpleGrid 
                columns={getLoadingColumns()}
                maxW="1200px"
                gap="0"
            >
                {
                    Array.from({ length: getLoadingColumns() }).map((game, j) => (
                        <EmptyPredictCard key={j}/>
                    ))
                }
            </SimpleGrid>
        }
        </VStack>
    </Flex>
}
export default Predict