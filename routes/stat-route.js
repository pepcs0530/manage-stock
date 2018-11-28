const express = require('express');
const app = express();

app.get('/getStatRiceVarietiesByCondition/(:yyyymm)', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  req.getConnection(function (error, conn) {
    console.log('---START getStatRiceVarietiesByCondition---');
    conn.query(
      ' SELECT r.rice_var_name, SUM(oi.quantity) AS quantity ' +
      ' FROM order_item oi ' +
      ' INNER JOIN product p ON p.product_seq = oi.product_seq ' +
      ' INNER JOIN `order` o ON o.order_id = oi.order_id ' +
      ' INNER JOIN customer c ON c.customer_id = o.customer_id ' +
      ' INNER JOIN rice_varieties r ON r.rice_var_seq = p.rice_var_seq ' +
      ' WHERE 1=1 ' +
      ' AND DATE_FORMAT(issuedate, "%Y%m") + 54300 = ' + req.params.yyyymm +
      ' GROUP BY r.rice_var_seq ',
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
    console.log('---END getStatRiceVarietiesByCondition---');
  });
});

module.exports = app;
