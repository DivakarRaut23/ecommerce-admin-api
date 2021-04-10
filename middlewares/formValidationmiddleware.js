import Joi from 'joi'

const email = Joi.string().min(3).max(50).required()
const password = Joi.string().required()


export const loginValidation = (req,res, next) => {

    const schema = Joi.object({email, password})

    const value = schema.validate(req.body)

    console.log("From form validation>>>>",value)

    console.log("Error cha ??>>>",value.error)

    if (value.error) {
        return res.json({
            status: "error",
            message: value.error.message,
        })
    }

    next();
}