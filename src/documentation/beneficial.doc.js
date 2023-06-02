/**
 * @swagger
 * 
 * /addBeneficial:
 *      post:
 *          security:
 *              - BearerToken: []
 *          tags: [beneficial]
 *          summary: This helps to add beneficial.
 *          description: nurse registration!
 *          requestBody:
 *              description: add a new beneficial
 *              required: true
 *              content:
 *                application/json:
 *                    schema:
 *                       type: object
 *                       properties:
 *                           identityNumber:
 *                               type: string
 *                           firstName:
 *                               type: string
 *                           lastName:
 *                               type: string
 *                           telephone:
 *                               type: string 
 *                           sex:
 *                               type: string 
 *   
 *                           status:
 *                               type: string 
 *                           healthCenter:
 *                               type: string 
 *                           province:
 *                               type: string 
 *                           district:
 *                               type: string 
 *                           sector:
 *                               type: string 
 *                           cell:
 *                               type: string 
 *                           village:
 *                               type: string 
 *                       
 *          responses:
 *              201:
 *                  description: Successfully user craeted!
 *              400:
 *                  description: Bad request
 *              500:
 *                  description: Internal server error!
 * 
  
 * /users:
 *      get:
 *          security:
 *              - BearerToken: []
 *          tags: [Authentication]
 *          summary: This helps to list all users.
 *          description: List users
 *          responses:
 *                  200:
 *                      description: users retrieved successfully
 *                  403:
 *                      description: Not allowed
 *                  500:
 *                      description: Internal Server Error
 * 
 * 
 * /Number_of_users:
 *      get:
 *          security:
 *              - BearerToken: []
 *          tags: [Authentication]
 *          summary: This helps to list all users in digits.
 *          description: List users
 *          responses:
 *                  200:
 *                      description: users retrieved successfully
 *                  403:
 *                      description: Not allowed
 *                  500:
 *                      description: Internal Server Error
 * 
 * /getBeneficials:
 *      get:
 *          tags: [beneficial]
 *          summary: This helps to list all beneficials.
 *          description: List beneficials                      
 *          responses:
 *              200:
 *                  description: Beneficials retrieved successfully!
 *              400:
 *                  description: Bad request
 *              500:
 *                  description: Internal server error!
 * 
 * /beneficials/{beneficialId}:
 *      get:
 *          tags: [beneficial]
 *          summary: This helps to see details of a specific beneficial.
 *          description: See Details of beneficial.
 *          parameters: 
 *              - name: beneficialId
 *                in: path
 *                required: true
 *          responses:
 *              200:
 *                  description: Beneficial details successfully!
 *              400:
 *                  description: Bad request
 *              500:
 *                  description: Internal server error!
 * 
 * /beneficials/{beneficialId}/taking-up:
 *      get:
 *          tags: [beneficial]
 *          summary: This helps to see details of a specific beneficial.
 *          description: See Details of beneficial.
 *          parameters: 
 *              - name: beneficialId
 *                in: path
 *                required: true
 *          responses:
 *              200:
 *                  description: Beneficial details successfully!
 *              400:
 *                  description: Bad request
 *              500:
 *                  description: Internal server error!
 * 
 */
