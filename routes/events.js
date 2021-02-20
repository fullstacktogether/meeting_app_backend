const router = require("express").Router()
const Event = require("../models/Event")
const authMiddleware = require("../middleware/auth-mw")

router.get("/",(req,res)=>{
    res.send("Event")
})

router.post("/",authMiddleware,async(req,res,next)=>{
    try {
        const userId = req.user._id
        const newEvent = new Event(req.body)
        newEvent.creatorID = userId
        const result = await newEvent.save()
        res.send(result)
    } catch (error) {
        next(error)
    }
})



module.exports=router