var md5 = require('md5');

var db = require('../db');

module.exports = (req, res, next) => {
	var email = req.body.email;
	var password = md5(req.body.password);
    var errors = [];
	var user = db.get('users').find({email: email}).value();
	
	if(!email){
		errors.push('Email is require.');
	}

	if(!req.body.password){
		errors.push('Password is require.');
	}

	if(errors.length){
		res.render('login/login', {
			errors: errors
		});
		return;
	}

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
	next();
}