import './foot.css'
import { RiAttachment2 } from 'react-icons/ri';
import { BiSend } from 'react-icons/bi';
import {useState,useEffect}from'react'
export default function Foot({socket,paramsId}){
  let [msg,setMsg]=useState('')
  let [userObject,setUserObject]=useState(null)
  useEffect(()=>{
  let parse=JSON.parse(localStorage.getItem('name'))
   setUserObject(parse)
  // console.log(parse)
   
  },[])
  let send=()=>{
   socket.emit('send',{
     paramsId,msg,userId:userObject.id,
     userName:userObject.userName
   })
   setMsg('')
   
  }
  let imgSend=(e)=>{
    let file=e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      socket.emit('send',{
     paramsId,
     img:reader.result,
     userId:userObject.id,
     userName:userObject.userName
   })
    }
  }
  return (
    <div className='foot'>
    <div>
    <input type='text' placeholder='message'
    onChange={(e)=>{setMsg(e.target.value)
      window.scroll({
      top: document.body.offsetHeight,
      left: 0, 
      behavior: 'smooth',
    });
    }}
    
    value={msg}/>
    <label>
    <RiAttachment2 size='24' className='att' color='white'/>
    <input type='file' className='file'
    onChange={imgSend} accept='image/*'/>
    </label>
    </div>
    <BiSend size='35' className='send'
    onClick={send}/>
    </div>
    )
}