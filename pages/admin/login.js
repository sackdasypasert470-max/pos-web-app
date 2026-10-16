import {useState} from 'react'
import {useRouter} from 'next/router'

export default function Login(){
  const [user,setUser]=useState('')
  const [pw,setPw]=useState('')
  const router = useRouter()
  function submit(e){
    e.preventDefault()
    if(user==='admin' && pw==='admin'){
      // very simple demo: set localStorage flag
      localStorage.setItem('isAdmin','1')
      router.push('/admin/products')
    } else alert('invalid')
  }
  return (
    <div className="container" style={{maxWidth:420}}>
      <h2>Admin Login</h2>
      <form onSubmit={submit}>
        <div><input placeholder="username" value={user} onChange={e=>setUser(e.target.value)} style={{width:'100%',padding:8}} /></div>
        <div style={{marginTop:8}}><input placeholder="password" type="password" value={pw} onChange={e=>setPw(e.target.value)} style={{width:'100%',padding:8}} /></div>
        <div style={{marginTop:12}}><button className="btn btn-primary">Login</button></div>
      </form>
    </div>
  )
}
