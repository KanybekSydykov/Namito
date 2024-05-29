import ProfilePages from '@/components/profile/ProfilePages'
import React from 'react'
import {getSession , logout } from "@/lib/lib"
import {redirect} from 'next/navigation'
import { ENDPOINTS } from '@/API/endpoints'
import { Flex } from '@chakra-ui/react'
import ProfileNav from '@/components/profile/ProfileNav'

const page = async({params}) => {

  const session = await getSession();
  const res = await fetch(`${ENDPOINTS.getUserProfile()}`, {
    cache: 'no-cache',
    headers: {
      'Accept-Language': `${params.locale}`,
      'Authorization': `Bearer ${session.access_token}`
    }
  })
  const data = await res.json()
  const token = session.access_token

  if(!token){
    redirect('/login')
  }



  return (
    <div style={{
      paddingBottom:'30px',
      width:'100%',
    }}>
 
   <ProfilePages data={data} token={token} />
    </div>
  )
}

export default page