import React, { useContext, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { UserContexts } from '../contexts/UserContexts';
import { jwtDecode } from 'jwt-decode';

const SignIn = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const {setUser, setRole} = useContext(UserContexts);
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      setEmail(null);
      //add proxy in vite.config.js
      const res = await fetch('http://localhost:9191/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "email": email,
          "password": password
        })
      });
      const data = await res.json();
      console.log(data);
      if(data.message != 'success'){
        /*setLoading(false);
        setError(data.message);*/
        //dispatch(signInFailure(data.message));
        setError(data.message);
        return;
      }else{
        console.log(data.data);
        document.cookie = `authToken=${data.data.token}; Path=/; Secure; SameSite=Strict;`;
        document.cookie = `userId=${data.data.id}; Path=/; Secure; SameSite=Strict;`;
        const res2 = await fetch(`http://localhost:9191/api/v1/users/${data.data.id}/user`, {
          method: 'GET',
          headers: {
              Authorization: `Bearer ${data.data.token}`,
              'Content-Type': 'application/json',
          },
        });
        const data2 = await res2.json();
        console.log(data2);
        if(data2.message === 'Success')
          setUser(data2.data);

        const decoded = jwtDecode(data.data.token);
        console.log(decoded.roles[0]);
        setRole(decoded.roles[0]);
        // Example decoded payload: { id: "12345", email: "user@example.com", roles: ["admin"], exp: 1672617600 }

        navigate('/');
      }
      
    }catch(err){
      setError(err);
    }
    
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>
        Sign In
      </h1>
      <form onSubmit={ev => handleSubmit(ev)} className='flex flex-col gap-4'>
        <input 
          type='email' 
          placeholder='email' 
          className='border p-3 rounded-lg' 
          id='email' 
          onChange={ev => setEmail(ev.target.value)}
          value={email}
        />
        <input 
          type='password' 
          placeholder='password' 
          className='border p-3 rounded-lg' 
          id='password' 
          onChange={ev => setPassword(ev.target.value)}
          value={password}
        />
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
        error && <p className='text-red-500 mt-5'>{error}</p>
      }
    </div>
  )
}

export default SignIn