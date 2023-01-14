import React, { useState } from 'react'
import {BiMenu} from 'react-icons/bi'
import {MdOutlineClose} from 'react-icons/md'

const Mobile_nav_toggle = ({nav_text_color, nav_state, set_nav_state}) => {

    const nav_fn = () => set_nav_state(!nav_state)
    
  return (
    <div onClick={nav_fn} className='block sm:hidden z-10'>
                {nav_state 
                    ? <MdOutlineClose size={30}/> 
                    : <BiMenu size={30} style={{color: `${nav_text_color}`}}/>
                }
    </div>
  )
}

export default Mobile_nav_toggle