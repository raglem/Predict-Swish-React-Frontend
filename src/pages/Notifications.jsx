import { Box, Flex, HStack, Icon, Spacer, Text } from "@chakra-ui/react"

import { MdAdd, MdOutlineSportsBasketball, MdAddCircleOutline, MdPersonRemoveAlt1 } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
function Notifications(){
    const dummyData = [
        {
            icon: "remove",
            message: "You got 5th place for Hawks vs. Clippers. ",
            date: '2025-02-13 00:00:00+00',
        },
        {
            icon: "game",
            message: "You got 5th place for Hawks vs. Clippers.",
            date: '2025-02-14 02:04:12+00',
        },
        {
            icon: "game",
            message: "You got 5th place for Hawks vs. Clippers.",
            date: '2025-02-13 00:00:00+00',
        },
    ]
    function getIcon(icon){
        if(icon==="game"){
            return <Icon
                        as={MdOutlineSportsBasketball}
                        height="30px"
                        w="auto"
                        color="blue.400"
                        marginRight="10px"
                    />
        }
        if(icon==="friend"){
            return <Icon
                        as={FaUserFriends}
                        height="30px"
                        w="auto"
                        color="blue.400"
                        marginRight="10px"
                    />
        }
        if(icon==="add"){
            return <Icon
                        as={MdAddCircleOutline}
                        height="30px"
                        w="auto"
                        color="blue.400"
                        marginRight="10px"
                    />
        }
        if(icon==="remove"){
            return <Icon
                        as={MdPersonRemoveAlt1}
                        height="30px"
                        w="auto"
                        color="blue.400"
                        marginRight="10px"
                    />
        }
    }
    function formatNotificationTime(notificationTime) {
        const now = new Date();
        const notificationDate = new Date(notificationTime);
      
        // Calculate the time difference in milliseconds
        const timeDifference = now - notificationDate;
      
        const oneMinute = 60 * 1000;
        const oneHour = 60 * oneMinute;
        const oneDay = 24 * oneHour;
        const oneMonth = 30 * oneDay;
      
        // If sent less than an hour ago, show minutes
        if (timeDifference < oneHour) {
          const minutes = Math.floor(timeDifference / oneMinute);
          if(minutes === 1){
            return "1 minute ago"
          }
          return `${minutes}min ago`;
        }
      
        // If sent less than a day ago, show hours
        if (timeDifference < oneDay) {
          const hours = Math.floor(timeDifference / oneHour);
          if(hours === 1){
            return "1 hour ago"
          }
          return `${hours} hours ago`;
        }
      
        // If sent less than a month ago, show days
        if (timeDifference < oneMonth) {
          const days = Math.floor(timeDifference / oneDay);
          if(days === 1){
            return "1 day ago"
          }
          return `${days} days ago`;
        }
      
        // Otherwise, show months
        const months = Math.floor(timeDifference / oneMonth);
        if(months === 1){
            return "1 month ago"
        }
        return `${months} months ago`;
      }
      
    return <Flex 
            direction="column" 
            justify="center" 
            align="center" 
            w="100vw"
        >
        <Box p="10px" justify="center" spaceY="10px" w="100%" maxW="768px">
            <HStack borderBottom="1px solid black">
                <Text textStyle="lg">Notification Center</Text>
                <Spacer/>
                <Text 
                    color="blue.400"
                    _hover={{
                        cursor: "pointer",
                        transform: "scale(1.05)",
                        transition: "transform 0.2s ease-in-out"
                    }}
                >
                    Clear All
                </Text>
            </HStack>

            <Flex direction="column">
                {
                    dummyData.map((notification, i) => (
                        <Flex 
                            direction="row" 
                            justify="space-between"
                            align="center"
                            py="10px"
                            spaceX="10px"
                            borderStyle="solid"
                            borderBottomWidth="1px"
                            borderColor="blue.400"
                            _hover={{
                                transform: "scale(1.02)",
                                transition: "transform 0.2s ease-in-out"
                            }}
                            key={i}
                        >
                            <Flex align="center">
                                {getIcon(notification.icon)}
                                <Box direction="column">
                                    <Text>
                                        {notification.message}
                                    </Text>
                                    <Text textStyle="xs" color="gray">
                                        {formatNotificationTime(notification.date)}
                                    </Text>
                                </Box>
                            </Flex>
                
                            <Icon
                                as={FaX}
                                color="gray"
                                _hover={{
                                    cursor: "pointer",
                                    color: "red",
                                    transform: "scale(1.25)",
                                    transition: "transform 0.2s ease-in-out"
                                }}
                            />
                        </Flex>
                    ))
                }
            </Flex>
        </Box>
    </Flex>
}
export default Notifications