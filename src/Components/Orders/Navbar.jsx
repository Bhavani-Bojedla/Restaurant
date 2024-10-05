import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    window.location.href = '/'; 
  };

  return (
    <div position="fixed" className="bg-red-400 ">
      <Typography className="flex items-center justify-between h-12 px-16"> 
        <Typography variant="h6" className="text-white" >
          FOODIE
        </Typography>
        <button className='flex justify-center w-16 py-1.5 text-base font-medium text-white rounded-md cursor-pointer hover:text-white hover:bg-slate-300 hover:bg-opacity-50' onClick={handleLogout}>
          Logout
        </button>
      </Typography>
    </div>
  );
};

export default Navbar;

