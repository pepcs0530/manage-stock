const express = require('express');
const app = express();

app.get('/', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  req.getConnection(function (error, conn) {
    console.log('---START getNotification---');
    conn.query(
      'SELECT * FROM product WHERE 1=1 AND DATEDIFF(exp_date, NOW()) < 30 ORDER BY exp_date, product_quantity ASC',
      function (err, rows, fields) {
        //if(err) throw err
        if (err) {
          next(err);
          console.log(err);
        } else {
          //console.log(rows)
          res.end(JSON.stringify(rows));
        }
      }
    );
    console.log('---END getNotification---');
  });
});

app.post('/getNotificationByCondition', function (req, res, next) {
  /* console.log('req-->', req);
  console.log('body-->', req.body); */
  var condition = req.body;
  console.log('condition-->', condition);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  req.getConnection(function (error, conn) {
    console.log('---START getNotificationByCondition---');
    try {
      var sql = '';
      sql += ' SELECT * ';
      sql += ' FROM product ';
      sql += ' WHERE 1=1 ';
      sql += ' AND DATEDIFF(exp_date, NOW()) < 30 ';

      if (condition.keyword != undefined) {
        sql +=
          " AND (lot_id like '%" +
          condition.keyword +
          "%' or product_name like '%" +
          condition.keyword +
          "%') ";
      }

      sql += ' ORDER BY exp_date, product_quantity ASC ';
      console.error('sql: ', sql);
      conn.query(sql, function (err, rows, fields) {
        //if(err) throw err
        if (err) {
          console.log(err);
          // req.flash('error', err);
          next(err);
        } else {
          //console.log(rows)
          res.end(JSON.stringify(rows));
        }
      });
    } catch (e) {
      console.error('err thrown: ' + e.stack);
      res.sendStatus(500);
    }
    console.log('---END getNotificationByCondition---');
  });
});

module.exports = app;
