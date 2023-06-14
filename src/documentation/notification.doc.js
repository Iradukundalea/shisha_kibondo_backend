/**
 * @swagger
 * 
 * /notifications:
 *      get:
 *          security:
 *              - BearerToken: []
 *          tags: [Notifications]
 *          summary: This helps to list all notifications.
 *          description: List Notifications
 * 
 *          responses:
 *                  200:
 *                      description: notifications retrieved successfully
 *                  403:
 *                      description: Not allowed
 *                  500:
 *                      description: Internal Server Error
 */
