const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Auth_Routes = require("./routes/user");
const event_routes = require("./routes/event");
const { conndb } = require("./config/db");


const app = express();
const port = process.env.PORT || 5000;

/* -------------------- MIDDLEWARES -------------------- */
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:3000",
  "http://10.10.10.24:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (!allowedOrigins.includes(origin)) {
        return callback(new Error("CORS not allowed"), false);
      }
      callback(null, true);
    },
    credentials: true,
  })
);

/* -------------------- ROUTES -------------------- */
app.use(Auth_Routes);
app.use(event_routes);

/* -------------------- START SERVER -------------------- */
conndb()
 