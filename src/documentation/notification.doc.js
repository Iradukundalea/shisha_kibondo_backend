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
 * 
 * /notifications/{notificationId}/read:
 *      patch:
 *          tags: [Notifications]
 *          security:
 *              - BearerToken: []
 *          summary: This helps to read a single notification.
 *          description: Read single notification.
 *          parameters: 
 *              - name: notificationId
 *                in: path
 *                required: true
 *          responses:
 *              200:
 *                  description: Notification status changed to read!
 *              400:
 *                  description: Bad request
 *              500:
 *                  description: Internal server error!
 * 
 * /notifications/read-all:
 *      patch:
 *          tags: [Notifications]
 *          security:
 *              - BearerToken: []
 *          summary: This helps to read all notifications.
 *          description: Read all notifications.
 *          responses:
 *              200:
 *                  description: Notifications statuses changed to read!
 *              400:
 *                  description: Bad request
 *              500:
 *                  description: Internal server error!
 */
