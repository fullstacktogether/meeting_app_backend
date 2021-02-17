const express = require("express")
const app =express()
require("./database/dbConnection")

app.use(express.json())

app.get("/",(req,res)=>{
    res.json({msg:"Welcome"})
})

app.listen(3000,()=>console.log("Server Started At Port:3000"))
