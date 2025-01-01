import React, { useState } from 'react'
import { BiRadio } from 'react-icons/bi'

const deliveryDate = [
  "Tuesday, Jan 7",
  "Sunday, Jan 4",
  "Friday, Jan 1"
]

export default function CartItem({Item}) {
  const [shippingDay, setShippingDay] = useState(0);
  const [updateClick, setUpdateClick] = useState(false);
  return (
    <div className='border-2 rounded-md p-2'>
      <p className='font-extrabold text-[19px] text-slate-600 dark:text-slate-200'>Delivery Date : {deliveryDate[shippingDay]}</p>
      <div className='grid grid-cols-3'>
        <div>
          <img 
            alt='img'
            src={Item.img}
            className='w-full h-[200px] overflow-hidden'
          />
        </div>
        <div className='col-span-2 grid grid-cols-2'>
          <div className='flex flex-col mt-5 gap-2'>
            <p className='font-bold text-lg'>{Item.name}</p>
            <p>Price:&nbsp;${Item.price}</p>
            <p>Quantity:&nbsp;{Item.quantity}</p>
            <div className='flex flex-row gap-2 items-center'>
              <p className='hover:underline cursor-pointer hover:text-red-600'>Delete</p>
              <p className='hover:underline cursor-pointer hover:text-red-600' hidden={updateClick}
                onClick={() => setUpdateClick(!updateClick)}
              >
                Update
              </p>
              <input type="number" 
                hidden={!updateClick}
                className='w-[60px] border-2 h-[30px] rounded-md border-gray-300 p-1'
                min={1}
                value={CartItem.quantity}
              />
              <p className='hover:underline cursor-pointer hover:text-red-600' hidden={!updateClick}
                onClick={() => setUpdateClick(!updateClick)}
              >Save</p>
            </div>
          </div>
          <div className='mt-5'>
            <p className='font-bold'>Deliver Date</p>
            <div className='flex flex-col'>
              <label 
                className='flex flex-row cursor-pointer' 
                onClick={() => setShippingDay(0)}
              >
                <input type='radio' checked={shippingDay == 0} />
                &nbsp; &nbsp;
                <div>
                  <p>Tuesday, Jan 7</p>
                  <p>Free Shipping</p>
                </div>
              </label>
              <label 
                className='flex flex-row cursor-pointer'
                onClick={() => setShippingDay(1)}
              >
                <input type='radio' checked={shippingDay == 1}/>
                &nbsp; &nbsp;
                <div>
                  <p>Sunday, Jan 4</p>
                  <p>4.99 Shipping</p>
                </div>
              </label>
              <label 
                className='flex flex-row cursor-pointer'
                onClick={() => setShippingDay(2)}
              >
                <input type='radio' checked={shippingDay == 2}/>
                &nbsp; &nbsp;
                <div>
                  <p>Friday, Jan 1</p>
                  <p>9.99 Shipping</p>
                </div>
              </label>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}
