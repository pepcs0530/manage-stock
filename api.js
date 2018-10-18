/* โหลด Express มาใช้งาน */
var app = require('express')();

/* โหลด MySql มาใช้งาน */
var mysql = require('mysql');

/* ใช้ port 4501 หรือจะส่งเข้ามาตอนรัน app ก็ได้ */
var port = process.env.PORT || 4501;

/* Routing */
app.get('/', function(req, res) {
  res.send('<h1>Hello Node.js</h1>');
});
app.get('/index', function(req, res) {
  res.send('<h1>This is index page</h1>');
});

/**
 * body-parser module is used to read HTTP POST data
 * it's an express middleware that reads form's input
 * and store it as javascript object
 */

var bodyParser = require('body-parser');
/**
 * bodyParser.urlencoded() parses the text as URL encoded data
 * (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body.
 */

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text({ defaultCharset: 'utf-8' }));

/* สั่งให้ server ทำการรัน Web Server ด้วย port ที่เรากำหนด */
app.listen(port, function() {
  console.log('Starting node.js on port ' + port);
});

/**
 * This middleware provides a consistent API
 * for MySQL connections during request/response life cycle
 */

var myConnection = require('express-myconnection');
/**
 * Store database credentials in a separate config.js file
 * Load the file/module and its values
 */

// var config = require('./config/database/database.config');
/* var dbOptions = {
  host: config.database.host,
  user: config.database.username,
  password: config.database.password,
  port: config.database.port,
  database: config.database.databasename
}; */
var dbOptions = {
  host: 'db4free.net',
  user: 'managestock',
  password: 'P@ssw0rd2018',
  port: 3306,
  database: 'db_managestock'
};
/**
 * 3 strategies can be used
 * single: Creates single database connection which is never closed.
 * pool: Creates pool of connections. Connection is auto release when response ends.
 * request: Creates new connection per new request. Connection is auto close when response ends.
 */

app.use(myConnection(mysql, dbOptions, 'pool'));

//routes
const route = require('./routes/api');
const memberRoute = require('./routes/member-route');
const productRoute = require('./routes/product-route');
const addProductComing = require('./routes/add-product-coming-route');
app.set('view engine', 'ejs');
app.use('/api', route);
app.use('/api/member', memberRoute);
app.use('/api/product', productRoute);
app.use('/api/addProductComing', addProductComing);

//Access-Control-Allow-Origin is a response header, not a request header you need to fix the permission in your backend. so you must create cors.js file that contains all necessary permissions.
var cors2 = require('./cors');
app.use(cors2.permission);
