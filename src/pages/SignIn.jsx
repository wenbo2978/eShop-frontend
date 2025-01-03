import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

const SignIn = () => {

  const handleChange = (e)=> {
  }

  const handleSubmit = async (e)=>{
    
    
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>
        Sign In
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
        <button disabled={/*loading*/ false} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {
            /*loading ? 'Loading...' : 'Sign In'*/
            'Sign In'
          }
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700'>Sign Up</span>
        </Link>
      </div>
      {
        /*error && <p className='text-red-500 mt-5'>{error}</p>*/
      }
    </div>
  )
}

export default SignIn