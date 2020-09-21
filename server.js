const express = require("express");

const connectDB = require("./config/db");
//routes
const users = require("./routes/users");
const auth = require("./routes/auth");
const profile = require("./routes/profile");
const posts = require("./routes/posts");

const app = express();

app.use(express.json({ extended: false }));

app.get("/", (req, res, next) => {
  console.log("API Running");
  next();
});

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
});
