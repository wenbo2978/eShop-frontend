import React from 'react'

export default function ShippingMethod() {
  return (
    <div className='flex flex-col justify-center items-center gap-2 border rounded-md py-6 px-4 shadow-md'>
      <h className='text-[30px] font-bold text-slate-600 dark:text-slate-400'>Shipping Method</h>
      <label className='flex flex-row justify-between border p-3 w-full px-6'>
        <input type='radio'/>
        <p>Free Shipping</p>
      </label>
      <label className='flex flex-row justify-between border p-3 w-full px-6'>
        <input type='radio'/>
        <p>Standard Shipping</p>
      </label>
    </div>
  )
}
