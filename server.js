require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 5 * 60 * 1000,
    },
  }),
);
const authRouter = require("./routes/auth");
const authMiddleware=require('./middleware/auth');
const authBookRouter=require('./routes/authBook');
const publicBookRouter=require("./routes/publicBook");
app.use('/auth', authRouter);
app.use('/general',publicBookRouter);
app.use(authMiddleware);
app.use('/customer/auth/review',authBookRouter);
app.listen(port,()=>console.log(`The server is running at http://localhost:${port}`));