import React, { useContext } from 'react'
import { UserContexts } from '../../contexts/UserContexts';
import { useNavigate } from 'react-router-dom';

export default function UserInfo() {
  const {user, setUser} = useContext(UserContexts);
  const navigate = useNavigate();
  console.log(user);
  
  const handleLogout = () => {
    document.cookie = "authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    document.cookie = "userId=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    setUser(null);
    navigate('/');
  }
  
  return (
    <div className='mx-auto p-3 m-2 flex flex-col justify-center items-center gap-2 w-[500px]'>
      <label className='flex flex-col item-center justify-center  text-slate-700 dark:text-slate-400'>
        <span className='font-semibold text-xl p-2'>First Name :</span>
        <input 
          className='border p-2 rounded-md w-[350px] md:w-[450px]'
          value={user.firstName}/>
      </label>
      <label className='flex flex-col item-center justify-center  text-slate-700 dark:text-slate-400'>
        <span className='font-semibold text-xl p-2'>Last Name :</span>
        <input 
          className='border p-2 rounded-md w-[350px] md:w-[450px]'
          value={user.lastName}/>
      </label>
      <button className='bg-slate-700 w-[350px] md:w-[450px] p-2 mt-3 rounded-md text-white text-xl font-semibold dark:bg-slate-300 dark:text-slate-900 hover:scale-105'>Update</button>
      <button 
        className='bg-slate-700 w-[350px] md:w-[450px] p-2 mt-3 rounded-md text-white text-xl font-semibold dark:bg-slate-300 dark:text-slate-900 hover:scale-105'
        onClick={() => handleLogout()}
      >LogOut</button>
    </div>
  )
}
