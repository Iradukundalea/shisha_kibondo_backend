import express  from "express";
import productCont from '../controllers/productcontroller'
import isAuthenticated from '../middlewares/Authorization'

const product = express.Router()

product.post('/products/add-category', isAuthenticated, productCont.addProductCategories)
product.get('/products/list-category', productCont.listProduct)
product.post('/products/:productCategoryId/add-product', isAuthenticated, productCont.addNewProduct)

product.post('/donate-product-to-beneficial/:productCategoryId/:beneficialId', isAuthenticated, productCont.donateProductToBeneficial)

module.exports = { product }

