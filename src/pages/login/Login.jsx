import React, { useState } from "react";
import "./Login.scss"
import axios from "axios";
import { newRequest} from "../../components/utils/newRequest";
import {useNavigate} from "react-router-dom";

export const Login = () => {
  const[username,setUsername] = useState("");
  const[password,setPassword] = useState("");
  const[error,setError] = useState(null)

  const navigate = useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();

    try{
      // const res = await axios.post("http://localhost:8800/api/auth/login",{
      //   username,
      //   password
      // },{withCredentials:true})
      const res = await newRequest.post("/auth/login",{username,password});
      localStorage.setItem("currentUser",JSON.stringify(res.data));
      navigate("/gigs")
    }catch(err){
      setError(err.response.data);
      console.log(err.response.data)
    }
   
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <div className="parent">
        <label htmlFor="">Username</label>
        <input name="username" type="text" placeholder="johndoe" onChange={e=>setUsername(e.target.value)}/>
        </div>
        <div className="parent">
        <label htmlFor="">Password</label>
        <input name="password" type="password" placeholder="johndoe@gmail.com" onChange={e=>setPassword(e.target.value)}/>
        </div>
        <button type="submit">Login</button>
        <div className="message">
        {error && error}
        </div>
        
      </form>
    </div>
  )
}