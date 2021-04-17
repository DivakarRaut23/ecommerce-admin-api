import Joi from 'joi'

const email = Joi.string().min(3).max(50).required()
const password = Joi.string().required()
const shortStr = Joi.string().max(100)
const longStr = Joi.string().max(2000)
const date = Joi.date()
const num = Joi.number()
const array = Joi.array()


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

export const newProductValidation = (req,res, next) => {

    const schema = Joi.object({
        name: shortStr.required(),
        price: num.required(),
        qty: num.required(),
        description: longStr.required(),
        images: array,
        categories: array,
        salePrice: num,
        saleEndDate: date,
        
      })

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