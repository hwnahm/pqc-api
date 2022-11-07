const { body, param, check } = require('express-validator');

module.exports = {
  classname: 'ValidateSigkey',

  createSigkey: () => {
    return [body('userid').trim().not().isEmpty().withMessage('Missing userid parameter')];
  },
  recoverSigkey: () => {
    return [
      body('userid').trim().not().isEmpty().withMessage('Missing userid parameter'),
      body('mnemonic').trim().not().isEmpty().withMessage('Missing mnemonic parameter'),
    ];
  },
  deleteSigkey: () => {
    return [body('userid').trim().not().isEmpty().withMessage('Missing userid parameter')];
  },
  signMessage: () => {
    return [
      body('secretkey').trim().not().isEmpty().withMessage('Missing secretkey parameter'),
      body('message').trim().not().isEmpty().withMessage('Missing message parameter'),
    ];
  },
  verifyMessage: () => {
    return [
      body('userid').trim().not().isEmpty().withMessage('Missing userid parameter'),
      body('message').trim().not().isEmpty().withMessage('Missing message parameter'),
      body('signature').trim().not().isEmpty().withMessage('Missing signature parameter'),
    ];
  },
};
