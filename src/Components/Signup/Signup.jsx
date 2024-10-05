// import React, { useState } from 'react';
// import { TextField, Button, Typography, Box, MenuItem, Select, InputLabel, FormControl, Link } from '@mui/material';
// import { Link as RouterLink, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { authActions } from '../../store';
// import axios from 'axios';

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     email: '',
//     name: '',
//     phone_number: '',
//     role: ''
//   });
//   const dispatch = useDispatch();
//   const navigate = useNavigate(); 

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.username || !formData.password || !formData.email || !formData.name || !formData.phone_number || !formData.role) {
//       alert("Please fill in all details");
//       return;
//     }

//     try {
//       const response = await axios.post('https://test-api.achilyon.in/v1/rest-auth/register', formData);
//       console.log(response.data);

//       if (response.status === 200) {
//         const { user, access_token } = response.data.data; 
//         localStorage.setItem("id", user._id); 
//         localStorage.setItem("token", access_token); 

//         dispatch(authActions.login());
//         navigate("/orders");
//       }
//     } catch (error) {
//       console.error(error);
//       alert(JSON.stringify(error.response.data));
//       if (error.response && error.response.status === 400) {
//         console.log('Bad Request:', error.response.data); 
//       }
//     }
//   };

//   return (
//     <Box
//       sx={{
//         maxWidth: '400px',
//         margin: 'auto',
//         padding: '20px',
//         display: 'flex',
//         flexDirection: 'column',
//         gap: 2
//       }}
//     >
//       <Typography variant="h5" align="center" gutterBottom>
//         Sign Up
//       </Typography>
//       <TextField
//         label="Username"
//         fullWidth
//         variant="outlined"
//         value={formData.username}
//         onChange={e => setFormData({ ...formData, username: e.target.value })}
//       />
//       <TextField
//         label="Password"
//         type="password"
//         fullWidth
//         variant="outlined"
//         value={formData.password}
//         onChange={e => setFormData({ ...formData, password: e.target.value })}
//       />
//       <TextField
//         label="Email"
//         fullWidth
//         variant="outlined"
//         value={formData.email}
//         onChange={e => setFormData({ ...formData, email: e.target.value })}
//       />
//       <TextField
//         label="Name"
//         fullWidth
//         variant="outlined"
//         value={formData.name}
//         onChange={e => setFormData({ ...formData, name: e.target.value })}
//       />
//       <TextField
//         label="Phone Number"
//         fullWidth
//         variant="outlined"
//         value={formData.phone_number}
//         onChange={e => setFormData({ ...formData, phone_number: e.target.value })}
//       />

//       {/* Role selection */}
//       <FormControl fullWidth>
//         <InputLabel id="role-label">Role</InputLabel>
//         <Select
//           labelId="role-label"
//           id="role-select"
//           value={formData.role}
//           label="Role"
//           onChange={e => setFormData({ ...formData, role: e.target.value })}
//         >
//           <MenuItem value="CUSTOMER">Customer</MenuItem>
//           <MenuItem value="RESTAURANT">Restaurant</MenuItem>
//         </Select>
//       </FormControl>

//       <Button variant="contained" color="primary" onClick={handleSubmit}>
//         Sign Up
//       </Button>

//       {/* Link to Sign In */}
//       <Typography align="center">
//         Already have an account?{' '}
//         <Link component={RouterLink} to="/" underline="hover">
//           Sign In
//         </Link>
//       </Typography>
//     </Box>
//   );
// };

// export default Signup;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { HiOutlineMail } from 'react-icons/hi';
import { FaLock } from 'react-icons/fa';
import { TextField, Button, Typography, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password || !formData.email || !formData.name || !formData.phone_number || !formData.role) {
      toast.error('Please fill in all details');
      return;
    }

    try {
      const response = await axios.post('https://test-api.achilyon.in/v1/rest-auth/register', formData);
      if (response.status === 200) {
        const { user, access_token } = response.data.data; 
        localStorage.setItem("id", user._id); 
        localStorage.setItem("token", access_token); 
        navigate("/orders");
        toast.success('Signup successful');
      }
    } catch (error) {
      toast.error('Signup failed');
      console.error(error);
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
            type="password"
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
            // color="primary"
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
