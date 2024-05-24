import CartItem from '@/components/cart/CartItem'
import OrangeButton from '@/components/ui/OrangeButton'
import { Flex, Highlight, Text, Box } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const data = true;

const page = ({ params }) => {

    const { locale } = params
    return (
        <Flex
            flexDir={'column'}
        >
            <Flex
                flexDir={"row"}
                gap={"16px"}
                py={"10px"}
                px={"16px"}
                alignItems={"center"}
                boxShadow={'0 1px 4px 0 rgba(151, 151, 151, 0.25)'}
            >

                <Text
                    fontFamily={"roboto"}
                    fontWeight={"700"}
                    fontSize={"16px"}
                    lineHeight={"22px"}
                >
                    Корзина
                </Text>
            </Flex>
            {data ? <>
                <Flex flexDir={'column'} gap={'16px'} mt={'30px'}>

                    <CartItem />
                    <CartItem />
                </Flex>

                <Text
                    fontFamily={'roboto'}
                    fontWeight={'700'}
                    fontSize={'18px'}
                    lineHeight={'27px'}
                    color={'rgba(35, 133, 109, 1)'}
                    textAlign={'end'}
                    pe={'20px'}
                    mt={'30px'}
                >
                    <Highlight
                        query={'Общая цена'}
                        styles={{
                            fontWeight: '300',
                            color: 'rgba(146, 146, 146, 1)',
                            marginRight: '14px'
                        }}
                    >
                        Общая цена 40000 сом
                    </Highlight>
                </Text>

            </>
                :
                <Flex
                    flexDir={'column'}
                    gap={'26px'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    mt={'140px'}
                >
                    <Text
                        fontFamily={"roboto"}
                        fontWeight={"600"}
                        fontSize={"18px"}
                        lineHeight={"25px"}
                        textAlign={'center'}
                    >
                        В корзине нет ни одного товара
                    </Text>

                    <Image src={'/decor-star.png'} width={50} height={50} />
                </Flex>}

            <Box as={Link}
                width={'100%'}
                px={'20px'}
                py={'7px'}
                mt={data ? '120px' : '46px'}
                href={data ? `/${locale}/checkout` : '/'}
            >

                <OrangeButton link={data ? '/checkout' : '/'} text={data ? 'Оформить заказ' : 'Главная'} />
            </Box>

        </Flex>
    )
}
export default page
