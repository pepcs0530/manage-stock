/* const DatabaseConfig = {
  host: 'sql12.freemysqlhosting.net',
  databasename: 'sql12258397',
  username: 'sql12258397',
  password: 'FKh4CHuQwD',
  port: 3306
};

export function databaseConfigProvider() {
  return DatabaseConfig;
} */

var config = {
  database: {
    host: 'sql12.freemysqlhosting.net', // database host
    username: 'sql12258397', // your database username
    password: 'FKh4CHuQwD', // your database password
    port: 3306, // default MySQL port
    databasename: 'sql12258397' // your database name
  }
  /* server: {
		host: '0.0.0.0',
		port: '4001'
	},
	report: {
		host: '0.0.0.0',
		port: '5488'
	} */
};

module.exports = config;
