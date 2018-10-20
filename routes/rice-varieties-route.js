const express = require('express');
const app = express();

app.post('/create', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  console.log('---START CREATE POST ACTION---');

  console.log('body-->', req.body);

  var payload = {
    rice_var_id: req.body['riceVarId'],
    rice_var_name: req.body['riceVarName'],
    price: req.body['price']
  };

  console.log('payload-->', payload);
  req.getConnection(function(error, conn) {
    try {
      conn.query('INSERT INTO rice_varieties SET ?', payload, function(
        err,
        result
      ) {
        //if(err) throw err
        if (err) {
          next(err);
          console.log(err);
        } else {
          res.end();
          console.log('Data added successfully!');
          console.log('---END CREATE POST ACTION---');
        }
      });
    } catch (e) {
      console.error('err thrown: ' + e.stack);
      res.sendStatus(500);
    }
  });
});

module.exports = app;
