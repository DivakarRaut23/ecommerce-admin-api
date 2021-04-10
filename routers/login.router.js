import express from 'express'

import {loginValidation} from '../middlewares/formValidationmiddleware.js'

const router = express.Router()

router.all('*', (req,res, next) => {
    console.log("Got Hit here")

    next()
})

router.post("/", loginValidation, (req, res) => {
    console.log(req.body)
    res.send({message: "Login requested"})
})

export default router