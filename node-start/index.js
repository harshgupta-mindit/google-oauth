// const express = require("express");
// const { sendInvoice } = require("./functions/createInvoice");
// const app = express();

// app.get("/invoice", sendInvoice);

// app.get("/", (request, response)=> {
//     response.send("Test server running");
// })

// app.listen(4002, ()=> {
//     console.log("SERVER IS RUNNING ON PORT 4002");
// })

// app.get("/auth", (request, response)=> {
//     console.log("=================");
//     response.send("auth route")
// })




//-----------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------

// server.js
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// const corsOptions = {
//     origin: 'http://localhost:5173', // Only allow requests from this origin
//     methods: 'GET,POST', // Only allow these methods
//     optionsSuccessStatus: 200 // Some legacy browsers choke on 204
//   };
//   app.use(cors(corsOptions));
  
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // Allow requests from specific origin and enable credentials

// Middleware
app.use(express.json());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport session setup
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

// Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4002/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // You can store the accessToken in your frontend
    return done(null, profile);
  }
));

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'Unauthorized' });
};
// Middleware to check token and authenticate user
const authenticateToken = (req, res, next) => {
    console.log("req-header", req.headers);
    const authHeader = req.headers['authorization'];
    console.log("authHeader",authHeader);
    // const token = authHeader && authHeader.split(',')[1];
    const token = authHeader;
    console.log(token);
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, 'your-secret-key', (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };

// Google OAuth Route
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, generate token and send it to the client
    const token = jwt.sign({ userId: req.user.id, data: req.user }, 'your-secret-key', { expiresIn: '1h' });
    res.json({ token });
    // Successful authentication, redirect to frontend route with token or other relevant data
    // res.redirect('http://localhost:5173/profile');
  });

// Profile Route (requires authentication)
app.get('/profile', authenticateToken, (req, res) => {
    // Access authenticated user's profile information
    console.log("requested User", req.user);
    res.json(req.user);
});

// Start server
app.listen(4002, () => {
  console.log('Server is running on port 4002');
});
