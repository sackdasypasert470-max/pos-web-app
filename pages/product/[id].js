import {useRouter} from 'next/router'
import {useEffect,useState} from 'react'

export default function Product(){
  const router=useRouter()
  const {id}=router.query
  const [p,setP]=useState(null)

  useEffect(()=>{
    if(!id) return
    fetch('/api/products').then(r=>r.json()).then(list=>setP(list.find(x=>x.id===id)))
  },[id])

  if(!p) return <div className="container">Loading...</div>

  function addToCart(){
    const cart = JSON.parse(localStorage.getItem('cart')||'[]')
    const found = cart.find(i=>i.id===p.id)
    if(found) found.qty++
    else cart.push({...p,qty:1})
    localStorage.setItem('cart',JSON.stringify(cart))
    alert('ເພີ່ມລູກຄ້າແລ້ວ')
  }

  return (
    <div className="container">
      <div style={{display:'flex',gap:16}}>
        <img src={p.image} style={{width:360,height:360,objectFit:'cover',borderRadius:8}}/>
        <div>
          <h2>{p.title}</h2>
          <h3>{p.price} LAK</h3>
          <p>{p.description||'—'}</p>
          <button className="btn btn-primary" onClick={addToCart}>ເພີ່ມກະຕ່າ</button>
        </div>
      </div>
    </div>
  )
}
