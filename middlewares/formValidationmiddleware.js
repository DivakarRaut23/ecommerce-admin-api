import Joi from 'joi'

const email = Joi.string().min(3).max(50).required()
const password = Joi.string().required()
const shortStr = Joi.string().max(100)
const longStr = Joi.string().max(2000)
const date = Joi.date()
const num = Joi.number()
const array = Joi.array()
const boolean = Joi.boolean()


export const loginValidation = (req,res, next) => {

    const schema = Joi.object({email, password})

    const value = schema.validate(req.body)

 

    if (value.error) {
        return res.json({
            status: "error",
            message: value.error.message,
        })
    }

    next();
}

export const newProductValidation = (req,res, next) => {

    const categories = req.body.categories.length ? req.body.categories.split(",") : []

    req.body.categories = categories

    const schema = Joi.object({
        name: shortStr.required(),
        price: num.required(),
        qty: num.required(),
        status: boolean.required(),
        description: longStr.required(),
        images: array,
        categories: array,
        salePrice: num,
        saleEndDate: date,
        
      })

    const value = schema.validate(req.body)

  
    if (value.error) {
        return res.json({
            status: "error",
            message: value.error.message,
        })
    }

    next();
}

export const updateProductValidation = (req, res, next) => {
	const schema = Joi.object({
		_id: shortStr.required(),
		status: boolean.required(),
		name: shortStr.required(),
		slug: shortStr.required(),
		qty: num.required(),

		price: num.required(),
		salePrice: num,
		saleEndDate: date,
		description: longStr.required(),
		images: array,
		categories: array,
	});

	//validation
	const value = schema.validate(req.body);

	if (value.error) {
		return res.json({
			status: "error",
			message: value.error.message,
		});
	}

	next();
};