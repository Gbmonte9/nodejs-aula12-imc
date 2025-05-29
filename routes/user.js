const express = require('express');
const router = express.Router();
const db = require('../db');
const fs = require('fs');
const path = require('path');

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

  res.render('listauser', {
    title: 'Lista de Users',
    arr_users,
    verificacao
  });
});

async function tryFindId(id) {
  try {
    const data = await db.oneOrNone('SELECT * FROM usuario_imc WHERE id = $1', [id]);
    return data;
  } catch (error) {
    console.log('====================');
    console.log('DB ERROR:', error);
    console.log('====================');
    throw error;
  }
}

router.get('/:id', async function(req, res, next) {
  const vid = req.params.id;

  try {
    const user = await tryFindId(vid);

    if (!user) {
      res.status(404).render('user', { title: 'Users', message: 'Usuário não encontrado' });
    } else {
   
      const peso = parseFloat(user.peso);
      const altura = parseFloat(user.altura);

      let imc = null;
      if (!isNaN(peso) && !isNaN(altura) && altura > 0) {
        imc = (peso / (altura * altura)).toFixed(2);
      }

      res.render('user', { title: 'Users', unique_user: user, imc });
    }
  } catch (error) {
    res.status(500).render('user', { title: 'Users', message: 'Erro no servidor' });
  }



});

router.get('/:id/download', async function(req, res, next) {
  const vid = req.params.id;

  try {
    const user = await tryFindId(vid);

    if (!user) {
      return res.status(404).send('Usuário não encontrado.');
    }

    const peso = parseFloat(user.peso);
    const altura = parseFloat(user.altura);

    let imc = null;
    if (!isNaN(peso) && !isNaN(altura) && altura > 0) {
      imc = (peso / (altura * altura)).toFixed(2);
    }

    const conteudo = `
        ===== DADOS DO USUÁRIO =====
        Nome: ${user.nome}
        Email: ${user.email}
        Peso: ${user.peso} kg
        Altura: ${user.altura} m
        IMC: ${imc ?? 'Não calculado'}
        ============================
    `.trim();

    const filePath = path.join(__dirname, `../public/users/usuario_${vid}.txt`);

    fs.writeFile(filePath, conteudo, (err) => {
      if (err) {
        console.error('Erro ao criar arquivo:', err);
        return res.status(500).send('Erro ao gerar arquivo.');
      }

      res.download(filePath, `usuario_${vid}.txt`, (err) => {
        if (err) {
          console.error('Erro no download:', err);
          res.status(500).send('Erro no download.');
        }

        fs.unlink(filePath, (err) => {
          if (err) console.error('Erro ao deletar arquivo temporário:', err);
        });
      });
    });

  } catch (error) {
    console.log('Erro no download:', error);
    res.status(500).send('Erro ao gerar arquivo.');
  }
});

router.get('/:id/delete', async function(req, res, next) {
  const id = req.params.id;
  let arr_users = [];
  let verificacao = true;

  try {
 
    await db.query('DELETE FROM usuario_imc WHERE id = $1', [id]);

    const result = await db.query('SELECT * FROM public.usuario_imc');
    arr_users = result;

  } catch (error) {
    console.log('====================');
    console.log('DB ERROR:', error);
    console.log('====================');
    verificacao = false;
  }

  res.render('listauser', {
    title: 'Lista de Users',
    arr_users,
    verificacao
  });
  
});

module.exports = router;