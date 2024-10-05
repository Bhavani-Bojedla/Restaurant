import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { HiOutlineMail } from 'react-icons/hi';
import { FaLock } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';

export default function Signin() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      toast.error('Please fill in all details');
      return;
    }
    setLoading(true);
    const formData = { username, password };

    try {
      const response = await axios.post('https://test-api.achilyon.in/v1/rest-auth/login', formData);
      if (response.status === 200) {
        const { access_token } = response.data.data;
        localStorage.setItem('token', access_token);
        dispatch(authActions.login());
        toast.success('Signin successful');
        navigate('/orders');
      }
    } catch (error) {
      toast.error('Signin failed');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-900 h-120 padding-0">
      <ToastContainer />
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg bg-slate-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-3xl font-bold text-center">Sign in</h1>

          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 rounded-lg outline-red-200"
            />
            <HiOutlineMail className="absolute text-gray-400 right-2" />
          </div>

          <div className="relative flex items-center">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded-lg outline-red-200"
            />
            <FaLock className="absolute text-gray-400 right-2" />
          </div>

          <button
            type="submit"
            
            disabled={loading}
            className="w-full py-2 font-bold text-white bg-red-500 rounded-lg hover:bg-red-600"
          >
            {loading ? 'Loading...' : 'Sign in'}
          </button>

          <div className="text-center">
            <p className="text-sm text-black">
              Don't have an account?{' '}
              <Link to="/signup" className="text-red-500 hover:text-red-600">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
