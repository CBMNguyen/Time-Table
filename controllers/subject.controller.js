var shortid = require('shortid');
var db = require('../db');

module.exports.create = (req, res) => {
	res.render('subject/create');
}

module.exports.postCreate = (req, res) => {
	req.body.id = shortid.generate();
	req.body.news = [];
	req.body.amount = 0;
	db.get('subject').push(req.body).write();
	res.redirect('/');
}

module.exports.view = (req, res) => {
	id = req.params.id;
	var subject = db.get('subject').find({id: id}).value();
	res.render('subject/view', {
		subject: subject
	});
}

module.exports.viewCreate = (req, res) => {
	res.render('subject/viewCreate');
}

module.exports.viewPostCreate = (req, res) => {
	var id = req.params.id;

	var today = new Date();
	var time =today.getHours() +"h:"+ today.getMinutes()+"p";
	var date = today.getDate() +"/"+ (today.getMonth()+ 1) +"/"+ today.getFullYear();

	req.body.date = time + " " + date;
	req.body.notes = req.body.notes.split('\r\n'||'\r\n\r\n'); 

	db.get('subject').find({id: id}).get('news').push(req.body).write();

	var count = db.get('subject').find({id: id}).get('amount').value();
				db.get('subject').find({id: id}).set('amount', count + 1).write();

	res.redirect('/subject/'+id);
} 

