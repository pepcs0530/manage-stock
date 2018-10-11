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

/* var config = {
  database: {
    host: 'db4free.net', // database host
    username: 'managestock', // your database username
    password: 'P@ssw0rd2018', // your database password
    port: 3306, // default MySQL port
    databasename: 'db_managestock' // your database name
  }
};

module.exports = config; */

export class DatabaseConfig {
  // database: {
    host: 'db4free.net'; // database host
    username: 'managestock'; // your database username
    password: 'P@ssw0rd2018'; // your database password
    port: 3306; // default MySQL port
    databasename: 'db_managestock'; // your database name
  // };
}
