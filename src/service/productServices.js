import db from "../models"

export default class ProductServices {
    /**
     * @param {string} id (productCategoryId) The identification of the product category 
     * @returns { integer } Nummber of quantity of product category
     */

    static async getQuantityByProductCategoryId(id){
        const condition = {
            productCategoryId: id
        }

        let stockInTotalQuantity = 0
        let stockOutTotalQuantity = 0

        const stockinResponse = await db.StockIn.findAll({ where: condition })
        for( let stockin of stockinResponse){
            stockInTotalQuantity = stockInTotalQuantity + stockin.quantity
        }

        const stockoutResponse = await db.StockOut.findAll({ where: condition })
        for( let stockout of stockoutResponse){
            stockOutTotalQuantity = stockOutTotalQuantity + stockout.quantity
        }

        return {totalQuantity: (stockInTotalQuantity - stockOutTotalQuantity)}
    }
}