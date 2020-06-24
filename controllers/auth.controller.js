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

module.exports.postLogin = (req, res) => {
	var email = req.body.email;
	var password = md5(req.body.password);

	var user = db.get('users').find({email: email}).value();

	if(!user){
		errors = [
			'User is not exist.'
		],
		res.render('login/login', {
			errors: errors,
			values: req.body
		})
		return;
	}

	if(user.password !== password){
		errors = [
			'Wrong password.'
		],
		res.render('login/login', {
			errors: errors,
			values: req.body
		})
		return;
	}

	res.cookie('userId', user.id,{
		signed: true
	});
	res.redirect('/home');
}


module.exports.login = (req, res) => {
	res.render('login/login');
}
