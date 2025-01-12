import React from 'react'
import Button from '../Shared/Button'
import { useNavigate } from 'react-router-dom'



export default function OrderSummary({totalAmount}) {
  const naviagte = useNavigate();
  return (
    <div className='w-full flex flex-col p-2 gap-2 my-auto'>
      <p className='font-extrabold text-[20px]'>Order Summary</p>
      <div className='w-full flex flex-col p-4 gap-2'>
        <div className='flex flex-row justify-between'>
          <p>Item:</p>
          <p>${totalAmount}</p>
        </div>
        <div className='flex flex-row justify-between'>
          <p>Shipping & handling:</p>
          <p>$4.99</p>
        </div>
        <div className='flex flex-row justify-between items-center'>
          <p>Total before tax:</p>
          <p className='border-t-2 pt-2'>$370.50</p>
        </div>
        <div className='flex flex-row justify-between'>
          <p>Estimated tax (10%):</p>
          <p>$37.05</p>
        </div>
        <div className='flex flex-row justify-between font-bold text-lg border-t-2 pt-2'>
          <p className='text-red-600 dark:text-slate-200'>Order total:</p>
          <p>$407.55</p>
        </div>
        <Button 
          bgColor={"bg-yellow-400"}
          text={"Place your order"}
          handler={() => naviagte('/place-order')}
        />
      </div>
    </div>
  )
}
