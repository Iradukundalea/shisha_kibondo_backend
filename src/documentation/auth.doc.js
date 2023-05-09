/**
 * @swagger
 * 
 * /signup:
 *      post:
 *          tags: [Authentication]
 *          summary: This helps to register a new user.
 *          description: Teacher, Parent, Patron, Matron, DoS, DoD, and Head Teacher registration!
 *          requestBody:
 *              description: Register a new User
 *              required: true
 *              content:
 *                application/json:
 *                    schema:
 *                       type: object
 *                       properties:
 *                           firstName:
 *                               type: string
 *                           lastName:
 *                               type: string
 *                           email:
 *                               type: string
 *                           password:
 *                               type: string 
 *                           telephone:
 *                               type: string 
 *   
 *                           specialized:
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
  
 * /login:
 *      post:
 *          tags: [Authentication]
 *          summary: This helps to login as a user.
 *          description: Teacher, Parent, Patron, Matron, DoS, DoD, and Head Teacher registration!
 *          requestBody:
 *              description: login
 *              required: true
 *              content:
 *                application/json:
 *                    schema:
 *                       type: object
 *                       properties:
 *                           email:
 *                               type: string
 *                           password:
 *                               type: string 
 *          responses:
 *              200:
 *                  description: Successfully user logged in!
 *              400:
 *                  description: Bad request
 *              404: 
 *                  description: Not Found
 *              500:
 *                  description: Internal server error!
 * 
 * /signout:
 *      post:
 *          security:
 *              - BearerToken: []
 *          tags: [Authentication]
 *          description: Logout the user
 *          summary: It helps to logout the user
 *          responses:
 *                  200:
 *                     description: user logged out succesfully
 *                  500:
 *                     description: Internal server error
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
 * /forgot-password:
 *      post:
 *          tags: [Authentication]
 *          summary: This helps to request reset a password.
 *          description: Request password reset!
 *          requestBody:
 *              description: Provide an Email
 *              required: true
 *              content:
 *                application/json:
 *                    schema:
 *                       type: object
 *                       properties:
 *                           email:
 *                               type: string
 *          responses:
 *              200:
 *                  description: Email to reset sent!
 *              400:
 *                  description: Bad request
 *              500:
 *                  description: Internal server error!
 * 
 * 
 * /reset-password/{token}:
 *      post:
 *          tags: [Authentication]
 *          summary: This helps to provide a new password.
 *          description: Provide new password for resetting!
 *          parameters:
 *              - name: token
 *                in: path
 *                required: true
 *          requestBody:
 *              description: Provide an Email
 *              required: true
 *              content:
 *                application/json:
 *                    schema:
 *                       type: object
 *                       properties:
 *                           newPassword:
 *                               type: string
 *                           confirmPassword:
 *                               type: string
 *          responses:
 *              200:
 *                  description: Password updated successfully!
 *              400:
 *                  description: Bad request
 *              500:
 *                  description: Internal server error!
 * 

 
 * 
  */
