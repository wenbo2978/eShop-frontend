import React, { useContext, useEffect, useState } from 'react'
import { UserContexts } from '../../contexts/UserContexts'
import { utilityGetToken } from '../../utility/sharedFun';
import OrderItems from './OrderItems';

export default function OrderList() {
  const {user} = useContext(UserContexts);
  const [orders, setOrders] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState();
  useEffect(() => {
    const handelGetOrders = async () => {
      try{
        console.log(user.id);
        const token = await utilityGetToken();
        setError(false);
        setLoading(true);
        const res = await fetch(`http://localhost:9191/api/v1/orders/user/order/${user.id}/order`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });
        const data = await res.json();
        console.log(data);
        if(data.message === 'Item Order Success!'){
          setOrders(data.data);
        }else{
          setError(data.message);
        }
        setLoading(false);
      }catch(err){
        setLoading(false);
        setError(err)
      }
    }
    handelGetOrders();
  }, [])

  if(loading)
    return <div className='max-w-4xl mx-auto p-5'>
      <p className='text-3xl font-extrabold'>Loading...</p>
    </div>
  if(error)
    return <div className='max-w-4xl mx-auto p-5'>
      <p className='text-3xl font-extrabold'>{error}</p>
    </div>
  return (
    <div className='w-full p-10 m-3 flex flex-col justify-center items-center mx-auto'>
      {
        orders && orders.length > 0 && orders.map((data, index) => <OrderItems key={index} item={data}/>)
      }
    </div>
  )
}
