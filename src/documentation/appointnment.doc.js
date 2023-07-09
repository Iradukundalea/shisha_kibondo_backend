/**
 * @swagger
 * 
 * /appointments/{beneficialId}/list:
 *      get:
 *          tags: [Appointment]
 *          summary: This helps to list beneficial appointments.
 *          description: List appointments
 *          parameters:
 *              - name: beneficialId
 *                in: path
 *                required: true
 *          responses:
 *                  200:
 *                      description: appointments retrieved successfully
 *                  403:
 *                      description: Not allowed
 *                  500:
 *                      description: Internal Server Error
 * 
 * /appointments/{beneficialId}/create:
 *      post:
 *          tags: [Appointment]
 *          security:
 *              - BearerToken: []
 *          summary: This helps to assign appointment to a beneficiary.
 *          description: Assign an appointment to beneficiary
 *          parameters:
 *              - name: beneficialId
 *                in: path
 *                required: true
 * 
 *          requestBody:
 *              content:
 *                application/json:
 *                    schema:
 *                       type: object
 *                       properties:
 *                           appointmentDate:
 *                               type: string
 *          responses:
 *                  200:
 *                      description: appointment scheduled successfully
 *                  403:
 *                      description: Not allowed
 *                  500:
 *                      description: Internal Server Error
 * 
 */
