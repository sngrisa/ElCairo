var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var equipoRouter = require('./routes/equipo');
var equipoAPIRouter = require('./routes/api/equipos');
var usuariosAPIRouter = require('./routes/api/usuarios');
var usuariosRouter = require('./routes/usuarios');
var tokenRouter = require('./routes/token');

var app = express();

// Conexion con base de datos Mongo DB mediante Mongoose

const mongoose = require('mongoose');
var mongodb='mongodb://localhost/equipos';
mongoose.connect(mongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error al conectarse con la base de datos de MongoDB'));
db.once('open', function() {
  console.log('Conectado a base de datos de MongoDB, conexion exitosa');
 // estamos conectados!
}); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/equipos', equipoRouter);
app.use('/api/equipos', equipoAPIRouter);
app.use('/api/usuarios', usuariosAPIRouter);
app.use('/usuarios', usuariosRouter);
app.use('/token', tokenRouter);

//Handle Routes from app.js
app.get('/login', (req, res)=>{
  res.render('session/login')
})

app.post('/login', (req, res, next)=> {
  //method of passport
  passport.authenticate('local', (err, user, info)=>{
    //if there is a error
    if(err) return next(err);
    //if there is not a user , we render login and pass info
    if(!usuario) return res.render('session/login', {info});
    req.logIn(usuario, err =>{
      if(err) return next(err);
      //if everthing is ok redirect to home
      return res.redirect('/');
    });
  }) (req, res, next);
})

app.get('/logout', (req, res)=>{
  req.logOut() //clean the session
  res.redirect('/')
})


app.get('/forgotPassword', (req, res)=>{
  res.render('session/forgotPassword')
})

app.post('/forgotPassword', (req, res)=>{
  Usuario.findOne({email: req.body.email}, (err, usuario)=>{
    if(!usuario) return res.render('session/forgotPassword', {info: {message: 'No existe la clave'}});
    
    usuario.resetPassword(err=>{
      if(err) return next(err);
      console.log('session/forgotPasswordMessage');
    })
    res.render('session/forgotPasswordMessage')
  })
})

app.get('/resetPassword/:token', (req, res, next)=>{
  Token.findOne({token: req.params.token}, (err, token)=>{
    if(!token) return res.status(400).send({type: 'not-verified', msg: 'No existe una clave así'})

    Usuario.findById(token._userId, (err, usuario)=>{
      if(!usuario) return res.status(400).send({msg: 'No existe un usuario asociado a este password'});
      res.render('session/resetPassword', {errors: {}, usuario: usuario})
    })
  })
})

app.post('/resetPassword', (req, res)=>{
  if(req.body.password != req.body.confirm_password) {
    res.render('session/resetPassword', {errors: {confirm_password: {message: 'No coinciden las contraseñas'}}});
    return;
  }
  Usuario.findOne({email: req.body.email}, (err, usuario)=>{
    usuario.password = req.body.password;
    usuario.save(err=>{
      if(err){
        res.render('session/resetPassword', {errors: err.errors, usuario: new Usuario});
      } else {
        res.redirect('/login')
      }
    })
  })
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
