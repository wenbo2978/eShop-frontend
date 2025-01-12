import React, { useEffect, useState } from 'react'
import Img from '../assets/hero/watch.png'
import Img2 from '../assets/hero/headphone.png'
import Button from '../components/Shared/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { utilityGetToken } from '../utility/sharedFun';

const product_mock = {
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
  const params = useParams();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imgSrc, setImgSrc] = useState([]);
  const [errorCart, setErrorCart] = useState();
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    const handleGetProduct = async () => {
      try{
        setLoading(true);
        setError(null);
        const productId = params.id;
        //console.log(productId);
        const res = await fetch(`http://localhost:9191/api/v1/products/product/${productId}/product`);
        const data = await res.json();
        console.log(data);
        if(data.success == false){
          setLoading(false);
          setError(data.message);
        }else{
          setLoading(false);
          setProduct(data.data);
        }
      }catch(err){
        setError(err);
        setLoading(false);
      }
    }

    handleGetProduct();
  }, []);

  const handleAddToCart = async () => {
    const token = await utilityGetToken();
    console.log(quantity);
    console.log(product.id);
    try{
      setErrorCart(null);
      const res = await fetch(`http://localhost:9191/api/v1/cartItems/item/add?productId=${product.id}&quantity=${quantity}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      console.log(res);
      const data = await res.json();
      console.log(data);
    }catch(err){
      setErrorCart(err)
    }
  }

  

  const handlePlaceOrder = () => {
    navigate('/place-order');
  }

  if(loading)
    return <div className='max-w-4xl mx-auto p-5'>
      <p className='text-3xl font-extrabold'>Loading...</p>
    </div>
  
  if(error)
    return <div className='max-w-4xl mx-auto p-5'>
      <p className='text-3xl font-extrabold'>{error}</p>
    </div>

  return (
    <div>
      {
        product ?
        <div className='max-w-6xl mx-auto p-5 gap-3 grid grid-cols-2 md:grid-cols-3'>
          <div className='flex flex-col'>
            <div className='items-center w-full'>
              <img
                src={product_mock.imgList[imgPos]}
                className='h-[320px] w-[320px] sm:h-[300px] sm:w-[300px] object-cover hover:scale-105 duration-300 mx-auto'
                alt='img'
              />
            </div>
            <div className='flex flex-row gap-2'>
              {
                product_mock.imgList.map((data, index) => (
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
              <p className='text-[15px]'>{product.category.name}</p>
            </div>
            <div className='flex flex-row'>
              <p className='text-[20px] font-semibold my-auto'>Unit Price:&nbsp;</p>
              <p>$</p>
              <p className='text-[30px] font-semibold'>{product.price}</p>
            </div>
            <div>
            <select 
              name="quantity" id="1" 
              onChange={ev => setQuantity(ev.target.value)}
              className='border-2 w-[120px] p-1 rounded-lg dark:bg-black'>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            </div>
            <div>
              <Button bgColor={'bg-yellow-300 w-[160px]'} text={'Add to cart'}
                textColor={'white'}
                handler={handleAddToCart}
              />
            </div>
            <div>
              <Button bgColor={'bg-yellow-500 w-[160px]'} text={'Buy it now'}
                textColor={'white'}
                handler={handlePlaceOrder}
              />
            </div>
          </div>
        </div> : <p>No Item Found</p>
      }
    </div>
  )
}
