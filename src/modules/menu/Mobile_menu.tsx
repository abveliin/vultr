import React from 'react'
import Navbar_elts from './Navbar_elts'
    
const Mobile_menu = ({navbar_elts, nav_state}) => {
  return (
    <div  className={
        nav_state 
            ? 'sm:hidden absolute inset-0 flex flex-col justify-center items-center w-full h-screen bg-black text-center ease-in duration-300'
            : 'sm:hidden absolute inset-0  left-[-100%] flex flex-col justify-center items-center w-full h-screen bg-black text-center ease-in duration-300'
    }>
    <Navbar_elts items={navbar_elts}  class_name='-mx-4' items_style='text-4xl'/>
</div>
  )
}

export default Mobile_menu