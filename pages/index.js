import {useEffect,useState} from 'react'
import Link from 'next/link'

export default function Home(){
  const [products,setProducts]=useState([])

  useEffect(()=>{fetch('/api/products').then(r=>r.json()).then(setProducts)},[])

  function addToCart(p){
    const cart = JSON.parse(localStorage.getItem('cart')||'[]')
    const found = cart.find(i=>i.id===p.id)
    if(found) found.qty++
    else cart.push({...p,qty:1})
    localStorage.setItem('cart',JSON.stringify(cart))
    alert('ເພີ່ມລູກຄ້າແລ້ວ')
  }

  return (
    <div className="container">
      <h2>ໜ້າຫຼັກ - ສິນຄ້າ</h2>
      <div className="grid">
        {products.map(p=> (
          <div className="card" key={p.id}>
            <img src={p.image} style={{width:'100%',height:150,objectFit:'cover',borderRadius:6}} />
            <h3>{p.title}</h3>
            <div className="small">{p.price} LAK</div>
            <div style={{display:'flex',gap:8,marginTop:8}}>
              <Link href={`/product/${p.id}`}><a className="btn">ເບິ່ງ</a></Link>
              <button className="btn btn-primary" onClick={()=>addToCart(p)}>ເພີ່ມກະຕ່າ</button>
            </div>
            <div className="ribbon" style={{background:'var(--orange)'}} />
          </div>
        ))}
      </div>
    </div>
  )
}
