require('dotenv').config();
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const { validateRequest } = require('./middlewares/authentications');

const Blog = require('./models/blog')

const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');


const app = express();
const port =  process.env.PORT || 8000;
 

mongoose
 .connect('mongodb://127.0.0.1:27017/blogapp')
  // .connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('Connection error', err));


app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'))

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(validateRequest('token'))
app.use(express.json());
app.use(express.static(path.resolve("./public")))

app.get('/', async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render('home', {
    user: req.user, 
    blogs: allBlogs,
     
  })
})

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(port, () => {
  console.log(`Server on ${port}`);
})
