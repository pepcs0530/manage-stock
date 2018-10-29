// const dbconfig = require('../config/database/database.config');
const express = require('express');
const app = express();

// SHOW LIST OF MEMBER
app.get('/', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  req.getConnection(function(error, conn) {
    console.log('---START QUERY LIST OF MEMBER---');
    conn.query('SELECT * FROM member ORDER BY member_seq ASC', function(
      err,
      rows,
      fields
    ) {
      //if(err) throw err
      if (err) {
        console.log(err);
        req.flash('error', err);
      } else {
        //console.log(rows)
        res.end(JSON.stringify(rows));
      }
    });
    console.log('---END QUERY LIST OF MEMBER---');
  });
});

app.get('/getProductByLotId/(:id)', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  req.getConnection(function(error, conn) {
    console.log('---START getProductByLotId---');
    conn.query(
      'SELECT rice_varieties FROM product WHERE 1=1 AND lot_id LIKE "%' +
        req.params.id +
        '%"',
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
    console.log('---END getProductByLotId---');
  });
});

app.post('/create', function(req, res, next) {
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
  req.getConnection(function(error, conn) {
    try {
      conn.query('INSERT INTO product SET ?', payload, function(err, result) {
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
