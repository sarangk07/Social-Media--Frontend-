'use client';

import React from 'react'
import './navStyle.css'

function Navbar() {
  return (
    <div className='main'>
      <div className='leftDiv'>
        <li>Home</li>
        <li>Messages</li>
        <li>Notifications</li>
      </div>
        
    <div className='searchDiv'>
      <li>Search</li>
    </div>
        <div className='rightDiv'>
            
            <li>Profile</li>
        </div>
        
      
    </div>
  )
}

export default Navbar
