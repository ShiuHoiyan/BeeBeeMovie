const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const user = require('./routes/user');
const movie = require('./routes/movie');
const index = require('./routes/index');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.listen(3000,() => {
    console.log('server is listening on port 3000.');
})

app.use('/movie', movie);
app.use('/user', user);
app.use('/', index);

app.get('/__webpack_hmr', function(req, res) {
  res.send('')
});

app.get('/logout', (req, res) => {
  res.clearCookie('JSSESION');
  res.send('退出成功');
});

app.post('/Login', (req, res) => {
    //check whether the password valid here
    console.log('登陆请求： '+req);
    res.cookie('JSSESION', req.body.email, {maxAge:8640000000});
    res.status(200);
    res.send();
});


app.post('/checkemail', (req,res) => {
  res.status(200);
  res.send('false');
});

app.post('/register', (req, res) => {
	res.status(200);
	res.send();
})


module.exports = app;