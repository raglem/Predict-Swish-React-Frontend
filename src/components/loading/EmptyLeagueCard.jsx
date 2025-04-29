import { Box, Flex, SimpleGrid, Image, Icon } from "@chakra-ui/react";

function EmptyLeagueCard(){
    return <Box w="100%" maxW="1024px">
        <Flex direction="row" align="flex-end" justify="space-between" borderBottom="1px solid white" textStyle="xl">
            Loading...
        </Flex>
        <Flex justify="space-between" columnGap="10px">
            <Box h="500px" w="70%" p="10px"bgColor="blue.400" borderRadius="20px" animation="pulse">
            </Box>
            <Box h="500px" w="30%" p="10px"bgColor="red.500" borderRadius="20px" animation="pulse">
            </Box>
        </Flex>
    </Box>
}

export default EmptyLeagueCard