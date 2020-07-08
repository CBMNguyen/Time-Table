var db = require('../db');
module.exports = (req, res, next) =>{
	
	var userId = req.signedCookies.userId;
	var user = db.get('users').find({id: userId}).value();

	if(!userId){
		res.redirect('/auth/login');
		return;
	}

	if(!user){
		res.redirect('/auth/login');
		return;
	}
	res.locals.user = user;
	next();
}