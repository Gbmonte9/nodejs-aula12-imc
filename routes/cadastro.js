const express = require('express');
const router = express.Router();
const { nanoid } = require('nanoid'); 
const db = require('../db');

router.get('/', function(req, res, next) {
  res.render('cadastro', { title: 'Cadastro Users' });
});

router.post('/', async function(req, res, next) {
  const { vname, vemail, vpeso, valtura } = req.body;
  console.log('Recebido:', req.body);
  const id = nanoid(); 
  
  if (!vname || vname.trim() === '') {
    return res.render('cadastro', {
      verificacao: false,
      message: 'Erro: Nome não pode ficar em branco.'
    });
  }

  if (!vemail || vemail.trim() === '') {
    return res.render('cadastro', {
      verificacao: false,
      message: 'Erro: E-mail não pode ficar em branco.'
    });
  }

  if (isNaN(vpeso) || vpeso <= 0 ) {
    return res.render('cadastro', {
      verificacao: false,
      message: 'Erro: Peso devem conter apenas números.'
    });
  }

  if (isNaN(valtura) || valtura <= 0) {
    return res.render('cadastro', {
      verificacao: false,
      message: 'Erro: Altura devem conter apenas números.'
    });
  }

  const pesoFloat = parseFloat(vpeso);
  const alturaFloat = parseFloat(valtura);

  try {

    const emailFormatado = vemail.trim().toLowerCase();
    const checkEmail = await db.query('SELECT * FROM usuario_imc WHERE LOWER(email) = $1', [emailFormatado]);
    
    console.log('checkEmail:', checkEmail);

    if (checkEmail && Array.isArray(checkEmail.rows) && checkEmail.rows.length > 0) {
      return res.render('cadastro', {
        verificacao: false,
        message: 'Erro: E-mail já está registrado.'
      });
    }

    await db.query(
      'INSERT INTO usuario_imc (id, nome, email, peso, altura) VALUES ($1, $2, $3, $4, $5)',
      [id, vname.trim(), emailFormatado, pesoFloat, alturaFloat]
    );

    res.render('cadastro', {
      verificacao: true,
      message: '✅ Cadastro realizado com sucesso.'
    });

  } catch (error) {
    if (error.code === '23505') {
      return res.render('cadastro', {
        verificacao: false,
        message: 'Erro: Este e-mail já está cadastrado.'
      });
    }

    console.error('Erro no cadastro:', error);
    res.render('cadastro', {
      verificacao: false,
      message: `Erro ao cadastrar: ${error.message}`
    });
  }
  
});

module.exports = router;