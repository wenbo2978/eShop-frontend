import React, { useEffect, useState } from 'react'
import LightButton from '../../assets/website/light-mode-button.png'
import DarkButton from '../../assets/website/dark-mode-button.png'

export default function DarkMode() {
  const [theme, setTheme] = useState("light");
  const switchTheme = () => {
    if(theme == "dark"){
      setTheme("light");
    }else{
      setTheme("dark");
    }
  }
  const element = document.documentElement;
  useEffect(() => {
    if(theme == "dark"){
      element.classList.add("dark");
      element.classList.remove("light");
    }else{
      element.classList.add("light");
      element.classList.remove("dark");
    }
  },[theme]);
  return (
    <div className='relative'>
      <img src={LightButton} alt=''
        className={`w-12 cursor-pointer absolute 
          ${theme == "dark" ? "opacity-0" : "opacity-100"} transition-all duration-300`}
        onClick={switchTheme}
      />
      <img src={DarkButton} alt=''
        className={`w-12 cursor-pointer 
          ${theme == "dark" ? "opacity-100" : "opacity-0"} transition-all duration-300`}
        onClick={switchTheme}
      />
    </div>
  )
}
