const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();

router.get('/users', UserController.getUsers);
router.get('/add-user', UserController.showAddUserPage);
router.post('/agree', UserController.agreeUsers);
router.put('/update/:id', UserController.updateUser);
router.delete('/delete/:id', UserController.deleteUser);


module.exports = router;