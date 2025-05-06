import { Spinner, Center } from '@chakra-ui/react';

const Loading = () => {
    return (
        <Center>
            <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
        </Center>
    );
};

export default Loading;