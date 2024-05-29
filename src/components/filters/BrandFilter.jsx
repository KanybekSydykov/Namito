import React from 'react'
import CheckBoxList from './CheckBoxList'
import { useParams } from 'next/navigation'

const BrandFilter = ({getValues,data}) => {
    const {locale} = useParams();
  return (
    <CheckBoxList
    title={locale === 'ru' ? "Бренд" : "Brand"}
    getValues={getValues}
    data={data}
  />
  )
}

export default BrandFilter