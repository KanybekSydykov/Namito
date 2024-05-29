import React from 'react'
import CheckOut from '@/components/checkout/CheckOut'
import { getSession } from '@/lib/lib';
import { getData } from '@/lib/apiServices';
import { ENDPOINTS } from '@/API/endpoints';
const page = async() => {

  const session = await getSession();
  const res = await getData(session.access_token,ENDPOINTS.getCartData());
  const data = res.data;


  return (
   <>
   <CheckOut data={data} token={session.access_token} />
   </>
  )
}

export default page