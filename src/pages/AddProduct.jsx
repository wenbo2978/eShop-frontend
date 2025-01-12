import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Shared/Button';

export default function AddProduct() {
  const [newCategory, setNewCategory] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const handleGetAllCategory = async () => {
      try{
        setError(null);
        setLoading(true);
        const res = await fetch("http://localhost:9191/api/v1/categories/all");
        const data = await res.json();
        console.log(data);
        if(data.message != 'Found!'){
          setError(data.message);
          setLoading(false);
        }else{
          setCategory(data.data);
          setLoading(false);
        }
      }catch(err){
        setError(err);
        setLoading(false);
      }
    }
    handleGetAllCategory();
  }, []);

  const handleGetToken = async () => {
    const value = `; ${document.cookie}`;
    //console.log(value);
    const parts = value.split('; authToken=');
    //console.log(parts);
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
        //console.log(token);
    }
  }
  
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    console.log(product);
    setError(null);
    const token = await handleGetToken();
    try{
      const res = await fetch('http://localhost:9191/api/v1/products/add', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });
      console.log(res);
      const data = await res.json();

      if(data.message === 'Add product success!'){
        navigate('/product-list');
      }else{
        setError(data.message);
      }
    }catch(err){
      setError(err);
    }
  }

  const handleCategory = (ev) => {
    if(newCategory){
      setProduct({...product, 'category': ev.target.value});
    }else{
      setProduct({...product, 'category': ev.target.value});
    }
  }

  //const category = ["Electronic", "Food", "Cloth"];

  if(loading)
    return <div className='max-w-4xl mx-auto p-5'>
              <p className='text-3xl font-extrabold'>Loading...</p>
            </div>

  return (
    <div>
      <form onSubmit={(ev) => handleSubmit(ev)} className='mx-10 my-5 px-10 flex flex-col gap-3'>
      
        <h1 className='font-extrabold text-[30px] text-slate-600 dark:text-slate-200 text-center'>Add New Product</h1>
        <div className='flex flex-col md:grid md:grid-cols-2 gap-3'>
          <div className='border-2 rounded-2xl p-3 flex flex-col gap-4 md:m-6'>
            <div className='flex flex-col text-[19px] gap-1'>
              <p>Name:</p>
              <input 
                className='p-1 rounded-md border' 
                id='name'
                onChange={ev => setProduct({...product, [ev.target.id]: ev.target.value})}
                value={product.name}
                type='text' placeholder='For example: iWatch'/>
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
                  <input 
                    className='p-1 rounded-md border' 
                    type='text' 
                    onChange={ev => handleCategory(ev)}
                    placeholder='For example: Ele'
                  />
              
                ) : (
                  <select name="category" id="1" onClick={ev => handleCategory(ev)} className='border p-1 rounded-lg dark:bg-black'>
                    {
                      category && category.length > 0 && category.map((data, index) => (
                        <option key={index} value={data.name}>{data.name}</option>
         
                      ))
                    }
                  </select>
                )
              }
            </div>
            <div className='flex flex-col text-[19px] gap-1'>
              <p>Price:</p>
              <input 
                className='p-1 rounded-md border' 
                value={product.price}
                id='price'
                onChange={ev => setProduct({...product, [ev.target.id]: ev.target.value})}
                type='number' 
                placeholder='For example: 30' 
                min={1} 
              />
            </div>
            <div className='flex flex-col text-[19px] gap-1'>
              <p>Inventory:</p>
              <input 
                className='p-1 rounded-md border' 
                value={product.inventory}
                id='inventory'
                onChange={ev => setProduct({...product, [ev.target.id]: ev.target.value})}
                type='number' 
                placeholder='For example: 30' 
                min={1} 
              />
            </div>
            <div className='flex flex-col text-[19px] gap-1'>
              <p>Brand:</p>
              <input 
                className='p-1 rounded-md border' 
                value={product.brand}
                id='brand'
                onChange={ev => setProduct({...product, [ev.target.id]: ev.target.value})}
                type='text' 
                placeholder='For example: Apple'
              />
            </div>
            <div className='flex flex-col text-[19px] gap-1'>
              <p>Description:</p>
              <textarea 
                className='p-1 rounded-md border' 
                value={product.description}
                id='description'
                onChange={ev => setProduct({...product, [ev.target.id]: ev.target.value})}
                type='text' 
                placeholder='For example: Apple'
              />
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
        {
          error && <div className='max-w-4xl mx-auto p-5'>
                    <p className='text-3xl font-extrabold text-red-700'>{error}</p>
                  </div>
        }
      </form>
    </div>
  )
}
