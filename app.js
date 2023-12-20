const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const usersRouter = require('./routes/users');
const productRouter = require('./routes/productRouter')
const mongoose = require('mongoose')
const session = require ('express-session')
const dotenv = require ('dotenv')
dotenv.config();

const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME
URL = `mongodb+srv://santiagoacu99:${DB_PASSWORD}@cluster0.e6szesj.mongodb.net/${DB_NAME}`
console.log(URL);


const conexion = mongoose.connect(URL);
    
conexion.then(() => {
    console.log('Base de datos conectada');
}).catch((err) => {
    console.log(err);
}); 
const app = express();

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: 'mi-clave',
  resave: false, 
  saveUninitialized: false
}))


app.use('/users', usersRouter);
app.use('/product', productRouter );
app.get('/' ,(req,res)=>{
    res.send('hola mundo')
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
