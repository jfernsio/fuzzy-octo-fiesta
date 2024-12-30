import express from "express";
import { createBlog, getBlog } from "../controllers/blog.js";

import checkForAuthCookie from "../middlewear/auth.js";
import blogs from "../models/blogModel.js";
const blogRouter = express.Router();
const getBlogRouter = express.Router();


blogRouter.get("/", (req, res) => {
  return res.render("blog",{
    user:req.user
  });
});



blogRouter.post("/",createBlog);



export { blogRouter, getBlogRouter };


