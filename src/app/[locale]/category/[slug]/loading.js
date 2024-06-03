import CategorySkeleton from "@/components/Skeletons/CategorySkeleton";
import { Flex, Skeleton } from "@chakra-ui/react";


export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <Flex  width={'100%'} height={'100%'} justifyContent={'center'} alignItems={'center'} bg={'rgba(0,0,0,0.5)'}>
      <Skeleton color={'orange'} size={'xl'} />
    </Flex>
  }