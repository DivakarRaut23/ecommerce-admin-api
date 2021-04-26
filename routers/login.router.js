import express from 'express'

import {hashPassword, comparePassword} from '../helpers/bcrypt.helper.js'

import { createRefreshJWT,createAccessJWT} from '../helpers/jwtHelper.js'

import {loginValidation, newUserValidation} from '../middlewares/formValidationmiddleware.js'

import {createUser, getUserByEmail} from '../models/user/User.model.js'

const router = express.Router()

router.all('*', (req,res, next) => {
    console.log("Got Hit here")

    next()
})



router.post("/", loginValidation, async (req, res) => {
    try {

        const {email, password} = req.body

        const user = await getUserByEmail(email)

        if(!user?._id){

            return res.status(403).json({status:"error", message:"Invalid Login Details"})

            
        }
        const dbHashPass = user.password

        const result = await comparePassword(password,dbHashPass);

        user.password = undefined

        

        if(!result) {
           return res.json({status:"error",message: "Invalid Login Details"})

        }

        const accessJWT = await createAccessJWT(user.email, user._id)
        const refreshJWT = await createRefreshJWT(user.email, user._id)

        res.json({status:"success",message: "Login Success", user, accessJWT, refreshJWT}) 
        


        
    } catch (error) {
        throw new Error(error.message)
        
    }
})

router.put("/", newUserValidation, async (req, res) => {
    try {

        const {password} = req.body

        const hashPass = await hashPassword(password)

        const newUser = {
            ...req.body,
            password: hashPass,
        }

        const result = await createUser(newUser);

        if(result?._id){
            return res.json({status:"success",message: "Account created", result})
        }
        res.json({status:"error", message:"Error creating account"})


        
    } catch (error) {
        if(error.message.includes("duplicate key error collection")){
            return res.json({status: "Error", message: "Email already exists"})
        }
        throw new Error(error.message)
        
    }
})

export default router