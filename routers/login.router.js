import express from 'express'

import {loginValidation} from '../middlewares/formValidationmiddleware.js'

import {createUser, getUserByEmailPassword} from '../models/user/User.model.js'

const router = express.Router()

router.all('*', (req,res, next) => {
    console.log("Got Hit here")

    next()
})



router.post("/", loginValidation, async (req, res) => {
    try {
        const result = await getUserByEmailPassword(req.body)

        if(result?._id){
            return res.json({status:"success",message: "Login Success", result})
        }
        res.json({status:"error", message:"Invalid Login Details"})


        
    } catch (error) {
        throw new Error(error.message)
        
    }
})

export default router