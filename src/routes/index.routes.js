const express = require('express');
const router = express.Router();

const { renderIndex, renderRegistra } =  require('../controllers/index.controller');

router.get('/', renderIndex);

router.get('/users/signup', renderRegistra);

router.get('/home', renderIndex);

module.exports = router;