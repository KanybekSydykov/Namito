'use client'
import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    Container,
  } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Link from 'next/link'
import Image from 'next/image'

const BreadCrumbs = ({data,locale}) => {
  return (
    <Container
    maxW={{ base: "100%", lg: "1200px", xl: "1280px", "2xl": "1440px" }}
    mt={{base:'40px',lg:'30px'}}
    px={'0px'}
    >

    <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
    <BreadcrumbItem>
      <BreadcrumbLink as={Link} href='/'><Image src={'/home-icon-bw.svg'} width={20} height={20} alt={'home'} /></BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbItem>
      <BreadcrumbLink as={Link} href={`/${locale}/catalog`}> {locale === 'ru' ? 'Каталог' : 'Catalog'}</BreadcrumbLink>
    </BreadcrumbItem>
  
 { data.parent && <BreadcrumbItem>
      <BreadcrumbLink as={Link} href={`/${locale}/category/${data.parent.slug}`}>{data.parent.name}</BreadcrumbLink>
    </BreadcrumbItem>}
  
    <BreadcrumbItem isCurrentPage>
      <BreadcrumbLink href='#'>{data.current}</BreadcrumbLink>
    </BreadcrumbItem>
  </Breadcrumb>
  </Container>

  )
}

export default BreadCrumbs