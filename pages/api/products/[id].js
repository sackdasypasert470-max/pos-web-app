import fs from 'fs'
import path from 'path'

const file = path.join(process.cwd(),'data','products.json')

export default function handler(req,res){
  const {id} = req.query
  if(req.method==='GET'){
    const data = JSON.parse(fs.readFileSync(file,'utf8')||'[]')
    const item = data.find(x=>x.id===id)
    if(!item) return res.status(404).end()
    return res.status(200).json(item)
  }
  if(req.method==='DELETE'){
    let data = JSON.parse(fs.readFileSync(file,'utf8')||'[]')
    data = data.filter(x=>x.id!==id)
    fs.writeFileSync(file,JSON.stringify(data,null,2))
    return res.status(200).json({ok:true})
  }
  res.status(405).end()
}
