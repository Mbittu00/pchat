import './body.css'
import {useState,useEffect}from'react'
export default function Body({data}){
  let [userObject,setUserObject]=useState({})
  useEffect(()=>{
  let parse=JSON.parse(localStorage.getItem('name'))
   setUserObject(parse)
  },[])
  return (
    <div className={
    userObject.id==data.userId?'body own':'body not'}>
 {!data.img? <span>{data.msg}</span>:
 <img src={data.img} className='img'/>
 }
   <span>{data.userName}</span>
    </div>
    )
}