import React, { useEffect } from 'react'

export default function OrderItems({item}) {
  console.log(item);
  return (
    <div className='flex flex-col gap-2 p-2'>
      <p>OrderDate : 2025-01-01</p>
      <p>TotalAmount : {item.totalAmount}</p>
      <p>Status : {item.status}</p>
    </div>
  )
}
