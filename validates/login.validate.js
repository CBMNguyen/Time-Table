var md5 = require('md5');

var db = require('../db');

module.exports = (req, res, next) => {
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
	next();
}