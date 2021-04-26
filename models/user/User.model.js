import mongoose from 'mongoose';
import UsersSchema from './User.schema.js'

export const getUserByEmail = (email)=> {

    return new Promise((resolve,reject) => {

        try {

        UsersSchema.findOne({email})
        .then((data) => resolve(data))
        .catch((error) => reject(error))
        
        } catch (error) {
            reject (error)
            
        }

    })

    
}

export const getUserById = _id => {

    return new Promise((resolve,reject) => {

        try {

        UsersSchema.findById(_id)
        .then((data) => resolve(data))
        .catch((error) => reject(error))
        
        } catch (error) {
            reject (error)
            
        }

    })

    
}

export const createUser = userObj => {

    return new Promise((resolve,reject) => {

        try {

        UsersSchema(userObj)
        .save()
        .then((data) => resolve(data))
        .catch((error) => reject(error))
        
        } catch (error) {
            reject (error)
        }

    })

    
}

export const storeRefreshJWT = (_id, token) => {

    return new Promise((resolve,reject) => {

        try {

        UsersSchema
        .findOneAndUpdate({_id},
            {
                $set: {token}
            },
            {new:true})
        .then((data) => resolve(data))
        .catch((error) => reject(error))
        
        } catch (error) {
            reject (error)
        }

    })

    
}