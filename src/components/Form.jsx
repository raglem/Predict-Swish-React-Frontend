import { Flex } from "@chakra-ui/react"

function Form({ children }){
    const border = {
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "blue.400",
        borderRadius: "10px"
    }
    return <Flex h="100vh" minH="800px" w="100vw" justify="center" align="center" overflowY="scroll">
        <Flex direction="column" justify="stretch" w="80vw" maxW="1024px" p="20px" spaceY="20px" {...border}>
            {children}
        </Flex>
    </Flex>
}
export default Form