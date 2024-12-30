import express from 'express';
import logoutUser from "../utlis/logout.js"

const logoutRoute = express.Router()

logoutRoute.get('/',logoutUser)

export default logoutRoute;