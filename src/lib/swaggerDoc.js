const swaggerDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.1',
  info: {
    title: 'Vault API',
    version: '1.0.0',
    description: 'DAO Solutions Vault API Docs',
  },
  host: `localhost:${process.env.PORT}`,
  basePath: '/',
};

const options = {
  swaggerDefinition,
  apis: [__dirname + '/../router/*.js', __dirname + '/../swagger/*.js'],
};

const swaggerSpec = swaggerDoc(options);

module.exports = swaggerSpec;
