import {useState,useEffect} from 'react'

export default function Checkout(){
  const [cart,setCart]=useState([])
  const [name,setName]=useState('')
  const [phone,setPhone]=useState('')
  const [latlng,setLatlng]=useState(null)
  const [payment,setPayment]=useState('cod')

  useEffect(()=>setCart(JSON.parse(localStorage.getItem('cart')||'[]')) ,[])
  const total = cart.reduce((s,i)=> s + i.price * i.qty,0)

  function getLocation(){
    if(!navigator.geolocation){alert('Geolocation not supported') ; return}
    navigator.geolocation.getCurrentPosition(p=>{
      setLatlng({lat:p.coords.latitude,lng:p.coords.longitude})
    },err=>alert('Cannot get location: '+err.message))
  }

  async function place(){
    const order = {id:Date.now().toString(),name,phone,latlng,cart,payment,total,createdAt:new Date().toISOString()}
    const res = await fetch('/api/orders',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(order)})
    if(res.ok){
      localStorage.removeItem('cart')
      alert('ສັ່ງສິນຄ້າສຳເລັດ')
      window.location.href='/'
    }else alert('error')
  }

  return (
    <div className="container">
      <h2>Checkout</h2>
      <div style={{maxWidth:640}}>
        <label>ຊື່</label>
        <input value={name} onChange={e=>setName(e.target.value)} style={{width:'100%',padding:8,margin:'8px 0'}} />
        <label>ເບີໂທ</label>
        <input value={phone} onChange={e=>setPhone(e.target.value)} style={{width:'100%',padding:8,margin:'8px 0'}} />
        <div style={{margin:'8px 0'}}>
          <button className="btn" onClick={getLocation}>Get My Location</button>
          {latlng && <div className="small">lat: {latlng.lat.toFixed(5)}, lng: {latlng.lng.toFixed(5)} — <a target="_blank" href={`https://www.google.com/maps?q=${latlng.lat},${latlng.lng}`}>Open Map</a></div>}
        </div>

        <h4>Payment</h4>
        <div>
          <label><input type="radio" checked={payment==='cod'} onChange={()=>setPayment('cod')} /> Cash on Delivery</label>
        </div>
        <div>
          <label><input type="radio" checked={payment==='qr'} onChange={()=>setPayment('qr')} /> Bank QR</label>
          {payment==='qr' && (
            <div style={{marginTop:8}}>
              <div>QR image placeholder (upload your bank QR to public/qr.png)</div>
              <input type="file" accept="image/*" />
              <div className="small">Upload slip (client-side only in this demo)</div>
              <input type="file" accept="image/*" />
            </div>
          )}
        </div>

        <h3>Total: {total} LAK</h3>
        <button className="btn btn-primary" onClick={place}>Place order</button>
      </div>
    </div>
  )
}
