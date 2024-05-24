import { ChevronRightIcon } from '@chakra-ui/icons'
import { Flex } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProfileLink = ({url,text,icon}) => {
  return (
    <Link href={url}>
    <Flex
    flexDir={'row'}
    justifyContent={'space-between'}
    alignItems={'center'}
    >
        <Flex
        flexDir={'row'}
        gap={'10px'}
        alignItems={'center'}
        >

        <Image src={icon} alt={text} width={20} height={20} />
        <Text>{text}</Text>
        </Flex>
        <ChevronRightIcon />
    </Flex>
    </Link>
  )
}

export default ProfileLink