import React from 'react'
import { Link } from 'react-router-dom'
import "./Sidebar.css"

const Sidebar = () => {
  return (     
      <aside className="sidebar">
          <ul>
            <li><Link to="/" className='link'>Home</Link></li>
            <li><Link to="/criminals" className='link'>Criminals</Link></li>
            <li><Link to="/add-criminal" className='link'>Add criminal</Link></li>
          </ul>
        </aside>
  )
}

export default Sidebar
