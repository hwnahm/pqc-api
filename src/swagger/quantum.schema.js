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
 *       mnemonic:
 *         type: string
 *         description: Seed
 *         example: test test test test test test test test test test test test
 *       algorithm:
 *         type: string
 *         description: Selected PQC algorithm
 *         example: Falcon-512
 *
 *  RecoverSigkey:
 *     type: object
 *     properties:
 *       userid:
 *         type: string
 *         description: User Identity
 *         example: test@test.com
 *       mnemonic:
 *         type: string
 *         description: Seed
 *         example: test test test test test test test test test test test test
 *       algorithm:
 *         type: string
 *         description: Selected PQC algorithm
 *         example: Falcon-512
 *
 *  DeleteSigkey:
 *     type: object
 *     properties:
 *       userid:
 *         type: string
 *         description: User Identity
 *         example: test@test.com
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
