import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between  bg-white shadow-md text-black py-2 ' > 
    <div className="logo">
      <span className='font-bold text-xl mx-9 text-indigo-600 cursor-pointer ' > 📝 TodoList </span>
    </div>
      <ul className="flex gap-4 mx-9">
        <li className='cursor-pointer hover:font-bold transition-all' >Home</li>
        <li className='cursor-pointer hover:font-bold transition-all' >Your Tasks</li>
        
      </ul>
    </nav>
  )
}

export default Navbar
