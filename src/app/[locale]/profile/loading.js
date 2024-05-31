import { Skeleton } from "@chakra-ui/react";



export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <Skeleton startColor="red" endColor="purple" width={'100dvw'} height={'100dvh'} />
  }