import { Flex } from "@chakra-ui/react";
import ProfileCover from "@/components/profile/ProfileCover";
export default function ProfileLayout({
    children, // will be a page or nested layout
  }) {
    return (
      <Flex 
      flexDir={'row'}
      gap={'30px'}
      >
        <ProfileCover >
            {children}
            </ProfileCover>
      </Flex>
   

    )
  }