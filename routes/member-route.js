// const dbconfig = require('../config/database/database.config');
const express = require('express');
const app = express();

// SHOW LIST OF MEMBER
app.get('/', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  req.getConnection(function(error, conn) {
    console.log('---START QUERY LIST OF MEMBER---');
    conn.query(
      'SELECT member_seq, member_id, concat(member_fname, member_lname) as member_name, member_license_place, telephone  FROM member ORDER BY member_seq ASC',
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
    console.log('---END QUERY LIST OF MEMBER---');
  });
});

module.exports = app;
