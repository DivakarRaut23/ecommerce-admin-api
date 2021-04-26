import express from 'express'

import {hashPassword, comparePassword} from '../helpers/bcrypt.helper.js'

import { createRefreshJWT,createAccessJWT} from '../helpers/jwtHelper.js'

import {newUserValidation} from '../middlewares/formValidationmiddleware.js'

import {createUser, getUserByEmail, getUserById} from '../models/user/User.model.js'


const router = express.Router()

router.all('*', (req,res, next) => {
    console.log("Got Hit here")

    next()
})

router.get("/:id", async (req, res) => {

    const {authorization} = req.headers



    const {_id} = req.params;

    if(_id) {
        return res.send ({
            status: "error",
            message: "Invalid request",
        });
    }

    const user = await getUserById(_id)

    if (user) user.password = undefined;

    user._id ?
    res.send({
        status: "success",
        message: "Welcome to dashboard",
        user,

    })
    :
    res.send({
        status: "error",
        message: "Invalid login request"

    })

})




router.post("/", newUserValidation, async (req, res) => {
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