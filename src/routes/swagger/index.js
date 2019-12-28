const swaggerUi = require('swagger-ui-express');

const express = require('express');
const swaggerDocument = require('./swagger.json');

const router = express.Router();
const options = {
};

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument, options));

module.exports = router;
