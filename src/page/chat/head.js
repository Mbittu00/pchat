import './head.css'
export default function Head({online}){
  return (
    <div className='head'>
    <span>{online.length}</span>
    <span>pChat</span>
    </div>
    )
}