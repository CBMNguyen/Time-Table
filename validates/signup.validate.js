var md5 = require('md5');

var db = require('../db');

module.exports = (req, res, next) => {
	var errors = [];
	var email = req.body.email; 

	var userEmail = db.get('users').find({email: email}).get("email").value();

	if(!req.body.email){
		errors.push('Email is require.');
	}

	if(req.body.email === userEmail){
		errors.push('Email already exists.');	
	}

	if(!req.body.password){
		errors.push('password is require.');
	}

	if(req.body.password && req.body.password.length < 8){
		errors.push('Password length is greater than eight');
	}

	if(req.body.password !== req.body.Rpassword){
		errors.push('repeat is password.');
	}

	if(errors.length){
		res.render('login/signup', {
			errors: errors,
			values: req.body
		});
		return;
	}
	res.redirect('/auth/login');
	next();
}