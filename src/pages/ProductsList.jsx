import React, { useState } from 'react'
import ProductItem from '../components/Products/ProductItem'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Shared/Button';

const list = [
  1, 2, 3, 4, 5, 6
]

export default function ProductsList() {
  const [user, setUser] = useState('admin');
  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate('/update-product');
  }

  return (
      
    <div className='max-w-4xl mx-auto p-5 gap-3 flex flex-col '>
      {
        user == 'admin' && 
        <div className='flex flex-row gap-2'>
          
          <Link className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full' to={'/add-product'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
              Add New Product
          </Link>
          <button className='bg-primary text-white py-2 px-6 rounded-full'>Multiple Delete</button>
          
          
        </div>
      }
      {
        list.map((data, index) => (
          <div key={index} className='flex md:flex-row flex-col gap-2'>
            
            <div className='flex flex-row gap-1'>
              {
                user == 'admin' && <input type='checkbox'/>
              }
              <ProductItem/>
            </div>
            
            {
              user == 'admin' && (
                <div className='flex flex-row md:flex-col justify-around'>
                  <Button 
                    text={"Delete"} 
                    textColor={'text-white'} 
                    bgColor={'bg-red-600'}
                  />
                  <Button 
                    text={"Update"} 
                    textColor={'text-white'} 
                    bgColor={'bg-green-600'}
                    handler={handleUpdate}
                  />
                  <Button 
                    text={"Replenish"} 
                    textColor={'text-white'} 
                    bgColor={'bg-blue-600'}
                  />
                </div>
              )
            }
          </div>
        ))
      }
    </div>
    
  )
}
