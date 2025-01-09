import React, { useState } from 'react'
import UserInfo from '../components/UserInfo/UserInfo';

export default function Profile() {
  const [section, setSection] = useState(0);
  return (
    <div className='max-w-3xl mx-auto p-5 flex flex-col'>
      <div className='flex flex-row gap-3 justify-center items-center'>
        <div 
          className='font-semibold text-slate-600 text-2xl dark:text-slate-300 hover:underline cursor-pointer'
          onClick={ev => setSection(0)}
        >
          User Info
        </div>
        <div className='font-semibold text-slate-600 text-2xl dark:text-slate-300'>
          |
        </div>
        <div 
          className='font-semibold text-slate-600 text-2xl dark:text-slate-300 hover:underline cursor-pointer'
          onClick={ev => setSection(1)}
        >
          Order
        </div>
      </div>
      {
        section == 0 && <UserInfo/>
      }
      {
        section == 1 && 'Order'
      }
    </div>
  )
}
