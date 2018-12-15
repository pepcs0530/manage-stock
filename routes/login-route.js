const express = require('express');
const app = express();

app.post('/checkUserProfile', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  console.log('---START checkUserProfile---');

  console.log('body-->', req.body);

  var payload = {
    username: req.body['username'],
    password: req.body['password'],
  };

  console.log('payload-->', payload);
  req.getConnection(function (error, conn) {
    try {
      var sql = " SELECT * FROM user WHERE 1=1 AND (username = ? AND password = ? )";
      conn.query(sql, [payload.username, payload.password], function (err, rows, result) {
        //if(err) throw err
        if (err) {
          next(err);
          console.log(err);
        } else {
          res.end(JSON.stringify(rows));
          console.log('---END checkUserProfile---');
        }
      });
    } catch (e) {
      console.error('err thrown: ' + e.stack);
      res.sendStatus(500);
    }
  });
});

app.get('/getUserProfileById/(:id)', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  req.getConnection(function (error, conn) {
    console.log('---START getUserProfileById---');
    try {
      conn.query(
        'SELECT * FROM user WHERE user_seq = ' +
        req.params.id +
        ' ORDER BY user_seq ASC',
        function (err, rows, fields) {
          //if(err) throw err
          if (err) {
            console.log(err);
            // req.flash('error', err);
            next(err);
          } else {
            //console.log(rows)
            res.end(JSON.stringify(rows));
          }
        }
      );
    } catch (e) {
      console.error('err thrown: ' + e.stack);
      res.sendStatus(500);
    }
    console.log('---END getUserProfileById---');
  });
});

module.exports = app;
