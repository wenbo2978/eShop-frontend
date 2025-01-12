import React, { useEffect, useState } from 'react'
import Button from '../components/Shared/Button';
import { useNavigate, useParams } from 'react-router-dom';
import ImageCard1 from '../components/ImageCard/ImageCard1';

export default function UpdateProduct() {
  const [newCategory, setNewCategory] = useState(false);
  const [product, setProduct] = useState();
  const params = useParams();
  const [error, setError] = useState(null);
  const [errorImg, setErrorImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const [files, setFiles] = useState();

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
    const id = params.id;
    console.log(id);
    //setProduct(product_tmp);
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
    const handleGetProductById = async () => {
      try{
        setError(null);
        setLoading(true);
        const token = await handleGetToken();
        const res = await fetch(`http://localhost:9191/api/v1/products/product/${id}/product`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        if(data.message === 'success'){
          setProduct({...data.data});
        }else{
          setError(data.message);
        }
        console.log(data);
        setLoading(false);
      }catch(err){
        setError(err);
        setLoading(false);
      }
    }

    handleGetProductById();
  }, [])

  const handleCategory = (ev) => {
    if(newCategory){
      setProduct({...product, 'category': ev.target.value});
    }else{
      setProduct({...product, 'category': ev.target.value});
    }
  }

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
    
    try{
      setError(null);
      const token = await handleGetToken();
      const res = await fetch(`http://localhost:9191/api/v1/products/product/${product.id}/update`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });
      console.log(res);
      const data = await res.json();

      if(data.message === 'Update product success!'){
        navigate('/product-list');
      }else{
        setError(data.message);
      }
    }catch(err){
      setError(err);
    }
  
  }

  const handleUploadImage = async () => {
    console.log(files);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    formData.append("productId", product.id);
    const token = await handleGetToken();

    try {
      setErrorImg(null);
      // Make the POST request to the backend
      const res = await fetch("http://localhost:9191/api/v1/images/upload", {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          //"Content-Type": "multipart/form-data",
        },
        body: formData
      });
      console.log(res);
      const data = await res.json();
      if(data.message != 'Upload success!'){
        setErrorImg(data.message);
      }
      // Handle success response
      console.log(data);
    } catch (error) {
      setErrorImg(error);
      // Handle error response
      //setMessage(error.response?.data?.message || "Upload failed!");
    }
  }

  const handleImage = (ev) => {
    setFiles(ev.target.files);
  }

  if(product == null)
    return <div className='max-w-4xl mx-auto p-5'>
      <p className='text-3xl font-extrabold'>Loading...</p>
    </div>

  if(loading)
    return <div className='max-w-4xl mx-auto p-5'>
      <p className='text-3xl font-extrabold'>Loading...</p>
    </div>

  return (
    
    <div className='p-2 flex flex-col gap-2'>
      <h1 className='font-extrabold text-[30px] text-slate-600 dark:text-slate-200 text-center'>Update Product</h1>
      <div className='mx-10 my-5 px-10 flex flex-col md:grid md:grid-cols-2 gap-3'>
        <form onSubmit={(ev) => handleSubmit(ev)} className='flex flex-col gap-3'>
        
          <div className=''>
            <div className='border-2 rounded-2xl p-3 flex flex-col gap-4 md:m-6'>
              <div className='flex flex-col text-[19px] gap-1'>
                <p>Name:</p>
                <input 
                  value={product.name}
                  onChange={ev => setProduct(
                    (prevProduct => ({
                      ...prevProduct,
                      'name': ev.target.value
                    }))
                  )}
                  className='p-1 rounded-md border' type='text' placeholder='For example: iWatch'/>
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
                      placeholder='For example: iWatch'
                      onChange={ev => handleCategory(ev)}  
                    />
                
                  ) : (
                    <select 
                      name="category" 
                      id="1" 
                      className='border p-1 rounded-lg dark:bg-black'
                      value={product.category.name}
                      onClick={(ev) => handleCategory(ev)}
                    >
                      {
                        category && category.length > 0 && category.map((data, index) => (
                          <option key={index}>{data.name}</option>
          
                        ))
                      }
                    </select>
                  )
                }
              </div>
              <div className='flex flex-col text-[19px] gap-1'>
                <p>Price:</p>
                <input 
                  value={product.price}
                  className='p-1 rounded-md border' 
                  type='number' 
                  placeholder='For example: 30' 
                  min={1} 
                  onChange={ev => setProduct(
                    (prevProduct => ({
                      ...prevProduct,
                      'price': ev.target.value
                    }))
                  )}
                />
              </div>
              <div className='flex flex-col text-[19px] gap-1'>
                <p>Inventory:</p>
                <input 
                  className='p-1 rounded-md border' 
                  type='number' 
                  placeholder='For example: 30' 
                  onChange={ev => setProduct(
                    (prevProduct => ({
                      ...prevProduct,
                      'inventory': ev.target.value
                    }))
                  )}
                  value={product.inventory}
                  min={1} 
                />
              </div>
              <div className='flex flex-col text-[19px] gap-1'>
                <p>Brand:</p>
                <input 
                  className='p-1 rounded-md border' 
                  type='text' 
                  placeholder='For example: Apple'
                  onChange={ev => setProduct(
                    (prevProduct => ({
                      ...prevProduct,
                      'brand': ev.target.value
                    }))
                  )}
                  value={product.brand}
                />
              </div>
              <div className='flex flex-col text-[19px] gap-1'>
                <p>Description:</p>
                <textarea 
                  className='p-1 rounded-md border' 
                  type='text' 
                  placeholder='For example: Apple'
                  onChange={ev => setProduct(
                    (prevProduct => ({
                      ...prevProduct,
                      'description': ev.target.value
                    }))
                  )}
                  value={product.description}
                />
              </div>
            </div>
            
          </div>

          <Button text={"Create Product"} bgColor={'bg-red-400'} textColor={'text-white'}/>
          {
            error && <div className='max-w-4xl mx-auto p-5'>
                      <p className='text-3xl font-extrabold text-red-700'>{error}</p>
                    </div>
          }
        </form>
        <div className='md:m-6 flex flex-col gap-4'>
          <div className='felx flex-col  p-3'>
            {
              product && product.images && product.images.length > 0 
                && product.images.map((data, index) => (<ImageCard1 key={index} imageItem={data}/>)
              )
            }
          </div>
          <label className='h-32 cursor-pointer flex items-center gap-1 justify-center border-2 bg-transparent rounded-2xl p-2 text-2xl text-gray-600'>
            <input 
              type='file' 
              multiple className='hidden'
              onChange={ev => handleImage(ev)}
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
            </svg>
            Upload
          </label>
          <Button bgColor={'bg-blue-600'} textColor={'text-white'} text={'Upload Image'} handler={handleUploadImage}/>
          
        </div>
      </div>
    </div>
  )
}
