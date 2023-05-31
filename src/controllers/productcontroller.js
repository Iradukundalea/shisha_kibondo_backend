const {  User,Products,Product_taken,beneficial} = require('../models');

const addProduct = async (req, res) => {
    const {
        Name,
        quantity,
        date, 
        expired_date
    } = req.body;

    const   nurse_id = req.user.id
  
    try {
      const nurse = await User.findOne({ where: { id: nurse_id } });
      if (!nurse) {
        return res.status(400).json({ message: 'You are not allowed to add a product.' });
      }
      
         const created = await Products.create({
            Name,
            quantity,
            date, 
            expired_date
      });
  
      return res.status(200).json(created);
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  };

  const listProduct = async (req, res) =>{
    try {
      const response = await Products.findAll()
      if(!response.length){
        return res.status(200).json({
          message: 'No product records found at this moment.'
        });
      }
      return res.status(200).json({
        response
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }

  const takeProduct = async (req, res) => {
    const {
      date,
      quantity,
      productId,
      beneficialId
    } = req.body;

    const   nurse_id = req.user.id
  
    try {
      const nurse = await User.findOne({ where: { id: nurse_id } });
      if (!nurse) {
        return res.status(400).json({ message: 'You are not allowed .' });
      }
      const product=await Products.findOne({where:{id:productId}});
      if(!product){
        return res.status(400).json({message:'product not exist'})
      }
      const beneficia=await beneficial.findOne({where:{id:beneficialId}})
      if(!beneficia){
        return res.status(400).json({message:'beneficial not exist'})
      }
      
         const create = await Product_taken.create({
          productId,
            quantity,
            date, 
            beneficialId
      });
  
      return res.status(200).json(create);
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  };

  module.exports={addProduct,listProduct,takeProduct}