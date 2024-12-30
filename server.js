import express, { urlencoded } from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import { connectToDb } from "./config/connection.js";
import registerRoute from "./routes/register.js";
import loginRoute from "./routes/login.js";
import cookieParser from "cookie-parser";
import checkForAuthCookie from "./middlewear/auth.js";
import logoutRoute from "./routes/logout.js";
import { blogRouter, getBlogRouter } from "./routes/blog.js";
import blogs from "./models/blogModel.js";
import { getBlog } from "./controllers/blog.js";
import commentRouter from "./routes/comment.js";
import comments from "./models/comntsModel.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
connectToDb();
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.static(`${__dirname}/public`));

const staticPath = path.join(__dirname, "public");
app.use(express.static(staticPath));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(checkForAuthCookie("token"));

app.get("/", async (req, res) => {
  const blog = await blogs.find({}).populate("createdBy");
  res.render("home", {
    user: req.user,
    blog,
  });
});

app.use("/auth/register", registerRoute);
app.use("/auth/login", loginRoute);
app.use("/logout", logoutRoute);

app.use("/postBlog", blogRouter);

app.use("/blog", blogRouter);
app.get("/blog/:blogId", async (req, res) => {
  const blogId = req.params.blogId;
  try {
    const blog = await blogs.findById(blogId).populate("createdBy");
    const comment = await comments.find({blog: blogId}).populate("createdBy");
    console.log(comment)
    if (!blog) {
      return res.status(404).send("Blog not found");
    }
    res.render("viewBlogs", { user: req.user, blog, comment });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/blog/comment/:blogId", async (req, res) => {
  const { comment } = req.body;
  const id = req.params.blogId;
  console.log(id);
  try {
    const saveComment = new comments({
      comment: comment,
      createdBy: req.user._id,
      blog:id
    });
    // console.log(`comment : ${saveComment}`);
    await saveComment.save()
    res.status(201).redirect(`/blog/${id}`);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(`error while adding a comment ${error}`);
  }
});


app.listen(process.env.PORT, () => {
  console.log(`Server Started at Port ${process.env.PORT}`);
});
