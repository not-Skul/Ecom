import React, { useState, useEffect,useContext } from 'react';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

const ProfilePage = () => {
    const navigate = useNavigate();
    const {user,logout} = useContext(AuthContext)
    useEffect(() => {
        if (!user) {
          navigate("/login"); // Redirect to login if not authenticated
        }
      }, [user, navigate]);
    
      if (!user) return null;

    return(
        <div>
            <div>
                hello {user.username}
            </div>
            <button onClick={logout}>LogOut</button>
        </div>
    );
};

export default ProfilePage;