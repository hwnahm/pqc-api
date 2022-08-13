/**
 * @swagger
 * definitions:
 *
 *  NewSigkey:
 *     type: object
 *     properties:
 *       userid:
 *         type: string
 *         description: User Identity
 *         example: test@test.com
 *       algorithm:
 *         type: string
 *         description: Selected PQC algorithm
 *         example: Falcon-512
 *
 *  SignMessage:
 *     type: object
 *     properties:
 *       secretkey:
 *         type: string
 *         description: User Secret Key
 *         example: 0x...
 *       algorithm:
 *         type: string
 *         description: Selected PQC algorithm
 *         example: Falcon-512
 *       message:
 *         type: string
 *         description: target message
 *         example: this is a test message
 *
 *  VerifyMessage:
 *     type: object
 *     properties:
 *       userid:
 *         type: string
 *         description: User Identity
 *         example: test@test.com
 *       message:
 *         type: string
 *         description: target message
 *         example: this is a test message
 *       signature:
 *         type: string
 *         description: signature
 *         example: 0x....
 *
 */
