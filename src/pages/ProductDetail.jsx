import React, { useState } from 'react'
import Img from '../assets/hero/watch.png'
import Img2 from '../assets/hero/headphone.png'
import Button from '../components/Shared/Button';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    navigate('/place-order');
  }
  return (
    <div className='max-w-6xl mx-auto p-5 gap-3 grid grid-cols-2 md:grid-cols-3'>
      <div className='flex flex-col'>
        <div className='items-center w-full'>
          <img
            src={product.imgList[imgPos]}
            className='h-[320px] w-[320px] sm:h-[300px] sm:w-[300px] object-cover hover:scale-105 duration-300 mx-auto'
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
      <div className='md:col-span-2 flex flex-col justify-between'>
        <p className='font-bold text-[35px]'>{product.name}</p>
        <p className='text-sm text-gray-500'>{product.description}</p>
        <div className='flex flex-row'>
          <p className='text-[15px]'>{product.brand}</p>
          &nbsp;·&nbsp;
          <p className='text-[15px]'>{product.category}</p>
        </div>
        <div className='flex flex-row'>
          <p className='text-[20px] font-semibold my-auto'>Unit Price:&nbsp;</p>
          <p>$</p>
          <p className='text-[30px] font-semibold'>{product.price}</p>
        </div>
        <div>
        <select name="quantity" id="1" className='border-2 w-[120px] p-1 rounded-lg dark:bg-black'>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        </div>
        <div>
          <Button bgColor={'bg-yellow-300 w-[160px]'} text={'Add to cart'}
            textColor={'white'}
          />
        </div>
        <div>
          <Button bgColor={'bg-yellow-500 w-[160px]'} text={'Buy it now'}
            textColor={'white'}
            handler={handlePlaceOrder}
          />
        </div>
      </div>
    </div>
  )
}
