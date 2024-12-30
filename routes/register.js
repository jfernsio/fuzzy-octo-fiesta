import express from 'express';
import userRegister from '../controllers/register.js';
import basicAuth from "../middlewear/basicAuth.js";

const registerRoute = express.Router();

registerRoute.get('/', (req, res) => {
    return res.render('register');
});

registerRoute.post('/', basicAuth, userRegister);

export default registerRoute;