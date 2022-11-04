const sigkeyRepository = require('../repositories/sigkey_repository');
const { validationResult } = require('express-validator');
const logger = require('../utils/logger');
const { handlerSuccess, handlerError } = require('../utils/handler_response');
const ErrorMessage = require('../utils/errorMessage').ErrorMessage;
const ObjectID = require('mongodb').ObjectID;
const { _errorFormatter } = require('../utils/helper');
const { arrayify, hexlify, hashMessage } = require('ethers/lib/utils');
const { ethers } = require('ethers');
const crypto = require('crypto');

const {
  Random, // Utilities for generating secure random numbers
  KEMS, // Information on supported key encapsulation mechanisms
  KeyEncapsulation, // Key encapsulation class and methods
  Sigs, // Information on supported signature algorithms
  Signature, // Signature class and methods
} = require('liboqs-node');

module.exports = {
  classname: 'VaultController',

  createSigkey: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let errorMsg = _errorFormatter(errors.array());
        return handlerError(req, res, errorMsg);
      }

      const userid = req.body.userid;
      const algorithm = req.body.algorithm;

      const sigkey = await sigkeyRepository.findByUserid(userid);
      if (sigkey.length) {
        console.log(ErrorMessage.SIGKEY_EXIST);
        return handlerError(req, res, ErrorMessage.SIGKEY_EXIST);
      }

      // Seed
      const wallet = ethers.Wallet.createRandom();
      const mnemonic = wallet.mnemonic.phrase;
      const address = await wallet.getAddress();

      const hash = crypto.createHash('sha384');
      const data = hash.update(mnemonic, 'utf-8');
      const seed = data.digest('hex');
      console.log('===>', `mnemonic: ${mnemonic}, hash: ${seed}`);
      console.log('===>', `address: ${address}`);

      // PQC 키페어 생성
      const sig = new Signature(algorithm);
      const publicKey = hexlify(sig.generateKeypair(Buffer.from(seed, 'utf8')));
      const secretKey = hexlify(sig.exportSecretKey());

      const newVault = {
        userid,
        publicKey,
        secretKey,
        algorithm,
        mnemonic,
        address,
      };

      let result = await sigkeyRepository.create(newVault);

      if (!result) {
        return handlerError(req, res, ErrorMessage.CREATE_SIGKEY_IS_NOT_SUCCESS);
      }

      return handlerSuccess(req, res, result);
    } catch (error) {
      logger.error(new Error(error));
      next(error);
    }
  },

  signMessage: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let errorMsg = _errorFormatter(errors.array());
        return handlerError(req, res, errorMsg);
      }

      const secretKey = req.body.secretkey;
      const algorithm = req.body.algorithm;
      console.log(secretKey);

      const sig = new Signature(algorithm, arrayify(secretKey));
      const target = hashMessage(req.body.message);
      const signedMsg = sig.sign(arrayify(target));

      const result = { signature: hexlify(signedMsg) };
      return handlerSuccess(req, res, result);
    } catch (error) {
      logger.error(new Error(error));
      next(error);
    }
  },

  verifyMessage: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let errorMsg = _errorFormatter(errors.array());
        return handlerError(req, res, errorMsg);
      }

      const userid = req.body.userid;
      const sigkey = await sigkeyRepository.findByUserid(userid);
      if (!sigkey) {
        return handlerError(req, res, ErrorMessage.SIGKEY_IS_NOT_FOUND);
      }
      const algorithm = sigkey.algorithm;

      // const sig = new Signature('Falcon-512', arrayify(sigkey[0].secretKey));
      const sig = new Signature(algorithm ?? 'Falcon-512');
      const target = hashMessage(req.body.message);
      const verifyRlt = sig.verify(
        arrayify(target),
        arrayify(req.body.signature),
        arrayify(sigkey[0].publicKey),
      );

      const result = { result: verifyRlt };
      return handlerSuccess(req, res, result);
    } catch (error) {
      logger.error(new Error(error));
      next(error);
    }
  },

  listAlgos: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let errorMsg = _errorFormatter(errors.array());
        return handlerError(req, res, errorMsg);
      }

      const algorithms = Sigs.getEnabledAlgorithms();
      console.log(algorithms);

      const result = { algorithms: algorithms };
      return handlerSuccess(req, res, result);
    } catch (error) {
      logger.error(new Error(error));
      next(error);
    }
  },
};
