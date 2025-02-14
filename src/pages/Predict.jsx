import PredictCard from "../components/PredictCard"

import { Box, Flex, SimpleGrid, Text, VStack } from "@chakra-ui/react"

function Predict(){
    const dummyData = [
        {
            date: '2025-02-01 00:00:00+00',
            games: [
                {
                    awayTeam: "Hawks",
                    homeTeam: "Celtics"
                },
                {
                    awayTeam: "Hawks",
                    homeTeam: "Celtics"
                },
                {
                    awayTeam: "Celtics",
                    homeTeam: "Celtics"
                }
            ]
        },
        {
            date: '2025-02-02 00:00:00+00',
            games: [
                {
                    awayTeam: "Hawks",
                    homeTeam: "Hawks"
                },
                {
                    awayTeam: "Celtics",
                    homeTeam: "Hawks"
                },
            ]
        },
        // {
        //     date: '2025-02-03 00:00:00+00',
        //     games: [
        //         {
        //             awayTeam: "Hawks",
        //             homeTeam: "Hawks"
        //         },
        //         {
        //             awayTeam: "Celtics",
        //             homeTeam: "Hawks"
        //         },
        //         {
        //             awayTeam: "Hawks",
        //             homeTeam: "Hawks"
        //         },
        //         {
        //             awayTeam: "Celtics",
        //             homeTeam: "Hawks"
        //         },
        //     ]
        // },
    ]

    const maxColumns = getMaxColumns(dummyData)
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

    function formatDate(rawDate){
        const date = new Date(rawDate)
        return new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric" }).format(date);
    }

    return <Flex direction="column" justify="stretch">
        <VStack>
        {
            dummyData.map((day, i) => (
                <Box key={i} w="100%">
                    <Text textStyle="lg">{formatDate(day.date)}</Text>
                    <SimpleGrid 
                        columns={columns}
                        maxW="1200px"
                        gap="0"
                    >
                        {day.games.map((game, j) => (
                            <PredictCard
                                game={game}
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