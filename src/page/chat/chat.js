import './chat.css'
import Head from'./head'
import Foot from'./foot'
import Body from'./body'
import {useState,useEffect}from'react'
import { io } from'socket.io-client'
import { useParams} from "react-router-dom";
import { motion } from "framer-motion"

let socket=io('https://pchat000.herokuapp.com/')
export default function Popup(){
  let [msg,setMsg]=useState([])
  let [userObject,setUserObject]=useState({})
  let [online,setOnline]=useState([])
  let [open,setOpen]=useState(false)
  let params=useParams()
  useEffect(()=>{
    window.scroll({
      top: document.body.offsetHeight,
      left: 0, 
      behavior: 'smooth',
    });
  },[msg])
  //join group
  useEffect(()=>{
   let parse=JSON.parse(localStorage.getItem('name'))
   setUserObject(parse)
    socket.emit('join',{
      roomId:params.id,
      userId:parse.id
    })
  },[])
  //get message
  useEffect(()=>{
    socket.on('msg',(res)=>{
      setMsg((n)=>[...n,res])
    })
  },[])
  //get online
  useEffect(()=>{
    socket.on('online',(res)=>{
      setOnline(res)
    })
  },[])
  //socket connect
  useEffect(()=>{
    socket.on('connect', () => {
  setOpen(true)
  alert('test')
});
  },[])
  return (
    <>{open?
    <div className='chat'>
    <Head online={online}/>
  <div className='body-holder'>
{
  msg.map((e,i)=>(
 <Body key={i} data={e}/>
  ))
}
  </div>
  <div className='foot-holder'> 
    <Foot socket={socket} paramsId={params.id}/>
  </div>
    </div>
  :
  <div className='load-holder'>
<motion.div
initial={{
  borderRadius:'10px',
  scale: 0,
  rotate:0
}}
  animate={{
    borderRadius:['20px','40px','60px','40px','20px','10px'],
    scale: [1,2,1,2,1],
    rotate: [0,360,0]
  }}
transition={{
    duration:1.5,
    repeat: Infinity
  }} 


>
</motion.div>  
<span>loading...</span>
  </div>} </>
    )
}