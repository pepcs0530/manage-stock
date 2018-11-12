const express = require('express');
const app = express();

app.post('/create', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  console.log('---START CREATE POST ACTION---');

  console.log('body-->', req.body);

  var payload = {
    rice_var_id: req.body['riceVarId'],
    rice_var_name: req.body['riceVarName'],
    price: req.body['price']
  };

  console.log('payload-->', payload);
  req.getConnection(function(error, conn) {
    try {
      conn.query('INSERT INTO rice_varieties SET ?', payload, function(
        err,
        result
      ) {
        //if(err) throw err
        if (err) {
          next(err);
          console.log(err);
        } else {
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

app.post('/add', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  console.log('---START add---');

  console.log('body-->', req.body);

  var payload = {
    rice_var_id: req.body['riceVarId'],
    rice_var_name: req.body['riceVarName'],
    price: req.body['price']
  };

  console.log('payload-->', payload);
  req.getConnection(function(error, conn) {
    try {
      conn.query('INSERT INTO rice_varieties SET ?', payload, function(
        err,
        result
      ) {
        //if(err) throw err
        if (err) {
          next(err);
          console.log(err);
        } else {
          res.end();
          console.log('Data added successfully!');
          console.log('---END add---');
        }
      });
    } catch (e) {
      console.error('err thrown: ' + e.stack);
      res.sendStatus(500);
    }
  });
});

app.put('/edit/(:id)', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  console.log('---START edit---');

  console.log('body-->', req.body);

  var payload = {
    // rice_var_seq: req.body['riceVarSeq'],
    rice_var_id: req.body['riceVarId'],
    rice_var_name: req.body['riceVarName'],
    price: req.body['price']
  };

  console.log('payload-->', payload);
  req.getConnection(function(error, conn) {
    try {
      conn.query(
        'UPDATE rice_varieties SET ? WHERE rice_var_seq = ' + req.params.id,
        payload,
        function(err, result) {
          //if(err) throw err
          if (err) {
            next(err);
            console.log(err);
          } else {
            res.end();
            console.log('Data updated successfully!');
            console.log('---END edit---');
          }
        }
      );
    } catch (e) {
      console.error('err thrown: ' + e.stack);
      res.sendStatus(500);
    }
  });
});

app.post('/getRiceVarietiesByCondition', function(req, res, next) {
  /* console.log('req-->', req);
  console.log('body-->', req.body); */
  var condition = req.body;
  console.log('condition-->', condition);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  req.getConnection(function(error, conn) {
    console.log('---START getRiceVarietiesByCondition---');
    try {
      var sql = '';
      sql += ' SELECT * ';
      sql += ' FROM rice_varieties ';
      sql += ' WHERE 1=1 ';

      if (condition.keyword != undefined) {
        sql +=
          " AND (rice_var_id like '%" +
          condition.keyword +
          "%' OR rice_var_name like '%" +
          condition.keyword +
          "%') ";
      }

      sql += ' ORDER BY rice_var_seq DESC ';
      console.error('sql: ', sql);
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
    console.log('---END getRiceVarietiesByCondition---');
  });
});

app.delete('/deleteById/(:id)', function(req, res, next) {
  console.log('---START deleteById---');

  // var rfid = { rfid_gen: req.params.id }

  req.getConnection(function(error, conn) {
    conn.query(
      'DELETE FROM rice_varieties WHERE rice_var_seq = ' + req.params.id,
      null,
      function(err, result) {
        if (err) {
          console.log(err);
          next(err);
        } else {
          res.end();
          console.log('---END deleteById---');
        }
      }
    );
  });
});

app.get('/getRiceVarietieById/(:id)', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  req.getConnection(function(error, conn) {
    console.log('---START getRiceVarietieById---');
    try {
      conn.query(
        'SELECT * FROM rice_varieties WHERE rice_var_seq = ' +
          req.params.id +
          ' ORDER BY rice_var_seq ASC',
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
      console.error('err thrown: ', e.stack);
      res.sendStatus(500);
    }
    console.log('---END getRiceVarietieById---');
  });
});

module.exports = app;
