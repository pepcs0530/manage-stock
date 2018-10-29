const express = require('express');
const app = express();

app.get('/', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  req.getConnection(function(error, conn) {
    console.log('---START getNotification---');
    conn.query(
      'SELECT * FROM product WHERE 1=1 AND DATEDIFF(exp_date, NOW()) < 30 ORDER BY product_seq DESC',
      function(err, rows, fields) {
        //if(err) throw err
        if (err) {
          console.log(err);
          req.flash('error', err);
        } else {
          //console.log(rows)
          res.end(JSON.stringify(rows));
        }
      }
    );
    console.log('---END getNotification---');
  });
});

module.exports = app;
