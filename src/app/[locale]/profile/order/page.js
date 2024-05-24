import OrderDetails from '@/components/profile/OrderDetails'
import React from 'react'

const page = ({params,searchParams}) => {
  return (
    <OrderDetails params={params} searchParams={searchParams}/>
  )
}

export default page