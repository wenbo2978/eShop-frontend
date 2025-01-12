import React, { useContext, useEffect } from 'react'
import CartItem from '../components/CartItem/CartItem';
import OrderSummary from '../components/Order/OrderSummary';
import { UserContexts } from '../contexts/UserContexts';


export default function Cart() {
  const {user} = useContext(UserContexts);
  useEffect(() => {
    console.log(user);
  }, [])
  return (
    <div className="flex flex-col md:flex-row p-3 md:px-20 gap-10">
      {/* place order */}
      <div className="order-1 md:order-2 flex-1 md:flex-[2] flex border-2 rounded-md max-h-[300px]">
        <OrderSummary totalAmount={user?.cart?.totalAmount}/>
      </div>

      {/* order Item */}
      <div className="order-2 md:order-1 md:flex-[3] flex-1 flex items-center justify-center flex-col gap-2">
        {
          user && user.cart && user.cart.items && user.cart.items.map((data, index) => (
            <CartItem key={index} Item={data}/>
          ))
        }
      </div>
    </div>
  )
}
