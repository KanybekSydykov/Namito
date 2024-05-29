import React from 'react'
import CheckBoxList from './CheckBoxList'
import { useParams } from 'next/navigation';

const SizeFilter = ({getValues,data}) => {
    const {locale} = useParams();

  return (
    <CheckBoxList
    title={locale === "ru" ? "Размер" : "Size"}
    getValues={getValues}
    data={data}
  />
  )
}

export default SizeFilter