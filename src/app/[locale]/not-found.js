import OrangeButton from '@/components/ui/OrangeButton'
import { Box, Container, Text } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <Container
    maxW={{base:'1200px',xl:'1472px'}}
    display={"flex"}
    justifyContent={"center"}
    pt={'50px'}
    pb={'150px'}
    flexDir={'column'}
    alignItems={'center'}
    gap={'70px'}
    fontFamily={'roboto'}
    >
      <Text
      fontWeight={'700'}
      fontSize={'22px'}
      lineHeight={'30px'}
      >
      К сожалению, эта страница не найдена
      </Text>

      <Box
      w={{base:'326px',lg:'651px'}}
      h={{base:'125px',lg:'241px'}}
      position={'relative'}
      >
        <Image src={'/404.png'} fill />
      </Box>

      <Link href={`/`}>
      <OrangeButton  text={'Вернуться на главную'}/>
      </Link>

    </Container>
  )
}