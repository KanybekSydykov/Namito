import { ENDPOINTS } from '@/API/endpoints'
import ProfileAboutApp from '@/components/profile/ProfileAboutApp'
import { Container } from '@chakra-ui/react'
import React from 'react'

const page = async({params}) => {
  const res = await fetch(ENDPOINTS.getAboutPage(),{
    cache:'no-store',
    headers: {
      'Accept-Language':`${params.locale}`,
    }
  })

  const data = await res.json()
  console.log(data);
  return (
    <Container
    maxW={{base:'1200px',xl:'1472px'}}
    py={'50px'}
    >

        <ProfileAboutApp data={data} />
    </Container>
  )
}

export default page