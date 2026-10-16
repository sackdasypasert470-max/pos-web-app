import {useEffect,useState} from 'react'

export default function AdminProducts(){
  const [products,setProducts]=useState([])
  const [title,setTitle]=useState('')
  const [price,setPrice]=useState('')
  const [image,setImage]=useState('')

  useEffect(()=>fetch('/api/products').then(r=>r.json()).then(setProducts),[])

  async function add(e){
    e.preventDefault()
    const res = await fetch('/api/products',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({title,price:parseFloat(price),image})})
    if(res.ok){
      setTitle('');setPrice('');setImage('')
      setProducts(await (await fetch('/api/products')).json())
    } else alert('error')
  }

  async function del(id){
    if(!confirm('Delete?')) return
    await fetch('/api/products/'+id,{method:'DELETE'})
    setProducts(await (await fetch('/api/products')).json())
  }

  return (
    <div className="container">
      <h2>Admin - Products</h2>
      <form onSubmit={add} style={{marginBottom:16}}>
        <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} style={{width:300,padding:8}} />
        <input placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} style={{width:120,padding:8,marginLeft:8}} />
        <input placeholder="Image URL" value={image} onChange={e=>setImage(e.target.value)} style={{width:300,padding:8,marginLeft:8}} />
        <button className="btn btn-primary" style={{marginLeft:8}}>Add</button>
      </form>

      <div className="grid">
        {products.map(p=> (
          <div className="card" key={p.id}>
            <img src={p.image} style={{width:'100%',height:120,objectFit:'cover'}}/>
            <div>{p.title}</div>
            <div className="small">{p.price} LAK</div>
            <button className="btn btn-danger" onClick={()=>del(p.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}
