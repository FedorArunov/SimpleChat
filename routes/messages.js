const express = require('express');
const router = express.Router();
const db = require ('./db.js');

router.get('/', (req, res) => {  
  db.any ('SELECT * FROM messages')
  .then (data => {    
    res.send(data);
  })
  .catch (error => {    
    console.log (error);
    res.sendStatus (404);
  });  
});

router.get('/:id', (req, res) => {  
  db.one ('SELECT * FROM messages WHERE uid = $1', [req.params.id])
  .then (data => {   
    res.send(data);
  })
  .catch (error => {
    console.log (error);
    res.sendStatus (404);
  });  
});

router.put ('/', (req, res) => {
  const {author, content} = req.body;
  db.one('INSERT INTO messages(author, updated, content) VALUES($1,CURRENT_TIMESTAMP,$2) RETURNING uid', [author, content])
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
  const {content} = req.body;
  db.none('UPDATE messages SET content = $1 WHERE uid = $2', [content, uid])
  .then(() => {
      res.send();
  })
  .catch(error => {
      console.log(error);
      res.sendStatus (500);
  });
});

router.delete('/:id', (req, res) => {  
  db.none ('DELETE FROM messages WHERE uid = $1', [req.params.id])
  .then (() => {   
    res.send({});
  })
  .catch (error => {
    console.log (error);
    res.sendStatus (500);
  });  
});

module.exports = router;