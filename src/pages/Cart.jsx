import React from 'react'
import CartItem from '../components/CartItem/CartItem';
import Img from '../assets/hero/watch.png'
import OrderSummary from '../components/Order/OrderSummary';

const cartItems = [
  {
    name: "apple watch",
    img: Img,
    price: 9.9,
    quantity: 1
  },
  {
    name: "apple watch",
    img: Img,
    price: 9.9,
    quantity: 1
  },
  {
    name: "apple watch",
    img: Img,
    price: 9.9,
    quantity: 1
  },
  {
    name: "apple watch",
    img: Img,
    price: 9.9,
    quantity: 1
  },
  {
    name: "apple watch",
    img: Img,
    price: 9.9,
    quantity: 1
  }
];

export default function Cart() {
  return (
    <div className="flex flex-col md:flex-row p-3 md:px-20 gap-10">
      {/* place order */}
      <div className="order-1 md:order-2 flex-1 md:flex-[2] flex border-2 rounded-md max-h-[300px]">
        <OrderSummary />
      </div>

      {/* order Item */}
      <div className="order-2 md:order-1 md:flex-[3] flex-1 flex items-center justify-center flex-col gap-2">
        {
          cartItems.map((data, index) => (
            <CartItem key={index} Item={data}/>
          ))
        }
      </div>
    </div>
  )
}
