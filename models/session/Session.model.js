import SessionSchema from './Session.schema.js'

export const storeAccessJWT = (_id, accessJWT) => {
    return new Promise(async (resolve, reject) => {
        try {
            
        const result = await SessionSchema(newSession).save();

        return result

        } catch (error) {

            reject(error)
            
        }
    })
}