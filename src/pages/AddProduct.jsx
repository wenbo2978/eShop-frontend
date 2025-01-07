import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Shared/Button';

export default function AddProduct() {
  const [newCategory, setNewCategory] = useState(false);
  
  const handleSubmit = (ev) => {
    ev.preventDefault();
    console.log('submit');
  }

  const category = ["Electronic", "Food", "Cloth"];

  return (
    <div>
      <form onSubmit={(ev) => handleSubmit(ev)} className='mx-10 my-5 px-10 flex flex-col gap-3'>
      
        <h1 className='font-extrabold text-[30px] text-slate-600 dark:text-slate-200 text-center'>Add New Product</h1>
        <div className='flex flex-col md:grid md:grid-cols-2 gap-3'>
          <div className='border-2 rounded-2xl p-3 flex flex-col gap-4 md:m-6'>
            <div className='flex flex-col text-[19px] gap-1'>
              <p>Name:</p>
              <input className='p-1 rounded-md border' type='text' placeholder='For example: iWatch'/>
            </div>
            <div className='flex flex-col text-[19px] gap-1'>
              <div>
                <p>Category:</p>
                <label className='text-slate-500 text-[12px] flex flex-row gap-2 items-center'>
                  New Category
                  <input checked={newCategory} onChange={() => setNewCategory(!newCategory)} type='checkbox'/>
                </label>
              </div>
              {
                newCategory ? (
                  <input className='p-1 rounded-md border' type='text' placeholder='For example: iWatch'/>
              
                ) : (
                  <select name="category" id="1" className='border p-1 rounded-lg dark:bg-black'>
                    {
                      category && category.length > 0 && category.map((data, index) => (
                        <option key={index} value={data}>{data}</option>
         
                      ))
                    }
                  </select>
                )
              }
            </div>
            <div className='flex flex-col text-[19px] gap-1'>
              <p>Price:</p>
              <input className='p-1 rounded-md border' type='number' placeholder='For example: 30' min={1} />
            </div>
            <div className='flex flex-col text-[19px] gap-1'>
              <p>Inventory:</p>
              <input className='p-1 rounded-md border' type='number' placeholder='For example: 30' min={1} />
            </div>
            <div className='flex flex-col text-[19px] gap-1'>
              <p>Brand:</p>
              <input className='p-1 rounded-md border' type='text' placeholder='For example: Apple'/>
            </div>
            <div className='flex flex-col text-[19px] gap-1'>
              <p>Description:</p>
              <textarea className='p-1 rounded-md border' type='text' placeholder='For example: Apple'/>
            </div>
          </div>
          <div className='md:m-6'>
            <label className='h-32 cursor-pointer flex items-center gap-1 justify-center border-2 bg-transparent rounded-2xl p-2 text-2xl text-gray-600'>
              <input type='file' multiple className='hidden'/>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
              </svg>
              Upload
            </label>
          </div>
        </div>
 
        <Button text={"Create Product"} bgColor={'bg-red-400'} textColor={'text-white'}/>

      </form>
    </div>
  )
}
