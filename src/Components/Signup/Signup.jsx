import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { HiOutlineMail } from 'react-icons/hi';
import { FaLock } from 'react-icons/fa';
import { TextField, Typography, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
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
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  const validateInput = (name, value) => {
    let error = '';
    if (name === 'email') {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(value)) {
        error = 'Please enter a valid email (e.g., example@example.com)';
      }
    } else if (name === 'phone_number') {
      if (!/^\d+$/.test(value)) {
        error = 'Phone number must contain only digits';
      }
    }
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateInput(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, email, name, phone_number, role } = formData;
    if (!username || !password || !email || !name || !phone_number || !role) {
      toast.error('Please fill in all details');
      return;
    }

    try {
      const response = await axios.post('https://test-api.achilyon.in/v1/rest-auth/register', formData);
      if (response.status === 201) {
        const { access_token } = response.data.data; 
        localStorage.setItem("token", access_token); 
        dispatch(authActions.login());
        navigate("/orders");
        toast.success('Signup successful');
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data || "An error occurred";
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
            name="username"
            fullWidth
            variant="outlined"
            value={formData.username}
            onChange={handleChange}
            InputProps={{
              startAdornment: <HiOutlineMail className="absolute text-gray-400 right-2" />,
            }}
          />
          <TextField
            label="Password"
            name="password"
            type="password" 
            fullWidth
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              startAdornment: <FaLock className="absolute text-gray-400 right-2" />,
            }}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
          <TextField
            label="Name"
            name="name"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            label="Phone Number"
            name="phone_number"
            type="tel"
            fullWidth
            variant="outlined"
            value={formData.phone_number}
            onChange={handleChange}
            error={Boolean(errors.phone_number)}
            helperText={errors.phone_number}
          />

          <FormControl fullWidth>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role-select"
              name="role"
              value={formData.role}
              label="Role"
              onChange={handleChange}
            >
              <MenuItem value="CUSTOMER">Customer</MenuItem>
              <MenuItem value="RESTAURANT">Restaurant</MenuItem>
            </Select>
          </FormControl>

          <button
            type="submit"
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
