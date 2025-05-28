var express = require('express');
var router = express.Router();
const db = require('../db');

router.get('/', async function(req, res, next) {
  let arr_users = [];
  let verificacao = true;

  try {
    arr_users = await db.query('SELECT * FROM public.usuario_imc');
  } catch (error) {
    console.log('====================');
    console.log('DB ERROR:', error);
    console.log('====================');
    verificacao = false;
  }

  res.render('index', {
    title: 'Index',
    arr_users,
    verificacao
  });
});

module.exports = router;