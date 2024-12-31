import React from 'react'
import ProductItem from '../components/Products/ProductItem'

const list = [
  1, 2, 3, 4, 5, 6
]

export default function ProductsList() {
  return (
    <div className='max-w-4xl mx-auto p-5 gap-3 flex flex-col '>
      {
        list.map((data, index) => (
          <ProductItem key={index}/>
        ))
      }
    </div>
  )
}
