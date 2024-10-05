import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { HiOutlineMail } from 'react-icons/hi';
import { FaLock } from 'react-icons/fa';
import { TextField, Button, Typography, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { authActions } from '../../store';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    name: '',
    phone_number: '',
    role: ''
  });
  
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!formData.username || !formData.password || !formData.email || !formData.name || !formData.phone_number || !formData.role) {
  //     toast.error('Please fill in all details');
  //     return;
  //   }

  //   try {
  //     const response = await axios.post('https://test-api.achilyon.in/v1/rest-auth/register', formData);
  //     if (response.status === 200) {
  //       const { access_token } = response.data.data; 
  //       localStorage.setItem("token", access_token); 
  //       dispatch(authActions.login());
  //       navigate("/orders");
  //       toast.success('Signup successful');
  //     }
  //   } catch (error) {
  //     alert(JSON.stringify(error.response.data));
  //     if (error.response && error.response.status === 400) {
  //       console.log('Bad Request:', error.response.data); 
  //     }
  //     toast.error(error.response.data);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password || !formData.email || !formData.name || !formData.phone_number || !formData.role) {
      toast.error('Please fill in all details');
      return;
    }

    try {
      const response = await axios.post('https://test-api.achilyon.in/v1/rest-auth/register', formData);
       // Log the response

      if (response.status === 200) {
        console.log(response.data);
        toast.success('Signup successful');
        const { access_token } = response.data.data; 
        localStorage.setItem("token", access_token); 
        dispatch(authActions.login());
        navigate("/orders");
       
      }
    } catch (error) {
      console.error(error); // Log the error
      const errorMessage = error.response?.data || "An error occurred"; // Adjust error message handling
      toast.error(typeof errorMessage === "string" ? errorMessage : JSON.stringify(errorMessage));
    }
};


  return (
    <div className="flex items-center justify-center bg-gray-900 h-120">
      <ToastContainer />
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg bg-slate-200">
        <form onSubmit={handleSubmit} className="space-y-2">
          <Typography variant="h6" className="font-bold text-center">Sign Up</Typography>

          <TextField
            label="Username"
            fullWidth
            variant="outlined"
            value={formData.username}
            onChange={e => setFormData({ ...formData, username: e.target.value })}
            InputProps={{
              startAdornment: <HiOutlineMail className="absolute text-gray-400 right-2" />,
            }}
          />
          <TextField
            label="Password"
            type='password' 
            fullWidth
            variant="outlined"
            value={formData.password}
            onChange={e => setFormData({ ...formData, password: e.target.value })}
            InputProps={{
              startAdornment: <FaLock className="absolute text-gray-400 right-2" />,
            }}
          />
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
          <TextField
            label="Name"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            label="Phone Number"
            fullWidth
            variant="outlined"
            value={formData.phone_number}
            onChange={e => setFormData({ ...formData, phone_number: e.target.value })}
          />

          {/* Role selection */}
          <FormControl fullWidth>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role-select"
              value={formData.role}
              label="Role"
              onChange={e => setFormData({ ...formData, role: e.target.value })}
            >
              <MenuItem value="CUSTOMER">Customer</MenuItem>
              <MenuItem value="RESTAURANT">Restaurant</MenuItem>
            </Select>
          </FormControl>

          <button
            type="submit"
            variant="contained"
            className="w-full py-2 font-bold text-white bg-red-500 rounded-lg hover:bg-red-600"
          >
            Sign Up
          </button>

          <div className="text-center">
            <p className="text-sm text-black">
              Already have an account?{' '}
              <Link to="/" className="text-red-500 hover:text-red-600">
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
