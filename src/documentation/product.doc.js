/**
 * @swagger
 * 
 * /products/add-category:
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
 *                           name:
 *                               type: string
                        
 *          responses:
 *              201:
 *                  description: Successfully Product Category created!
 *              400:
 *                  description: Bad request
 *              500:
 *                  description: Internal server error!
 * 
 * 
 * /products/list-category:
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
 * /products/{productCategoryId}:
 *      get:
 *          tags: [product]
 *          summary: This helps to see product category details.
 *          description: product category details!
 *          parameters: 
 *              - name: productCategoryId
 *                in: path
 *                required: true
 *          responses:
 *              200:
 *                  description: Product Category Details retrieved!
 *              400:
 *                  description: Bad request
 *              500:
 *                  description: Internal server error!

* 
 * /products/{productCategoryId}/add-product:
 *      post:
 *          security:
 *              - BearerToken: []
 *          tags: [product]
 *          summary: This helps to add product.
 *          description: product registration!
 *          parameters: 
 *              - name: productCategoryId
 *                in: path
 *                required: true
 *          requestBody:
 *              description: add a new product
 *              required: true
 *              content:
 *                application/json:
 *                    schema:
 *                       type: object
 *                       properties:
 *                           quantity:
 *                               type: integer
 *                           expirationDate:
 *                               type: string
 *                          
 *          responses:
 *              201:
 *                  description: Successfully Product created!
 *              400:
 *                  description: Bad request
 *              500:
 *                  description: Internal server error!
 * 
 * /donate-product-to-beneficial/{productCategoryId}/{beneficialId}:
 *      post:
 *          security:
 *              - BearerToken: []
 *          tags: [product]
 *          summary: This helps to donate a product(shishakibondo) to beneficial.
 *          description: Donate Product to Beneficial!
 *          parameters:
 *              - name: productCategoryId
 *                in: path
 *                required: true
 * 
 *              - name: beneficialId
 *                in: path
 *                required: true
 * 
 *          requestBody:
 *              description: add a new beneficial
 *              required: true
 *              content:
 *                application/json:
 *                    schema:
 *                       type: object
 *                       properties:
 *                           quantity:
 *                               type: integer                        
 *          responses:
 *              201:
 *                  description: Successfully Product donated!
 *              400:
 *                  description: Bad request
 *              500:
 *                  description: Internal server error!
 * 
 * 
 * 
 */
