import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:5000/api";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '', address: '', over21: false });
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token) {
      axios.get(`${API_URL}/user`, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => setUser(res.data))
        .catch(() => localStorage.removeItem("token"));
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!isLogin && formData.password !== formData.confirmPassword) return setMessage("Passwords do not match");
      if (!isLogin && !formData.over21) return setMessage("You must confirm that you are over 21 years of age");
      
      const endpoint = isLogin ? '/login' : '/signup';
      const { data } = await axios.post(`${API_URL}${endpoint}`, formData);
      if (isLogin) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
      } else {
        setMessage("Signup successful. Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || `${isLogin ? 'Login' : 'Signup'} failed`);
    } finally {
      setIsLoading(false);
    }
  };

  if (token && user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center">Welcome back, {user.username}</h1>
          <button onClick={() => { localStorage.removeItem("token"); setToken(""); setUser(null); }} className="w-full px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600">Logout</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center">{isLogin ? 'Login' : 'Sign Up'}</h1>
        {message && <p className={`p-3 text-center rounded-md ${message.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="username" type="text" placeholder="Username" value={formData.username} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
          {!isLogin && <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />}
          <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
          {!isLogin && <input name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />}
          {!isLogin && <input name="address" type="text" placeholder="Address" value={formData.address} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />}
          {!isLogin && (
            <label className="flex items-center space-x-2">
              <input name="over21" type="checkbox" checked={formData.over21} onChange={handleChange} required className="w-4 h-4" />
              <span>I confirm that I am over 21</span>
            </label>
          )}
          <button type="submit" disabled={isLoading} className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:opacity-50">
            {isLoading ? 'Please wait...' : isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
        <p className="text-center">{isLogin ? "Don't have an account?" : "Already have an account?"} 
          <button onClick={() => { setIsLogin(!isLogin); setMessage(""); }} className="text-blue-500 hover:underline"> {isLogin ? 'Sign up' : 'Log in'}</button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;