const express = require('express');
const router = express.Router();
const db = require ('./db.js');

router.get('/', function (req, res) {  
  db.any ('SELECT * FROM users')
  .then (data => {    
    res.send(data);
  })
  .catch (error => {    
    console.log (error);
    res.sendStatus (404);
  });  
});

router.get('/:id', function (req, res) {  
  db.one ('SELECT * FROM users WHERE uid = $1', [req.params.id])
  .then (data => {   
    res.send(data);
  })
  .catch (error => {
    console.log (error);
    res.sendStatus (404);
  });  
});

router.put ('/', function (req, res) {
  const {login} = req.body;
  db.one('INSERT INTO users(login, registered) VALUES($1,CURRENT_TIMESTAMP) RETURNING uid', [login])
  .then(data => {
      res.send(data);
  })
  .catch(error => {
      console.log(error);
      res.sendStatus (500);
  });
});

router.post ('/:id', (req, res) => {
  const uid = req.params.id;
  const {login} = req.body;
  db.none('UPDATE users SET login = $1 WHERE uid = $2', [login, uid])
  .then(() => {
      res.send();
  })
  .catch(error => {
      console.log(error);
      res.sendStatus (500);
  });
});

router.delete('/:id', (req, res) => {  
  db.none ('DELETE FROM users WHERE uid = $1', [req.params.id])
  .then (() => {   
    res.send({});
  })
  .catch (error => {
    console.log (error);
    res.sendStatus (500);
  });  
});

module.exports = router;