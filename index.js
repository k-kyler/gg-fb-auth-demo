// Require variables from .env
require("dotenv").config();

// Initial express
const express = require("express");

// Initial cookie-parser
const cookieParser = require("cookie-parser");

// Initial express flash
const flash = require("express-flash");

// Initial express session
const session = require("express-session");

// Require routes
const authRoute = require("./routes/auth.route");
const weatherRoute = require("./routes/weather.route");

// Require custom middlewares
const authMiddleware = require("./middlewares/auth.middleware");
const isAuthMiddleware = require("./middlewares/isAuth.middleware");

// App setup
const app = express();
const port = process.env.PORT || 5555;

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.static("public"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

// Default app endpoint
app.get("/", (req, res) => {
    if (req.signedCookies.userData) {
        res.render("weather", {
            userData: req.signedCookies.userData,
        });
    } else {
        res.redirect("/signin");
    }
});

// User sign out endpoint
app.get("/signout", (req, res) => {
    res.clearCookie("userData");
    res.clearCookie("googleIdToken");
    res.redirect("/signin");
});

// Use routes
app.use("/", isAuthMiddleware.preventWhenLogged, authRoute);
app.use("/", authMiddleware.requireAuth, weatherRoute);

// Server listen
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
