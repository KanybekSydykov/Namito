import { Flex, Spinner } from "@chakra-ui/react";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <Flex width={'100%'} h={'100%'} justifyContent={'center'} alignItems={'center'}>

        <Spinner size='xl' color="orange" />
    </Flex>
}