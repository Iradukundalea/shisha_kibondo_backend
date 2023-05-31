/**
 * @swagger
 * 
 * /addGuardian:
 *      post:
 *          security:
 *              - BearerToken: []

 *          tags: [guardian]
 *          summary: This helps to add beneficial.
 *          description: guardian registration!
 *          requestBody:
 *              description: add a new guardian
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
 * 
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
 * 
 *          responses:
 *                  200:
 *                      description: users retrieved successfully
 *                  403:
 *                      description: Not allowed
 *                  500:
 *                      description: Internal Server Error
 * 
 
 * 
 * 
 */
