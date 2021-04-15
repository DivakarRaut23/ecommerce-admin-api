import mongoose from 'mongoose';
import AdminUsers from './User.schema.js'

export const getUserByEmailPassword = ({email, password})=> {

    return new Promise((resolve,reject) => {

        try {

        AdminUsers.findOne({email, password})
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

        AdminUsers(userObj)
        .save()
        .then((data) => resolve(data))
        .catch((error) => reject(error))
        
        } catch (error) {
            reject (error)
        }

    })

    
}