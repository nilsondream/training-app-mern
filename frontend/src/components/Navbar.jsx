import React from 'react'
import { NavLink } from 'react-router-dom'
import { FiActivity } from 'react-icons/fi'

const Navbar = () => {
    return (
        <div className='fixed w-full flex items-center px-52 py-10 bg-white shadow'>
            <NavLink to={'/'} className='flex items-center gap-1 text-3xl font-bold hover:text-indigo-600 transition duration-300 ease-in-out'><FiActivity />Actifit</NavLink>
        </div>
    )
}

export default Navbar