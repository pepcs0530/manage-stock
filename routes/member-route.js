// const dbconfig = require('../config/database/database.config');
const express = require('express');
const async = require('async');
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

app.post('/addmember',function(req,res,next){
  var LOG_NAME = '/addmember'
  async.waterfall([
    function getConnection(callback){
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-Type', 'application/json');
      req.getConnection(function(err,conn){
        console.log(LOG_NAME,"DB Connected.")
        callback(err,conn)
      })
    },
    function  genNextMemberId(conn,callback){
      var sql = 'SELECT member_seq FROM member ORDER BY member_seq DESC LIMIT 1';
      conn.query(sql,function(err, rows, fields) {
        if(err){
          callback(err)
        }else{
          var nextMemberSeq = rows[0]['member_seq']+1
          req.body.member_id = nextMemberSeq.toString().padStart(5,'0');
          console.log(LOG_NAME,"member ID generated.")
          callback(null,conn)
        }
      });
    },
    function insertMember(conn,callback){
      var data = req.body
      var sql = `INSERT INTO member (member_id,member_fname,member_lname,member_license_place,telephone,address) VALUES ('${data.member_id}', '${data.member_fname}', '${data.member_lname}', '${data.member_license_place}', '${data.telephone}', '${data.address}')`
      console.log(sql)
      conn.query(sql,function(err,result){
        if(err){
          callback(err)
        }else{
          console.log(LOG_NAME,"Affected rows:"+result.affectedRows)
        }
      })
    }

  ],
  function (err,result){
    if(err){
      console.log('ERROR',err)
      res.status(500).end()
    }else{
      res.end()
    }
  })
})
module.exports = app;
