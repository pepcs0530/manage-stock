const express = require('express');
const app = express();

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

app.post('/create', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  console.log('---START CREATE POST ACTION---');

  console.log('body-->', req.body);

  /* console.log('lot_Id-->', { ...req.body });
  console.log('member_fname-->', req.body.member.member_fname); */

  var payload = {
    lot_id: req.body['lotId'],
    date: new Date(req.body['date']),
    // member_fname: { ...req.body['member'] }.member_fname,
    // member_lname: { ...req.body['member'] }.member_lname,
    // member_license_place: req.body['member_license_place'],
    rice_varieties: req.body['riceVarieties'],
    time_in: new Date(req.body['timeIn']),
    time_out: new Date(req.body['timeOut']),
    remark: req.body['remark']
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
          console.log('---END CREATE POST ACTION---');
        }
      });
    } catch (e) {
      console.error('err thrown: ' + e.stack);
      res.sendStatus(500);
    }
  });
});

module.exports = app;
