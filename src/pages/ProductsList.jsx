import React, { useContext, useEffect, useState } from 'react'
import ProductItem from '../components/Products/ProductItem'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Shared/Button';
import { UserContexts } from '../contexts/UserContexts';

const list = [
  1, 2, 3, 4, 5, 6
];

export default function ProductsList() {
  const [user, setUser] = useState('admin');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {role} = useContext(UserContexts);
  useEffect(() => {
    const handleGetAllProducts = async () => {
      try{
        setLoading(true);
        setError(null);
        console.log('st');
        const res = await fetch("http://localhost:9191/api/v1/products/all");
        const data = await res.json();
        //console.log(res);
        if(data.message != 'success'){
          setError(data.message);
          setLoading(false);
        }else{
          console.log(data.data);
          setProducts(data.data);
          setLoading(false);
        }
        
      }catch(err){
        setLoading(false);
        setError(err);
      }
    }
    handleGetAllProducts();
  }, []);
  const navigate = useNavigate();

  

  const handleUpdate = () => {
    navigate('/update-product');
  }

  if(loading)
    return <div className='max-w-4xl mx-auto p-5'>
      <p className='text-3xl font-extrabold'>Loading...</p>
    </div>

  return (
      
    <div className='max-w-4xl mx-auto p-5 gap-3 flex flex-col '>
      {
        role == 'ROLE_ADMIN' && 
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
        products && products.length > 0 && list.map((data, index) => (
          <div key={index} className='flex md:flex-row flex-col gap-2'>
            
            <div className='flex flex-row gap-1'>
              {
                role == 'ROLE_ADMIN' && <input type='checkbox'/>
              }
              <ProductItem productItem={products[0]}/>
            </div>
            
            {
              role == 'ROLE_ADMIN' && (
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
