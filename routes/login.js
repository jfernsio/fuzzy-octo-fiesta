import express from 'express';
import userLogin from '../controllers/login.js';
import loginUser from '../utlis/login.js'
const loginRoute = express.Router();

loginRoute.get('/', (req, res) => {
    return res.render('login');
});

loginRoute.post('/', userLogin,loginUser);

export default loginRoute;