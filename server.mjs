import dbConnect from "./db/dbConnect.mjs";
import express, { application } from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
import dotenv from "dotenv";
import userRegister from "./src/auth/register.mjs";
import userLogin from "./src/auth/login.mjs";
import logout from "./src/auth/logout.mjs";
import jwtAuthentification from "./middleware/verifyToken.mjs";
import cookie from "cookie-parser";
import multer from "multer";

// import profil from "./src/profil.mjs"

dotenv.config();
const upload = multer({ dest: "uploads/" });
const server = express();
dbConnect();

server.set("view engine", "ejs");

server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookie(process.env.SECRET_JWT));

// server.use(jwtAuthentification)
server.use(bodyParser.json());

server.get("/", (req, res) => {
  res.render("welcome");
});

server.get("/register", (req, res) => {
  res.render("auth/register");
});
server.post("/register", userRegister);

server.get("/login", (req, res) => {
  res.render("auth/login");
});
server.post("/login", userLogin);

server.get("/dashboard", jwtAuthentification, (req, res) => {
  const user = req.decoded;
  res.render("dashboard", {
    user: req.decoded.user.username,
  });
});


server.get("/logout", jwtAuthentification, logout);

server.listen(3000, () => {
  console.log(" server is runing");
});
