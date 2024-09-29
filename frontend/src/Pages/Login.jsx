import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const [currentState,setCurrentState]=useState('login');
  const [name,setName]=useState('');
  const [password,setPassword]=useState('');
  const [email,setEmail]=useState('');
  const {token,setToken,navigate, backendUrl}=useContext(ShopContext);
  const onSubmitHandler=async(e)=>{
    e.preventDefault();
    try {
      if(currentState === 'Sign Up'){
        const response = await axios.post(backendUrl + '/api/user/register',{name,email,password})
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token);
        }
        else{
          toast.error(response.data.message);
        }
      }
      else{
        const response=await axios.post(backendUrl + '/api/user/login',{email,password});
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token);
        }
        else{
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === 'login' ?'': <input onChange={(e)=> setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border-2 border-gray-800' placeholder='Name' required/>}
      <input onChange={(e)=> setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border-2 border-gray-800' placeholder='Email' required/>
      <input onChange={(e)=> setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border-2 border-gray-800' placeholder='Password' required/>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer font-semibold'>Forgot your password ?</p>
        {
          currentState === 'login' ? <p className='cursor-pointer text-gray-900 font-semibold' onClick={()=> setCurrentState('Sign Up')}>Create Account</p> : <p className='text-gray-900 font-semibold cursor-pointer' onClick={()=> setCurrentState('login')}>Login Here</p>
        }
      </div>
      <button className='bg-black text-white font-semibold px-8 py-2 mt-4 rounded-md'>{currentState === 'login' ? 'Sign In': 'Sign Up'}</button>
    </form>
  )
}

export default Login
