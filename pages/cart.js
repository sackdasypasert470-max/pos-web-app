import {useEffect,useState} from 'react'
import Link from 'next/link'

export default function Cart(){
  const [cart,setCart]=useState([])
  useEffect(()=>setCart(JSON.parse(localStorage.getItem('cart')||'[]')) ,[])

  function save(next){
    setCart(next)
    localStorage.setItem('cart',JSON.stringify(next))
  }
  const total = cart.reduce((s,i)=> s + i.price * i.qty,0)

  return (
    <div className="container">
      <h2>ກະຕ່າສິນຄ້າ</h2>
      {cart.length===0 && <div>ຍັງບໍ່ມີສິນຄ້າໃນກະຕ່າ</div>}
      {cart.map(item=> (
        <div key={item.id} style={{display:'flex',gap:12,alignItems:'center',marginBottom:8}}>
          <img src={item.image} style={{width:80,height:80,objectFit:'cover',borderRadius:6}}/>
          <div style={{flex:1}}>
            <div>{item.title}</div>
            <div className="small">{item.price} LAK</div>
          </div>
          <div>
            <button onClick={()=>{item.qty--; if(item.qty<=0){ save(cart.filter(c=>c.id!==item.id)) } else save([...cart])}}>-</button>
            <span style={{margin:'0 8px'}}>{item.qty}</span>
            <button onClick={()=>{item.qty++; save([...cart])}}>+</button>
            <button className="btn btn-danger" style={{marginLeft:8}} onClick={()=>save(cart.filter(c=>c.id!==item.id))}>ລົບ</button>
          </div>
        </div>
      ))}
      <h3>ລວມ {total} LAK</h3>
      <Link href="/checkout"><a className="btn btn-blue">ດ້ວຍຕ້ອງຈ່າຍ</a></Link>
    </div>
  )
}
