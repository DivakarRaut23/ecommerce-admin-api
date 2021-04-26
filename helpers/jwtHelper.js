import jwt from 'jsonwebtoken'
import {storeAccessJWT} from '../models/session/Session.model.js'
import {storeRefreshJWT} from '../models/user/User.model.js'


export const createAccessJWT =  (email, _id) => {

return new Promise((resolve, reject) =>{

    try {
        const accessJWT = jwt.sign({ email }, process.env.JWT_ACCESS_SECRET,{
            expiresIn: '15m'
        });

        if(accessJWT) {
            const newSession = {
                accessJWT,
                userID: _id

            }
            storeAccessJWT
        }


        resolve(accessJWT)
    
        
    } catch (error) {
        reject(error)
        
    }

})

}


export const createRefreshJWT = (email, _id) =>{
    return new Promise((resolve, reject) =>{

        try {
        const refreshJWT =  jwt.sign({email}, process.env.JWT_REFERESH_SECRET, {
            expiresIn: '30d'
        })
        resolve(refreshJWT)

            
        } catch (error) {
            reject(error)
            
        }
    })
}

export const verifyAccessJWT = accessJWT => {
    try {

        const decoded = jwt.verify(accessJWT, process.env.JWT_ACCESS_SECRET)
        console.log(decoded)
        return Promise.resolve(decoded)
        
    } catch (error) {
        return Promise.reject(error)
        
    }
}