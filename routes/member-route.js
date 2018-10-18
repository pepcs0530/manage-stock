// const dbconfig = require('../config/database/database.config');
const express = require('express');
const app = express();

// SHOW LIST OF MEMBER
app.get('/', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  req.getConnection(function(error, conn) {
    console.log('---START QUERY LIST OF MEMBER---');
    try {
      conn.query(
        'SELECT member_seq, member_id, concat(member_fname, " ", member_lname) as member_name, member_license_place, telephone, address  FROM member ORDER BY member_seq ASC',
        function(err, rows, fields) {
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
    console.log('---END QUERY LIST OF MEMBER---');
  });
});

app.post('/', function(req, res, next) {
  console.log('req-->', req);
  console.log('body-->', req.body);

  /* var condition = req
    .sanitize('keyword')
    .escape()
    .trim(); */

  var condition = req.body['keyword'];
  console.log('condition-->', condition);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  req.getConnection(function(error, conn) {
    console.log('---START QUERY MEMBER BY CONDITION---');
    try {
      var sql = '';
      sql +=
        " SELECT member_seq, member_id, member_fname, member_lname, concat(member_fname, ' ', member_lname) as member_name, member_license_place, telephone, address ";
      sql += ' FROM member ';
      sql += ' WHERE 1=1 ';
      sql +=
        " AND (member_fname like '%" +
        condition +
        "%' or member_lname like '%" +
        condition +
        "%') ";
      sql += ' ORDER BY member_seq ASC ';
      conn.query(sql, function(err, rows, fields) {
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
    console.log('---END QUERY MEMBER BY CONDITION---');
  });
});

module.exports = app;
