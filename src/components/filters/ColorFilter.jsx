import React from 'react'
import CheckBoxList from './CheckBoxList'
import { useParams } from 'next/navigation';
const ColorFilter = ({getValues,data}) => {
    const {locale} = useParams();

  return (
    <CheckBoxList
    title={locale === "ru" ? "Цвет" : "Colors"}
    getValues={getValues}
    data={data}
    roundedFull
  />
  )
}

export default ColorFilter