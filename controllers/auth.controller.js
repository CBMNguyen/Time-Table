var shortid = require('shortid');
var md5 = require('md5');

var db = require('../db');

module.exports.signup = (req, res) => {
	res.render('login/signup');
}

module.exports.postSignup = (req, res) => {
	var data = {
		id: shortid.generate(),
		email:req.body.email,
		password: md5(req.body.password)
	}

	db.get('users').push(data).write();
	res.redirect('/auth/login');
}

module.exports.login = (req, res) => {
	res.render('login/login');
}

module.exports.logout = (req, res) => {
	res.clearCookie('userId');
	res.render('login/login');
}

module.exports.postLogin = (req, res) => {
	var user = db.get('users').find({email: req.body.email}).value();
	res.cookie('userId', user.id,{
		signed: true
	});
	res.redirect('/');
}
