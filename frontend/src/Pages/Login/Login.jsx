import React, { useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import PasswordInput from '../../Components/Input/PasswordInput'
import { validateEmail } from '../../Utils/Helper'
import axiosInstance from '../../Utils/axiosInstance'

const Login = () => {
  
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [error, setError]=useState(null);

    const navigate=useNavigate()

    const handleLogin= async(e)=>{
        e.preventDefault();
        if(!validateEmail(email)){
            setError("Please enter a valid email address");
            return;
        }

        if(!password){
            setError("Please enter a password");
            return;
        }
        setError("")
        //login API Call

        try {
            const response=await axiosInstance.post("/login",{
                email:email,
                password:password,
            });

            if(response.data && response.data.accessToken){
                localStorage.setItem("token", response.data.accessToken)
                navigate('/dashboard')
            }
        }

        catch(error){
            // Handle login error
            if(error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message);
            }
            else{
                setError("An unexpected error occured. Please try again.");
            }
        }

         
    };
  return (
    <div>
        <Navbar/>

        <div className='flex items-center justify-center mt-28'>
            <div className='w-96 border rounded bg-white px-7 py-10'>
                <form onSubmit={()=>{}}>
                    <h4 className='text-2xl mb-7'>Login</h4>
                    <input type='text'
                     placeholder='Email' 
                     className='input-box'
                     value={email}
                     onChange={(e)=>{setEmail(e.target.value)}}

                     />

                    <PasswordInput
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                    />
                     {
                        error && <p className='text-red-500 text-xs pb-1'>{error}</p>
                     }
                    <button type='submit' className='btn-primary' onClick={handleLogin}>Login</button>
                    <p className='text-sm text-center mt-4'>Not registered?{""}
                    <Link to="/signup" className='font-medium text-primary underline ml-2'>
                    Create an account
                    </Link>
                    </p>

                </form>
            </div>
        </div>
    </div>
  )
}

export default Login