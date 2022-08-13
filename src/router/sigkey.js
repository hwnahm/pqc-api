const express = require('express');
const sigkeyRouter = new express.Router();
const sigkeyCtrl = require('../controllers/sigkey.ctrl');
const sigkeyValidator = require('../validators/sigkey.validator');

/**
 * @swagger
 * tags:
 *   name: SigkeyAPI
 *   description: Post Quantum Cryptography Signature API
 */

/**
 * @swagger
 * /api/sigkey/algolist:
 *   get:
 *     tags:
 *       - SigkeyAPI
 *     description: 사용가능 한 양자내성 알고리즘 리스트 조회
 *     requestBody:
 *       description: List Enabled PQC Algorithms
 *     responses:
 *       "200":
 *         description: "successful operation"
 */
sigkeyRouter.get('/algolist', sigkeyCtrl.listAlgos);

/**
 * @swagger
 * /api/sigkey/create:
 *   post:
 *     tags:
 *       - SigkeyAPI
 *     description: PQC Sigkey 생성
 *     requestBody:
 *       description: generate post quantum cryptography key for signature
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/NewSigkey'
 *     responses:
 *       "200":
 *         description: "successful operation"
 */
sigkeyRouter.post('/create', sigkeyValidator.createSigkey(), sigkeyCtrl.createSigkey);

/**
 * @swagger
 * /api/sigkey/sign:
 *   post:
 *     tags:
 *       - SigkeyAPI
 *     description: PQC Sigkey로 메시지 서명
 *     requestBody:
 *       description: sign a message by PQC Sigkey
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/SignMessage'
 *     responses:
 *       "200":
 *         description: "successful operation"
 */
sigkeyRouter.post('/sign', sigkeyValidator.signMessage(), sigkeyCtrl.signMessage);

/**
 * @swagger
 * /api/sigkey/verify:
 *   post:
 *     tags:
 *       - SigkeyAPI
 *     description: PQC Sigkey로 서명된 메시지 검증
 *     requestBody:
 *       description: verify a message signed by PQC Sigkey
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/VerifyMessage'
 *     responses:
 *       "200":
 *         description: "successful operation"
 */
sigkeyRouter.post('/verify', sigkeyValidator.verifyMessage(), sigkeyCtrl.verifyMessage);

module.exports = sigkeyRouter;
