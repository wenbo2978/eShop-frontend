import React, { useState } from 'react'
import Img from '../assets/hero/watch.png'
import Img2 from '../assets/hero/headphone.png'

const product = {
  name: "watch",
  description: "Ailun 3 Pack Screen Protector for iPhone 16 Pro Max [6.9 inch] with Installation Frame, Tempered Glass, Sensor Protection, Dynamic Island Compatible, Case Friendly",
  brand: "Apple",
  category: "electronic",
  price: "30.0",
  imgList: [
    Img, Img2
  ]
}


export default function ProductDetail() {
  const [imgPos, setImgPos] = useState(0);
  return (
    <div className='max-w-6xl mx-auto p-5 gap-3 grid grid-cols-2'>
      <div className='flex flex-col'>
        <div>
          <img
            src={product.imgList[imgPos]}
            className='h-[320px] sm:h-[300px] w-full object-cover hover:scale-105 duration-300'
            alt='img'
          />
        </div>
        <div className='flex flex-row gap-2'>
          {
            product.imgList.map((data, index) => (
              <img
                src={data}
                key={index}
                className='h-[50px] w-[50px] cursor-pointer border-2 rounded-md'
                onClick={() => setImgPos(index)}
              />
            ))
          }
        </div>
      </div>
      <div>
        description
      </div>
    </div>
  )
}
