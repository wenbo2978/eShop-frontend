import React from 'react'
import ShippingMethod from '../components/PlaceOrderComp/ShippingMethod'
import PaymentMethod from '../components/PlaceOrderComp/PaymentMethod'
import OrderSummaryUnion from '../components/PlaceOrderComp/OrderSummaryUnion'

export default function PlaceOrder() {
  return (
    <div className='justify-center w-full mx-auto flex flex-col md:flex-row gap-2 m-10 p-5'>
      <div className="flex flex-col gap-4 w-full p-2">
        <ShippingMethod/>
        <PaymentMethod/>
      </div>
      <div className='flex flex-col gap-4 w-full p-2'>
        <OrderSummaryUnion/>
      </div>
    </div>
  )
}
