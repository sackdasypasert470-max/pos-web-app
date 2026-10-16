import fs from 'fs'
import path from 'path'

const file = path.join(process.cwd(),'data','orders.json')

export default function handler(req,res){
  if(req.method==='GET'){
    const data = JSON.parse(fs.readFileSync(file,'utf8')||'[]')
    return res.status(200).json(data)
  }
  if(req.method==='POST'){
    const body = req.body
    const data = JSON.parse(fs.readFileSync(file,'utf8')||'[]')
    data.push(body)
    fs.writeFileSync(file,JSON.stringify(data,null,2))
    return res.status(201).json({ok:true})
  }
  res.status(405).end()
}
