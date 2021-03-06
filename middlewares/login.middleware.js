var db = require('../db');
module.exports = (req, res, next) =>{
	
	var userId = req.signedCookies.userId;
	var user = db.get('users').find({id: userId}).value();
	var name = [];
	if(user)
		name = user.email.split('@');

	if(!userId){
		res.redirect('/auth/login');
		return;
	}

	if(!user){
		res.redirect('/auth/login');
		return;
	}
	if(name.length)
		res.locals.user = name[0].toUpperCase();
	next();
}