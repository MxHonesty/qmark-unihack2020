if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  const path = require('path')
  const mysql = require('mysql');
  const express = require('express')
  const app = express()
  const bcrypt = require('bcrypt')
  const passport = require('passport')
  const flash = require('express-flash')
  const session = require('express-session')
  const methodOverride = require('method-override')
  const bodyParser = require('body-parser');


  app.use(bodyParser.urlencoded({extended : true}));
  app.use(bodyParser.json());
  app.set('view-engine', 'ejs')
  app.use(express.urlencoded({ extended: false }))
  app.use(flash())
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(methodOverride('_method'))
  


  var connection = mysql.createConnection({
    host     : process.env.SQL_HOST,
    user     : process.env.SQL_USER,
    password : process.env.SQL_PASS,
      database : process.env.SQL_DB
  });


  //PASSPORT SET PASSPORT SET PASSPORT SET PASSPORT SET PASSPORT SET PASSPORT SET PASSPORT SET PASSPORT SET PASSPORT SET PASSPORT SET 
  const initializePassport = require('./passport-config')
  initializePassport(
    passport,
    Getuser,
    Getuserbyid
  )
  //PASSPORT FUNCTION DATABASE           PASSPORT FUNCTION DATABASE        PASSPORT FUNCTION DATABASE         PASSPORT FUNCTION DATABASE
 function Getuser(email){
  return new Promise(function(resolve, reject) {
    connection.query('SELECT * FROM users WHERE email = ?',email, function(error, response, fields) {
       resolve(response[0]);
         });
    });
  }
  function Getuserbyid(id){
    return new Promise(function(resolve, reject) {
      connection.query('SELECT * FROM users WHERE id = ?',id, function(error, response, fields) {
         resolve(response[0]);
           });
      });
    }
  

  app.get('/', checkAuthenticated, (req, res) => {
    //console.log(users.find(user => user.email === email))
    res.render('index.ejs', { name: req.user.NUME, pass:req.user.FUNCTIE })
  })
  app.get('/newpost', checkAuthenticated, IsMaster, (req, res) => {
    //console.log(users.find(user => user.email === email))
    res.render('newpost.ejs', { nume: req.user.NUME})
  })
  app.post('/new_post', checkAuthenticated, IsMaster, (req, res) => {
    //console.log(users.find(user => user.email === email))

    const post = {
      SERVICIU:req.body.serviciu,
      AUTOR:req.user.INDX,
      PRET:req.body.pret,
      DESCRIERE:req.body.descriere
      };

      connection.query('INSERT INTO jobs SET ?', post, (err, response) => {
            if(err){ 
              res.send('a aparut o eroare!')
              throw err;}
            console.log('Last post inserted ID:', response.insertId);
            res.redirect('/')
          });
  })
  
  app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
  })
  
  app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }))
  
  app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
  })
  
  app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)

      const cont = {
        ID: Date.now().toString(),
        NUME:req.body.nume,
        PRENUME:req.body.prenume,
        FUNCTIE:req.body.functie,
        EMAIL:req.body.email,
        PAROLA:hashedPassword,
        TEL:req.body.telefon
        };

        connection.query('INSERT INTO users SET ?', cont, (err, response) => {
              if(err){ 
                throw err;
                res.redirect('/register');}
              console.log('Last insert ID:', response.insertId);
              res.redirect('/login')
            });
    } catch {
      res.redirect('/register')
    }
  })
  
  app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
  })
  
  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
  }

  function IsMaster(req, res, next) {
    if (req.user.FUNCTIE == 'M') {
      return next()
    }
  
    res.send('Nu esti mester!')
  }
  function IsMaster(req, res, next) {
    if (req.user.FUNCTIE == 'M') {
      return next()
    }
  
    res.send('Nu esti client!')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }
  
  app.listen(3000)
