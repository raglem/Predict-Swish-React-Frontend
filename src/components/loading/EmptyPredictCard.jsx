import { Flex } from "@chakra-ui/react";

function EmptyPredictCard(){
    const cardStyles = {
        w: "100%",
        p: "10px",
        spaceY: "10px",
        bgColor: "blue.400",
        color: "white",
        border: "1px solid white"
    }
    return(
        <Flex {...cardStyles} h="190px" animation="pulse">
            
        </Flex>
    )
}
export default EmptyPredictCard