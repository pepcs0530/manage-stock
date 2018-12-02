const express = require('express');
const app = express();

app.get('/getCustomerListByProductSeq/(:id)', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  req.getConnection(function (error, conn) {
    console.log('---START getCustomerListByProductSeq---');
    conn.query(
      ' SELECT * ' +
      ' FROM order_item oi ' +
      ' INNER JOIN product p ON p.product_seq = oi.product_seq ' +
      ' INNER JOIN `order` o ON o.order_id = oi.order_id ' +
      ' INNER JOIN customer c ON c.customer_id = o.customer_id ' +
      // ' INNER JOIN member m ON m.member_seq = o.member_seq ' +
      ' WHERE 1=1 ' +
      ' AND oi.product_seq = ' +
      req.params.id,
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
    console.log('---END getCustomerListByProductSeq---');
  });
});

module.exports = app;
