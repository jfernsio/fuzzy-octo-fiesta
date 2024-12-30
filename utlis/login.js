import express from 'express';
import userLogin from '../controllers/login.js';

const loginUser = (req,res) => {
    const name = req.email;
    console.log(name)
}

export default loginUser;