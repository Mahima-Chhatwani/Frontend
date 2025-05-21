// import { useContext, useEffect, useState } from "react"
import React ,{createContext, useContext,  useEffect, useState} from "react"
import axios from 'axios'


export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const[user, setUser] = useState(null);
    const[isAuthenticated, setIsAuthenticated] = useState(false);
    const[loading, setLoading] = useState(true)


useEffect( () => {
    const checkLoggedIn = async () => {
        try{
        const token = localStorage.getItem('token')
        if(token){
            axios.defaults.headers.common['x-auth-token'] = token
            const res = await axios.get('http://localhost:6001/api/auth');
            setUser(res.data);
            setIsAuthenticated(true);
        }
        }catch(err){
            console.error(err.response.data);
            return {error: err.response.data.message || 'Registration Failed'};
        }
        setLoading(false);
    };

    checkLoggedIn();
}, []);

// Register User

const register = async (formData) =>{
try{
const res = await axios.post('http://localhost:6001/api/users', formData);
localStorage.setItem('token' ,res.data.token);
axios.defaults.headers.common['x-auth-token'] = res.data.token;

// Get user data
const userRes = await axios.get('http://localhost:6001/api/auth');
setUser(userRes.data)
setIsAuthenticated(true)
return true;
}catch(err){
console.error(err);
localStorage.removeItem('token')
};
};


// Login user
const login = async (userData)=>{
    try{
        // To check what we are sending in req
      console.log("Sending Auth request with data:", userData);
      const response = await axios.post('http://localhost:6001/api/auth', userData);
    }catch(error){
      console.error("server error",  error.response? error.response.data :error);
    //   Handle Error
    };
};

// Logout USER
const logout =  ()=>{
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['x-auth-token'];
    setUser(null);
    setIsAuthenticated(false);
};

// Update Profile
const updateProfile = async (formData) =>{
    try{
     const token = localStorage.getItem('token');
     const config = {
        headers:{
            'content-type' : 'application/json',
            'x-auth-token' : token
        },
     };

     const res = await axios.put('http://localhost:6001/api/users/profile', formData, config);
     setUser(res.data)
     return true;
    }
    catch(err){
     console.error(err.response?.data || err.message);
     return{error: err.response?.data?.msg || 'Profile not updated'}
    }
};


return(
    <AuthContext.Provider
    value={{
        user,
        isAuthenticated,
        loading,
        register,
        login,
        logout,
        updateProfile
        }}
    >
        
      {children}  

    </AuthContext.Provider>
)};