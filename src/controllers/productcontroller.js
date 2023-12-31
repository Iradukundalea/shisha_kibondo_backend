const db = require('../models');
const {  User, Products, beneficial, ProductCategories, StockIn, StockOut} = require('../models');
const { default: ProductServices } = require('../service/productServices');

const addProductCategories = async (req, res) => {
    const {
        name,
    } = req.body;

    const userId = req.user.id
  
    try {
      const condition ={
        id: userId,
        role: 'Nurse'
      }

      const nurse = await User.findOne({ where: condition });
      if (!nurse) {
        return res.status(400).json({ message: 'You are not allowed to add a product, Only Nurse.' });
      }

      const created = await ProductCategories.create({
        name,
        nurseId: nurse.id
      });
  
      return res.status(201).json(created);
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
};

const addNewProduct = async (req, res) => {
  const {
      quantity,
      expirationDate
  } = req.body;

  const { productCategoryId } = req.params

  const userId = req.user.id

  try {
    const condition ={
      id: userId,
      role: 'Nurse'
    }

    const nurse = await User.findOne({ where: condition });
    if (!nurse) {
      return res.status(400).json({ message: 'You are not allowed to add a product, Only Nurse.' });
    }

    const created = await StockIn.create({
      productCategoryId,
      quantity,
      expirationDate,
      nurseId: nurse.id,
    });

    return res.status(201).json(created);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

const donateProductToBeneficial = async (req, res) => {
  const {
      quantity,
  } = req.body;

  const { productCategoryId, beneficialId } = req.params
  
  const userId = req.user.id

  try {
    const condition = {
      id: userId,
      role: 'Nurse'
    }

    const nurse = await User.findOne({ where: condition });
    if (!nurse) {
      return res.status(400).json({ message: 'You are not allowed to add a product, Only Nurse.' });
    }

    if(!quantity || !productCategoryId || !beneficialId){
      return res.status(400).json({
        message: 'Quantity, Product, and beneficial are required!' 
      });
    }

    // Check if product quantity is available
    const { totalQuantity } = await ProductServices.getQuantityByProductCategoryId(productCategoryId)

    if(totalQuantity < quantity){
      return res.status(400).json({ 
        message: `Quantity ${quantity} is higher than available in stock ${totalQuantity}` 
      });
    }

    const created = await StockOut.create({
      productCategoryId,
      beneficialId,
      quantity,
      nurseId: nurse.id,
    });

    return res.status(201).json(created);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

const listProduct = async (req, res) =>{
  try {
    let updatedResponse = []

    const response = await ProductCategories.findAll()
    if(!response.length){
      return res.status(200).json({
        message: 'No product records found at this moment.'
      });
    }

    for(const product of response){
      const { totalQuantity } = await ProductServices.getQuantityByProductCategoryId(product.id)
      product.get().totalQuantity = totalQuantity
      updatedResponse.push(product)
    }
    return res.status(200).json({
      response: updatedResponse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
}

const listProductDetails = async (req, res) =>{
  const include = [
    {
      model: db.StockIn,
      as: 'stockIn'
    },
    {
      model: db.StockOut,
      as: 'stockOut',
      include: [
        {
          model: db.beneficial,
          as: 'beneficial'
        }
      ]
    }
  ]
  let transactions = []
  const { productCategoryId } = req.params
  try {
    const response = await ProductCategories.findOne({ 
      where: { id: productCategoryId }, 
      include 
    })
    if(!Object.keys(response).length){
      return res.status(404).json({
        message: 'No product records found at this moment.'
      });
    }

    const { totalQuantity } = await ProductServices.getQuantityByProductCategoryId(productCategoryId)
    
    // add stockin
    for(const stockin of response.stockIn){
      transactions.push(stockin)
    }

    // add stockout
    for(const stockout of response.stockOut){
      transactions.push(stockout)
    }

    response.get().totalQuantity = totalQuantity
    response.get().transactions = transactions

    // remove stockout and stockin attributes since we have transactions
    delete response.get().stockOut && delete response.get().stockIn
    return res.status(200).json({
      response,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
}


module.exports= { 
  addProductCategories,
  listProduct,
  addNewProduct,
  donateProductToBeneficial,
  listProductDetails,
}
