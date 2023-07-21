const fs = require("fs");
const path = require("path");
const MysqlUserController = require("../database/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const showAddUserPage = (req, res) => {
  // Verifica si el archivo de la plantilla existe antes de renderizar
  const filePath = path.join(__dirname, '../pages/addUser.hbs');
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // Si la plantilla no existe, muestra un error
      res.status(404).send({ message: 'Página no encontrada' });
    } else {
      // Si la plantilla existe, renderízala
      res.render('addUser');
    }
  });
};

const getUsers = (req, res) => {
  console.log(req.body);
  MysqlUserController.query("SELECT * FROM users", (err, rows, fields) => {
    if (!err) {
      res.render("index", { index: rows });
    } else {
      res.status(400).send({ message: "not found users" });
    }
  });
};

const agreeUsers = async (req, res) => {
  const { id, name, email, password, city, phone } = req.body;
  const query = `INSERT INTO users(id, name, email, password, city, phone)VALUES(?, ?, ?, ?, ?, ?)`;
  const PasswordHashed = await bcrypt.hash(password, saltRounds);
  const resultado = [id, name, email, PasswordHashed, city, phone];

  try {
    const addUser = await MysqlUserController.query(query, resultado);
    if (!addUser) {
      res.status(400).send({ message: "404 bad resquest" });
    } else {
      res.status(200).json({ message: "Usuario agregado correctamente" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const updateUser = async (req, res) => {
  const { name, email, password, city, phone } = req.body;
  const UserId = req.params.id;
  const queryResultUpdate = `UPDATE users SET name = ?, email = ?, password = ?, city = ?, phone = ? WHERE id = ?`;
  const PasswordHashed = await bcrypt.hash(password, saltRounds);
  const results = [name, email, PasswordHashed, city, phone, UserId];

  try {
    const dataUpdateUser = await MysqlUserController.query(
      queryResultUpdate,
      results
    );
    if (!dataUpdateUser) {
      res.status(400).send({ status: "User not found" });
    }
    res.status(200).json({ status: "Usuario actualizado con exito" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "error" });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  const query = `DELETE FROM users WHERE id = ?`;
  const result = [userId];
  try {
    const DeleteDataUser = await MysqlUserController.query(query, result);
    if (!DeleteDataUser) {
      res.status(400).send({ status: "Bad request" });
    }
    res.status(200).json({ status: "Usuario eliminado" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ status: "Internal server error" });
  }
};

module.exports = { getUsers, agreeUsers, updateUser, deleteUser, showAddUserPage };
