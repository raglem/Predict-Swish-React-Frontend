import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Flex, Heading, HStack, Spacer, Box, Button, Icon, Text, useBreakpointValue } from "@chakra-ui/react"
import { MdEmail, MdMenu } from "react-icons/md"
import { FaHamburger } from "react-icons/fa"

function Navbar() {
    const navigate = useNavigate()

    const location = useLocation()

    const [selectedPage, setSelectedPage] = useState(location.pathname.substring(1))
    const [showDropdown, setShowDropdown] = useState(false)
    const isMobile = useBreakpointValue({base: true, md: false})

    const buttonStyles = {
        h: "fit-content",
        bgColor: "white",
        color: "black",
        borderRadius: "5px",
        p: "5px",
        _hover: {
            cursor: "pointer",
            opacity: 0.5
        }
    }
    const selectedButtonStyles = {
        ...buttonStyles,
        bgColor: "gray.500",
        color: "white"
    }
    const optionStyles = {
        w: "200px",
        p: "10px",
        bgColor: "white",
        color: "blue.400",
        borderLeft: "1px solid gray",
        borderRight: "1px solid gray",
        borderBottom: "1px solid gray",
        zIndex: "100",
        _hover:{
            cursor: "pointer",
            bgColor: "blue.400",
            color: "white"
        }
    }

    const handlePageChange = (page) => {
        navigate(`/${page}`)
        setSelectedPage(page)
        setShowDropdown(false)
    }

    return (
        <Flex 
            direction="row" 
            align="center"
            h="50px" 
            w="100vw" 
            p="10px" 
            bgColor="blue.400"
        >
            
            <Heading fontWeight="bold" color="white">
                Predict & Swish
            </Heading>

            <Spacer />
            <Icon 
                as={MdEmail} 
                color={selectedPage=='notifications' ? 'gray' : 'white'}
                boxSize={6}
                marginRight="10px"
                _hover={{
                    cursor: "pointer",
                    opacity: 0.5
                }}
                onClick={() => handlePageChange('notifications')}
            />
            {isMobile ?  
            (
                <>
                    <Flex h="50px" position="relative" align="center">
                        <Icon 
                            as={MdMenu}
                            color="white"
                            boxSize={6}
                            _hover={{
                                cursor: "pointer",
                                opacity: 0.5
                            }}
                            onClick={() => setShowDropdown(!showDropdown)}
                        />
                        {showDropdown && 
                            <Flex 
                                position="absolute"
                                top="100%"
                                right="0%"
                                direction="column"
                                z-index="100"
                                bgColor="white"
                                shadow="5px 5px 5px 1px rgba(0, 0, 255, .2)"
                            >
                                <Box {...optionStyles} onClick={() => handlePageChange('home')}>
                                    Home
                                </Box>
                                <Box {...optionStyles} onClick={() => handlePageChange('games')}>
                                    Games
                                </Box>
                                <Box {...optionStyles} onClick={() => handlePageChange('home')}>
                                    Leagues
                                </Box>
                            </Flex>
                        } 
                    </Flex>
                </>
            ) : 
            (
                <Flex align="center">
                    <HStack gap="10px" px="10px">
                        <Button  {...buttonStyles} 
                            {...(selectedPage === "home" ? selectedButtonStyles : buttonStyles)}  
                            onClick={() => handlePageChange('home')}
                        >
                            Home
                        </Button>
                        <Button 
                            {...(selectedPage === "games" ? selectedButtonStyles : buttonStyles)}  
                            onClick={() => handlePageChange('games')}
                        >
                            Games
                        </Button>
                        <Button 
                            {...(selectedPage === "leagues" ? selectedButtonStyles : buttonStyles)}  
                            onClick={() => handlePageChange('leagues')}
                        >
                            Leagues
                        </Button>
                    </HStack>
                </Flex>
            )}
        </Flex>
    )
}

export default Navbar
