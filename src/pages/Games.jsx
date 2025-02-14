import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import GameCard from "../components/GameCard";

function Games() {
    return (
        <Flex direction="column" w="100vw" align="center">
            <Box p="10px" justify="center" spaceY="10px">
                <Flex justify="stretch" borderBottom="1px solid black">
                    <Text textStyle="lg">Pending Games</Text>
                </Flex>
                <Flex justify="center">
                    <SimpleGrid 
                        columns={[1, 1, 2, 2, 3]} 
                        gap={4} 
                    >
                        <GameCard />
                        <GameCard />
                        <GameCard />
                    </SimpleGrid>
                </Flex>
            </Box>

            
        </Flex>
    );
}
export default Games;
