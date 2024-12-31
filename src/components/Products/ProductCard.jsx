import React from 'react'
import Button from '../Shared/Button'

export default function ProductCard({data}) {
  return (
    <div className='mb-10'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 place-items-center'>
        {/**card section */}
        {
          data.map((da, index) => (
            <div key={index} className='group'>
              <div className='relative'>
                <img src={da.img} alt=''
                  className='h-[180px] w-[260px] object-cover rounded-md'
                />
                {/**hover button */}
                <div className='hidden group-hover:flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full text-center h-full group-hover:backdrop-blue-sm justify-center items-center duration-200'>
                  <Button 
                    text={"Add to cart"}
                    bgColor={"bg-primary"}
                    textColor={"text-white"}
                  />
                </div>
              </div>
              <div className='leading-7'>
                <h2 className='font-semibold'>{da.title}</h2>
                <h2 className='font-bold'>${da.price}</h2>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
