import { ENDPOINTS } from '@/API/endpoints'
import OrderDetails from '@/components/profile/OrderDetails'
import { getData } from '@/lib/apiServices'
import { getSession } from '@/lib/lib'
import React from 'react'

const page = async({params,searchParams}) => {
  const session = await getSession();
  const {id} = searchParams;

  const token = session?.access_token

  const response = await getData(token,ENDPOINTS.getUserOrderId(id))

  console.log(response,id);

  return (
    <OrderDetails params={params} searchParams={searchParams} data={response.data}/>
  )
}

export default page