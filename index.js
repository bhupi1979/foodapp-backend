const exp=require("express")
const fs = require('fs')
const path = require('path')

const { foodrt } = require("./app/Router/web/foodRouter")
const Dbconnect = require("./app/DB/db")
const cors=require('cors')
const api=exp()
require('dotenv').config()
const uploadPath = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}
api.use('/uploads', exp.static(path.join(__dirname, 'uploads')))
api.use(cors())
api.use(exp.json())
Dbconnect()
api.use("/api",foodrt)
api.listen(process.env.PORT,()=>{
console.log("the api is running on porot"+ process.env.PORT)
})