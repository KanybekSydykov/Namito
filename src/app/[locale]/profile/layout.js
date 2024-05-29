import { Flex } from "@chakra-ui/react";
import ProfileCover from "@/components/profile/ProfileCover";
import { getSession } from "@/lib/lib";
import { ENDPOINTS } from "@/API/endpoints";
export default async function ProfileLayout({
    children,params // will be a page or nested layout
  }) {

    const session = await getSession();
    const res = await fetch(`${ENDPOINTS.getUserProfile()}`, {
      cache: 'no-store',
      headers: {
        'Accept-Language': `${params.locale}`,
        'Authorization': `Bearer ${session.access_token}`
      }
    })
    const data = await res.json()
    const token = session.access_token

    return (
      <Flex 
      flexDir={'row'}
      gap={'30px'}
      ps={'16px'}
      >
        <ProfileCover data={data} token={token} >
            {children}
            </ProfileCover>
      </Flex>
   

    )
  }