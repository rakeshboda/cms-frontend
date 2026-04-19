import React, { useContext, useState } from 'react'
import "./Navbar.css"
import { IoMenu } from "react-icons/io5";
import Sidebar from '../Sidebar/Sidebar';
import AppContext from '../../Context/AppContext';

const Navbar = () => {
  const [showMenu,setShowMenu]=useState(false)
  const {setSearchBy}=useContext(AppContext)
 
  const toggleMenu=()=>{
        if(showMenu){
            setShowMenu(false)
        }else{
            setShowMenu(true)
        }
    }

 


  return (
    <div className='nav-main'>
        <div className='header'>
        <h2>Crime Station</h2>
        <input
          type="text"
          placeholder="Search criminals..."
          className="search"
          onChange={(e)=>{setSearchBy(e.target.value)}}
        />
        <IoMenu className='menu-icon' onClick={toggleMenu}/>  
        </div>
        {showMenu && <Sidebar/>}    
    </div>
  )
}
export default Navbar
