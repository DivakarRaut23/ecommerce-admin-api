import express, { Router } from 'express';
const router = express.Router();
import slugify from 'slugify';
var multer  = require('multer')

import {newProductValidation,updateProductValidation } from '../middlewares/formValidationmiddleware.js'
import {insertProduct,
	getProducts,
	deleteProduct,
	getProductById,
	updateProductById} from '../models/product/Product.model.js'

// Multer Configuration

const ALLOWED_FILE_TYPE = {
	"image/png": "png",
	"image/jpeg": "jpeg",
	"image/jpg": "jpg"
}

var storage = multer.diskStorage({
	destination: function (req, file, cb) {

	let error = null 
//get file type from req.mimetype
	const isAllowed = ALLOWED_FILE_TYPE[file.mimetype]

	if(!isAllowed){
		error = new Error("Some of the file types are not allowed, Only images are allowed")

		error.status = 400
	}

	  cb(error, 'public/img/product')
	},
	filename: function (req, file, cb) {
	  const fileName = slugify(file.originalname.split(".")[0])
	  const extension = ALLOWED_FILE_TYPE[file.mimetype]
	  const fullFileName = fileName + '-' + Date.now() + "." + extension
	  cb(null, fullFileName)
	}
  })
  
  var upload = multer({ storage: storage })

// End Multer Configuration

router.all("*", (req,res,next) => {
    next()
})

router.get("/:_id?", async (req, res) => {
	const { _id } = req.params;
	try {
		const result = _id ? await getProductById(_id) : await getProducts();

		res.json({
			status: "success",
			message: "Here are all the products",
			result,
		});
	} catch (error) {
		throw error;
	}
});

router.put("/", updateProductValidation, async (req, res) => {
	const { _id, ...formDt } = req.body;
	try {
		const result = await updateProductById({ _id, formDt });

		if (result?._id) {
			return res.json({
				status: "success",
				message: "The product has been updated",
				result,
			});
		}

		res.json({
			status: "error",
			message: "Unable to update the product, Please try again later",
			result,
		});
	} catch (error) {
		throw error;
	}
});

router.delete("/", async (req, res) => {
	try {
		if (!req.body) {
			return res.json({
				status: "error",
				message: "Unable to add the product, Please try again later",
			});
		}

		const result = await deleteProduct(req.body);
		console.log(result);

		if (result?._id) {
			return res.json({
				status: "success",
				message: "The product has been deleted.",
				result,
			});
		}

		res.json({
			status: "error",
			message: "Unable to delete the product, Please try again later",
		});
	} catch (error) {
		console.log(error);
		throw error;
	}
});

router.post("/", newProductValidation, async (req, res) => {
	try {
		const addNewProd = {
			...req.body,
			slug: slugify(req.body.name),
		};

		
		const basePath = `${req.protocol}://${req.get('host')}/img/product/`

		const files = req.files;

		const images = []

		files.map(file => {
			const imgFullPath = basePath + file.fileName
			images.push(imgFullPath)
		})

		const result = await insertProduct(...addNewProd, images);
		console.log(result);

		if (result._id) {
			return res.json({
				status: "success",
				message: "The product has been added!",
				result,
			});
		}

		res.json({
			status: "error",
			message: "Unable to add the product, Please try again later",
		});
	} catch (error) {
		throw error;
	}
});

export default router