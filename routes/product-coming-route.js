const express = require('express');
const app = express();

app.post('/create', function (req, res, next) {
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
    member_seq: { ...req.body['member']
    }.member_seq,
    rice_varieties: { ...req.body['riceVarieties']
    }.rice_var_name,
    time_in: new Date(req.body['timeIn']),
    time_out: new Date(req.body['timeOut']),
    remark: req.body['remark'],
    rice_var_seq: { ...req.body['riceVarieties']
    }.rice_var_seq
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
