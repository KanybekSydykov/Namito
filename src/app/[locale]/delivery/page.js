import ProfileAboutApp from '@/components/profile/ProfileAboutApp'
import { Container } from '@chakra-ui/react'
import React from 'react'

const page = () => {
  return (
    <Container 
    maxW={{base:'1200px',xl:'1472px'}}
    py={'50px'}
    >

        <ProfileAboutApp />
    </Container>
  )
}

export default page