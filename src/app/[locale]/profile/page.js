import ProfilePages from '@/components/profile/ProfilePages'
import React from 'react'

const page = ({params}) => {
  return (
    <div style={{
      paddingBottom:'30px',
      width:'100%',
    }}>
   <ProfilePages params={params} />
    </div>
  )
}

export default page