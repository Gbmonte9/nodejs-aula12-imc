var express = require('express');
var router = express.Router();
const db = require('../db');

router.get('/:id', async function(req, res, next) {
  const id = req.params.id;
  let arr_users = [];
  let verificacao = true;

  try {
 
    await db.query('DELETE FROM usuario_imc WHERE id = $1', [id]);

    const result = await db.query('SELECT * FROM usuario_imc ORDER BY id');
    arr_users = result.rows;

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