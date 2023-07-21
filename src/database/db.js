const mysql = require('mysql');

const MysqlConexion = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'hbs',
});

MysqlConexion.connect(function (err) {
  if (err) {
    console.log(err);
    return
  } else {
    console.log("Conectado a la base de datos");
  }
});


module.exports = MysqlConexion;