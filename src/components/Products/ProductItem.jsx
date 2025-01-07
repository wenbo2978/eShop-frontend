import React from 'react'
import Img from '../../assets/hero/watch.png'
import Button from '../Shared/Button'
import { Link} from 'react-router-dom'

const product = {
  name: "watch",
  description: "Ailun 3 Pack Screen Protector for iPhone 16 Pro Max [6.9 inch] with Installation Frame, Tempered Glass, Sensor Protection, Dynamic Island Compatible, Case Friendly",
  brand: "Apple",
  category: "electronic",
  price: "30.0"
}

export default function ProductItem({productItem}) {
  //console.log(productItem.category);
  return (
    <Link to={`/product-detail/${productItem.id}`} className='grid grid-cols-3 gap-3 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow rounded-lg'>
      <div className='overflow-hidden bg-gray-50 rounded-lg'>
        <img 
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 duration-300'
          src={Img}
          alt='img'
        />
      </div>
      <div className='col-span-2 flex flex-col justify-between py-2'>
        <p className='font-bold text-lg'>{productItem.name}</p>
        <p className='line-clamp-2 text-sm text-gray-500'>{productItem.description}</p>
        <div className='flex flex-row'>
          <p className='text-[15px]'>{productItem.brand}</p>
          &nbsp;·&nbsp;
          <p className='text-[15px]'>{productItem.category.name}</p>
        </div>
        <div className='flex flex-row'>
          <p>$</p>
          <p className='text-[30px] font-semibold'>{productItem.price}</p>
        </div>
        <div>
          <Button bgColor={'bg-yellow-500'} text={'add to cart'}
            textColor={'white'}
          />
        </div>
      </div>
    </Link>
  )
}
