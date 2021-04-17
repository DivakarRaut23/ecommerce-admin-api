import express, { Router } from 'express';
const router = express.Router();
import slugify from 'slugify';
import {insertProduct} from '../models/product/Product.model.js'
import {newProductValidation} from '../middlewares/formValidationmiddleware.js'
import {getProducts,deleteProduct} from '../models/product/Product.model.js'

router.all("*", (req,res,next) => {
    next()
})

router.get("/", async (req,res) => {
    try {
        const result = await getProducts();
        res.json({
            status:"success",
            message: "All the Product List",
            result
        })
        
    } catch (error) {
        throw error
        
    }
})

router.delete("/", async (req,res) => {

    const _id = req.body

    console.log("id in the delete section", id)


    try {
        const result = await deleteProduct(_id);
        res.json({
            status:"success",
            message: "Product has been deleted",
            result
        })
        
    } catch (error) {
        throw error
        
    }
})

router.post("/", newProductValidation, async (req,res) => {
    console.log(req.body)

    try {
        const result = await insertProduct(req.body);
        console.log(result)

        if(result._id){
            return res.json({
                status: "success",
                message: "The Product has been added!",
                result,
            })
        }

        res.json({
            status: "error",
            message: "Adding Product failed"
        })



        
    } catch (error) {

        throw error;
        
    }
})

export default router