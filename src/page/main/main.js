import './main.css'
import {useNavigate} from "react-router-dom";
import { motion } from "framer-motion"
import {useState,useEffect}from'react'
import { v4 as uuidv4 } from 'uuid';
export default function Popup(){
  let history=useNavigate()
  let [userName,setUserName]=useState('')
  let [id,setId]=useState('')
  let [have,setHave]=useState(null)
//localStorage.removeItem('name')
useEffect(()=>{
  setHave(localStorage.getItem('name')?true:false)
},[])
  let go=()=>{
  history(`/chat/${id}`)  
  }
  
  let log={
   have:{
  opacity:0,
  display:'none',
   },not:{
  opacity:1,
  y:0,
  background:'white',
  height:'300px',
  width:'96%',
  borderRadius:'20px',
  display:'flex'
   }
  }
  let setName=()=>{
    let parse={
      userName,id:uuidv4()
    }
    localStorage.setItem('name',JSON.stringify(parse))
    setHave(true)
  }
  let join=()=>{
     history(`/chat/${uuidv4()}`)
  }
  return (
    <div className='main'>
    <span>enjoy your private chat</span>
    <div>
    <input type='text' placeholder='paste your private id' 
    onChange={(e)=>{setId(e.target.value)}}/>
    <button onClick={go}>Join</button>
    </div>
    <button onClick={join}>New Room</button>
    
    
      <div className='modal'>
    <motion.div
    className='motion'
  initial={'have'}
  animate={!localStorage.getItem('name')?'not':'have'}
  variants={log}
  transition={{
    duration:0.5
  }}>
  <span>enter your name to enjoy <br/> private chat </span>
    <input type='text' placeholder='Name' 
    onChange={(e)=>{setUserName(e.target.value)}}/>
    <button onClick={setName}>Submit</button>
    </motion.div>
    </div>
    
    </div>
    
    
    )
}