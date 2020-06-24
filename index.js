var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
					 require('dotenv').config();

var loginMiddleWare = require('./middlewares/login.middleware');

var app = express();
var port = 8080;

var authRouter = require('./Routers/auth.router');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SESSION_SECRETS));

app.use('/auth', authRouter);

app.get('/home',loginMiddleWare, (req, res) => {
	res.render('home/home')
});
app.listen(port, () => console.log('start server completed!'));