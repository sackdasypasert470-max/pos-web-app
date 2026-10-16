import fs from 'fs'
import path from 'path'
import {v4 as uuid} from 'uuid'

const file = path.join(process.cwd(),'data','products.json')

export default function handler(req,res){
  if(req.method==='GET'){
    const data = JSON.parse(fs.readFileSync(file,'utf8')||'[]')
    return res.status(200).json(data)
  }
  if(req.method==='POST'){
    const body = req.body
    const data = JSON.parse(fs.readFileSync(file,'utf8')||'[]')
    const item = {id:uuid(),title:body.title,price:body.price,image:body.image,description:body.description||''}
    data.push(item)
    fs.writeFileSync(file,JSON.stringify(data,null,2))
    return res.status(201).json(item)
  }
  res.status(405).end()
}
