/**
 * @swagger
 * 
 * /add/product:
 *      post:
 *          security:
 *              - BearerToken: []
 *          tags: [product]
 *          summary: This helps to add product.
 *          description: product registration!
 *          requestBody:
 *              description: add a new beneficial
 *              required: true
 *              content:
 *                application/json:
 *                    schema:
 *                       type: object
 *                       properties:
 *                           Name:
 *                               type: string
 *                           quantity:
 *                               type: integer
 *                           date:
 *                               type: string
 *                           expired_date:
 *                               type: string 
                        
 *          responses:
 *              201:
 *                  description: Successfully user craeted!
 *              400:
 *                  description: Bad request
 *              500:
 *                  description: Internal server error!
 * 
 * /product/getPdoduct:
 *      get:
 *          tags: [product]
 *          summary: This helps to list all product.
 *          description: List product                      
 *          responses:
 *              200:
 *                  description: Beneficials retrieved successfully!
 *              400:
 *                  description: Bad request
 *              500:
 *                  description: Internal server error!
 * 

 * /product/take:
 *      post:
 *          security:
 *              - BearerToken: []
 *          tags: [product]
 *          summary: This helps to add product.
 *          description: product registration!
 *          requestBody:
 *              description: add a new beneficial
 *              required: true
 *              content:
 *                application/json:
 *                    schema:
 *                       type: object
 *                       properties:
 *                           productId:
 *                               type: string
 *                           quantity:
 *                               type: integer
 *                           date:
 *                               type: string
 *                           beneficialId:
 *                               type: string 
                        
 *          responses:
 *              201:
 *                  description: Successfully user craeted!
 *              400:
 *                  description: Bad request
 *              500:
 *                  description: Internal server error!
 *
 * 
 */
