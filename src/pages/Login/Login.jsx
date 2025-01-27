import React, { useContext, useState } from 'react'
import './login.css'
import { AuthContext } from '../../context/authContext/AuthContext'
import { login } from '../../context/authContext/apiCalls'

const Login = () => {

const [email, setEmail] = useState()
const [password, setPassword] = useState()
const {isFetching , dispatch} = useContext(AuthContext);

const handleLogin = (e)=>{
 e.preventDefault()
 login({email,password} , dispatch);
}
  return (
    <div className='Login'>
        <form action="" className='loginForm'>
            <input type="email" placeholder='email' className='loginInput' onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder='password' className='loginInput'  onChange={(e)=>setPassword(e.target.value)}/>
            <button type='submit' className='login-btn' onClick={handleLogin} disabled={isFetching}>Login</button>
        </form>
    </div>
  )
}

export default Login