import express  from "express";
const product=express()

import productCont from '../controllers/productcontroller'
import isAuthenticated from '../middlewares/Authorization'



product.post('/add/product',isAuthenticated, productCont.addProduct)
product.get('/product/getPdoduct',productCont.listProduct)
product.post('/product/take',isAuthenticated, productCont.takeProduct)

module.exports={product}

