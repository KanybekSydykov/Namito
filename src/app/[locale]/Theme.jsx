'use client'

import { Roboto,Readex_Pro } from "next/font/google";
import { ChakraProvider ,extendTheme} from '@chakra-ui/react'

  const readex = Readex_Pro({
    subsets: ['latin'],
    weight: ['700'],
    variable: '--font-readex',
  })

  const roboto = Roboto({
    subsets: ['latin'],
    weight: ['300','400','500' ,'700','900'],
    variable: '--font-roboto',
  })

  const theme = extendTheme({
    fonts: {
      roboto:roboto.style.fontFamily,
      readex:readex.style.fontFamily
    },
    colors:{
      orange:'#CB4609',
      fontgray:'#B7B7B7',
        300:'#FCB900'
    },
    breakpoints:{
      base: '0em',
      sm: '30em',
      md: '48em',
      lg: '62em',
      xl: '80em',
      '2xl': '90em'
    },
    size:{
      xl:'24px'
    },
    
  })


export function Providers({ children }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}