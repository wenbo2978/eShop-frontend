import React, { useEffect, useState } from 'react'
import { utilityGetToken } from '../../utility/sharedFun';

export default function ImageCard1({imageItem}) {
  const [imageSrc, setImageSrc] = useState();
  useEffect(() => {
    const handleGetImage = async () => {
      console.log(imageItem);
      try{
        const token = await utilityGetToken();
        const res = await fetch(`http://localhost:9191/api/v1/images/image/download/${imageItem.id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        console.log(res);
        //const data = await res.json();
        if(res.ok){
          const blob = await res.blob(); // Get the image as a blob
          const url = URL.createObjectURL(blob); // Create an object URL for the image
          setImageSrc(url); // Set the image source
        }else{
          
        }
      }catch(err){

      }
    }

    handleGetImage();
  }, [])
  return (
    <div className='p-1 rounded-md grid grid-cols-3 gap-3 border-2'>
      <img 
        alt='Downloaded' 
        src={imageSrc}
        className='w-[150px] h-[150px] cursor-pointer p-2 rounded-lg bg-white'
      />
      <div className='flex flex-col justify-center items-center'>
        <button 
          className='text-font text-white hover:scale-105 rounded-full bg-green-600 p-2 px-5'
        >Update</button>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <button
          className='text-font text-white hover:scale-105 rounded-full bg-red-600 p-2 px-5'
        >Delete</button>
      </div>
    </div>
  )
}
