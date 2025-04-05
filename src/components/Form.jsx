import { Flex } from "@chakra-ui/react"

function Form({ children }){
    const border = {
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "blue.400",
        borderRadius: "10px"
    }
    return <Flex h="100vh" w="100vw" justify="center" align="center">
        <Flex direction="column" p="20px" maxW="1024px" {...border}>
            {children}
        </Flex>
    </Flex>
}
export default Form