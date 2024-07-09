import { Flex } from "@chakra-ui/react";
import ProfileCover from "@/components/profile/ProfileCover";
import { getSession } from "@/lib/lib";
import { ENDPOINTS } from "@/API/endpoints";
export default async function ProfileLayout({
    children,params // will be a page or nested layout
  }) {

    const session = await getSession();
    const token = session?.access_token;
    const headers = {
      'Accept-Language': `${params.locale}`,
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  
    const res = await fetch(`${ENDPOINTS.getUserProfile()}`, {
      cache: 'no-store',
      headers:headers
    })
    const data = await res.json()

    return (
      <Flex 
      flexDir={'row'}
      gap={'30px'}
      px={'16px'}
      mt={{base:'70px',lg:'0px'}}
      >
        <ProfileCover data={data} token={token} >
            {children}
            </ProfileCover>
      </Flex>
   

    )
  }