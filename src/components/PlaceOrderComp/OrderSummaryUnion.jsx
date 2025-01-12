import React, { useContext, useState } from 'react'
import Button from '../Shared/Button'
import { UserContexts } from '../../contexts/UserContexts'
import { useNavigate } from 'react-router-dom';

export default function OrderSummaryUnion() {
  const {user} = useContext(UserContexts);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const handlePlaceOrder = async () => {
    try{
      const res = await fetch(
        `http://localhost:9191/api/v1/orders/order?userId=${user.id}`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        })
      const data = await res.json();
      if(data.message === 'Item Order Success!'){
        navigate('/');
      }else{
        setError(data.message);
        console.log(error);
      }
    }catch(err){
      setError(err);
      console.log(error);
    }
  }
  return (
    <div className='flex flex-col justify-center items-center gap-2 border rounded-md py-6 px-4 shadow-md'>
      <h className='text-[30px] font-bold text-slate-600 dark:text-slate-400'>Order Summary</h>
      <label className='flex flex-row justify-between p-3 w-full px-6'>
        <p>Items total:</p>
        <p>$ 123.3</p>
      </label>
      <label className='flex flex-row justify-between p-3 w-full px-6'>
        <p>Shipping fee:</p>
        <p>$ 12.3</p>
      </label>
      <label className='flex flex-row justify-between p-3 w-full px-6'>
        <p>Tax:</p>
        <p>$ 2.5</p>
      </label>
      <label className='flex flex-row justify-between p-3 w-full px-6 border-t'>
        <p>Total:</p>
        <p>$ 312.6</p>
      </label>
      <Button bgColor={'bg-yellow-400'} textColor={'text-white'} 
        text={'Place Order'}
        handler={handlePlaceOrder}
      />
    </div>
  )
}
