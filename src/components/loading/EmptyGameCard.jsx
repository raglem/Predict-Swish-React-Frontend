import { Flex, HStack } from "@chakra-ui/react"

function EmptyGameCard(){
    const gameCardStyles = {
        direction: "column",
        justify: "space-between",
        h: "260px",
        w: "300px",
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
        spaceY: "2",
        overflowY: "auto",
    }

    return (
        <HStack>
            <Flex 
                {...gameCardStyles} 
                animation="pulse"
            >
            </Flex>
            <Flex 
                {...leaderboardCardStyles}
                animation="pulse"
            >
            </Flex>
        </HStack>
    )
}

export default EmptyGameCard