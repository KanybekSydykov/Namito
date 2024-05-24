import React from 'react'
import {Container} from '@chakra-ui/react'

const ContainerBox = ({children}) => {
  return (
   <Container
   maxW={{base:'1200px',xl:'1472px'}}

   pb={'90px'}
   >
    {children}
   </Container>
  )
}

export default ContainerBox