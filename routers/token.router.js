import express from "express";
const router = express.Router();

import {createAccessJWT, verifyRefreshJwt} from '../helpers/jwt.helper.js'
import {getUserByEmailAndRefreshJWT} from '../models/user/User.model.js'


router.all("*",(req,res,next) => {
    next()
})

// get refreshJWT and return new accesJWT

router.get("/", async (req, res) => {


    try {
        
    const {authorization} = req.headers

    
    if(authorization) {

        const {email} = await verifyRefreshJwt(authorization)

        if(email) {

            const user = await getUserByEmailAndRefreshJWT({
                email,
                refreshJWT: authorization,
            })

            if(user._id) {
                const tokenExp = user.refreshJWT.addedAt
                tokenExp.setDate(tokenExp.getDate() + +process.env.JWT_REFRESH_SECRET_EXPIRY_DAYS)
            
                const today = Date.now()

                if (tokenExp > today ){
       
                    const accessJWT = await createAccessJWT(email, user._id)
                    return res.json({
                        status: "success",
                        message: "Here is your new accessJWT",
                        accessJWT
                
                    })
                
                    }
            } 
         
        }
        
    }

   res.status(403).json({
       status:"error",
       message: "Access forbidden"

   })
   
    } catch (error) {
        throw new Error(error)
    }
})


export default router