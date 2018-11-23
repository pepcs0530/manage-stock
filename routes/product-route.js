// const dbconfig = require('../config/database/database.config');
const express = require('express');
const app = express();

/* app.get('/', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  req.getConnection(function (error, conn) {
    console.log('---START QUERY LIST OF MEMBER---');
    conn.query('SELECT * FROM member ORDER BY member_seq ASC', function (
      err,
      rows,
      fields
    ) {
      if (err) {
        next(err);
        console.log(err);
      } else {
        res.end(JSON.stringify(rows));
      }
    });
    console.log('---END QUERY LIST OF MEMBER---');
  });
}); */

app.post('/', function (req, res, next) {
  //console.log('req-->', req);
  //console.log('body-->', req.body);

  var condition = req.body;
  console.log('condition-->', condition);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  req.getConnection(function (error, conn) {
    console.log('---START getProductByCondition---');
    try {
      var sql = '';
      sql +=
        " SELECT r.rice_var_name, CONCAT(member_fname, ' ', member_lname) AS member, member_fname, member_lname, telephone, DATE, product_quantity ";
      sql += ' FROM product p ';
      sql += ' LEFT JOIN member m ON m.member_seq = p.member_seq ';
      sql += ' LEFT JOIN rice_varieties r ON r.rice_var_seq = p.rice_var_seq ';
      sql += ' WHERE 1=1 ';

      if (condition.productId) {
        sql += " AND product_id like '%" + condition.productId + "%' ";
      }

      if (condition.productName) {
        sql += " AND r.rice_var_name like '%" + condition.productName + "%' ";
      }

      if (condition.mfdDate) {
        sql += " AND DATE_FORMAT(mfd_date, '%Y%m%d') = '" + condition.mfdDate + "' ";
      }

      if (condition.expDate) {
        sql += " AND DATE_FORMAT(exp_date, '%Y%m%d') = '" + condition.expDate + "' ";
      }

      if (condition.memberName) {
        sql += " AND (member_fname LIKE '%" + condition.memberName + "%' OR member_lname LIKE '%" + condition.memberName + "%') ";
      }

      sql += ' ORDER BY product_seq DESC ';
      console.log('sql-->', sql);
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
    console.log('---END getProductByCondition---');
  });
});

app.get('/getProductByLotId/(:id)', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  req.getConnection(function (error, conn) {
    console.log('---START getProductByLotId---');
    conn.query(
      'SELECT rice_varieties FROM product WHERE 1=1 AND lot_id LIKE "%' +
      req.params.id +
      '%"',
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
    console.log('---END getProductByLotId---');
  });
});

app.post('/create', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  console.log('---START create---');

  console.log('body-->', req.body);

  /* console.log('lot_Id-->', { ...req.body });
  console.log('member_fname-->', req.body.member.member_fname); */

  var payload = {
    lot_id: req.body['lotId'],
    // date: new Date(req.body['date']),
    // member_fname: { ...req.body['member'] }.member_fname,
    // member_lname: { ...req.body['member'] }.member_lname,
    // member_license_place: req.body['member_license_place'],
    rice_varieties: req.body['riceVarieties'],
    mfd_date: new Date(req.body['mfdDate']),
    exp_date: new Date(req.body['expDate']),
    product_quantity: req.body['productQuantity']
  };

  console.log('payload-->', payload);
  req.getConnection(function (error, conn) {
    try {
      conn.query('INSERT INTO product SET ?', payload, function (err, result) {
        //if(err) throw err
        if (err) {
          next(err);
          console.log(err);
        } else {
          //req.flash('success', 'Data added successfully!');
          res.end();
          console.log('Data added successfully!');
          console.log('---END create---');
        }
      });
    } catch (e) {
      console.error('err thrown: ' + e.stack);
      res.sendStatus(500);
    }
  });
});

module.exports = app;
