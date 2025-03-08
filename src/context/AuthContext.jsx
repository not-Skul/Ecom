import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in
    const checkUserLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await fetch('http://localhost:5000/api/user', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            localStorage.removeItem('token');
            setUser(null);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error('Auth check error:', error);
        localStorage.removeItem('token');
        setUser(null);
        setLoading(false);
      }
    };
    
    checkUserLoggedIn();
  }, []);
  
  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        
        // Fetch user data
        const userResponse = await fetch('http://localhost:5000/api/user', {
          headers: {
            'Authorization': `Bearer ${data.token}`
          }
        });
        
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData);
          return { success: true };
        }
      }
      
      return { success: false, message: data.error };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'An error occurred during login' };
    }
  };
  
  const signup = async (username, password, address = '') => {
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, address })
      });
      
      const data = await response.json();
      
      return {
        success: response.ok,
        message: response.ok ? 'Signup successful' : data.error
      };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, message: 'An error occurred during signup' };
    }
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    // Instead of using navigate, return a success value
    // The component using this function can handle navigation
    return { success: true };
  };
  
  // Add the updateUserAddress function
  const updateUserAddress = async (newAddress) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Not authenticated');
      }
      
      const response = await fetch('http://localhost:5000/api/user/address', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ address: newAddress.trim() })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update address');
      }
      
      const data = await response.json();
      
      // Update the user state with the new address
      setUser(prevUser=>({
        ...prevUser,
        address:data.user.address
      }));
      
      return { success: true, message: "Address updated successfully" };
    } catch (error) {
      console.error('Update address error:', error);
      return { 
        success: false, 
        message: error.message || 'An error occurred while updating address'
      };
    }
  };
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      logout, 
      loading,
      updateUserAddress 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;