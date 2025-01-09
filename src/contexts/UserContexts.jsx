import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react'

export const UserContexts = createContext();

const UserContextProvider = ({children}) => {
  const [user, setUser] = useState();
  const [role, setRole] = useState();
  //const [token, setToken] = useState();
  
  //const [ready, setReady] = useState(false);
  useEffect(()=>{
    console.log('context');
    const handleGetToken = () => {
      const value = `; ${document.cookie}`;
      //console.log(value);
      const parts = value.split('; authToken=');
      //console.log(parts);
      if (parts.length === 2) {
          return parts.pop().split(';').shift();
          //console.log(token);
      }
    }

    const handleGetToken2 = () => {
      const value = `; ${document.cookie}`;
      //console.log(value);
      const parts = value.split('; userId=');
      //console.log(parts);
      if (parts.length === 2) {
          return parts.pop().split(';').shift();
          //console.log(token);
      }
    }

    

    const token = handleGetToken();
    const userId = handleGetToken2();

    const handleGetUserInfo = async () => {
      if(token && userId){
        try{
          const res = await fetch(`http://localhost:9191/api/v1/users/${userId}/user`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
          });
          const data = await res.json();
          console.log(data);
          if(data.message === 'Success')
            setUser(data.data);
          const decoded = jwtDecode(token);
          setRole(decoded.roles[0]);
        }catch(err){
          console.log('error');
        }
      }
    }
    handleGetUserInfo();

  }, []);
  return (
    <UserContexts.Provider value={{user, setUser, role, setRole}}>
      {
        children
      }
    </UserContexts.Provider>
  )
}

export default UserContextProvider