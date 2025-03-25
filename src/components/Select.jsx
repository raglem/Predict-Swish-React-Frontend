import { useState, useRef, useEffect } from "react";

import { Box, Flex, HStack, Icon, Input, Spacer, Text } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"

import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { MdInfoOutline } from "react-icons/md";

function Select({label, detail, info, placeholder, selected, options, onSelect}){
    const [isFocused, setIsFocused] = useState(false)
    const selectRef = useRef(null)
    const selectListRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (selectListRef.current && !selectRef.current.contains(event.target) && !selectListRef.current.contains(event.target)) {
                setIsFocused(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        //use mousedown event to allow click to trigger setIsFocused(true) and allow dropdown to open
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    function handleOptionChange(option){
        onSelect(detail, option)
        setIsFocused(false)
    }

    const inputStyle={
        w: "100%",
        p: "5px",
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: "5px",
        fontSize: "sm",
        color: "gray.500",
        bgColor: "white"
    }
    const optionStyle={
        borderBottomWidth: "1px",
        borderStyle: "solid",
        borderColor: "gray.400",
        paddingTop: "5px",
        px: "5px",
        _hover: {
            cursor: "pointer",
            bgColor: "blue.400",
            color: "white",
            borderColor: "white"
        }
    }
    return <Box w="100%" position="relative">
        <Flex direction="row" align="center">
            <Text textStyle="sm">{label}</Text>
            {info && <Icon 
                as={MdInfoOutline}
                color="blue.400"
                marginLeft="5px"
                _hover={{
                    cursor: "pointer"
                }}
            />}
        </Flex> 
        <Box 
            {...inputStyle} 
            borderColor={isFocused ? "blue.400" : "gray.200"} 
            onClick={() => setIsFocused(!isFocused)}
            ref={selectRef}
        >
            <HStack>
                {selected || placeholder}
                <Spacer/>
                <Icon 
                    as={isFocused ? FaCaretUp : FaCaretDown}
                    _hover={{
                        cursor: "pointer"
                    }}
                />
            </HStack>
        </Box>

        {isFocused && 
            <Box 
                {...inputStyle} 
                maxH = "140px"
                position="absolute" 
                top="100%"
                left="0"
                zIndex="10" 
                overflowY="auto"
                ref={selectListRef}
            >
                {options.map(option => (
                    <Box 
                        {...optionStyle} 
                        key={option}
                        onClick={() => handleOptionChange(option)}
                    >
                        <Text textStyle="sm">
                            {option}
                        </Text>
                    </Box>
                ))}
            </Box>
        }
    </Box>
}
export default Select