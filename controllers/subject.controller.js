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
	var page = parseInt(req.query.page) || 1;
	var perPage = 1;
	var start = (page - 1) * perPage;
	var end = page * perPage;

	var subject = db.get('subject').find({id: id}).value();
	var news = db.get('subject').find({id: id}).get("news").slice(start, end).value();

	var pageRevious;
		if(page === 1){
			pageRevious =1;
		}else{
			pageRevious = page - 1;
		}


	var pageNext = 1;
	if(page === db.get('subject').find({id: id}).get("news").value().length){
		pageNext = db.get('subject').find({id: id}).get("news").value().length
	}else if(db.get('subject').find({id: id}).get("news").value().length){
		pageNext = page + 1;
	}

	res.render('subject/view', {
		News: news,
		subject: subject,
		id: id,
		pageRevious: pageRevious,
		pageNext: pageNext
	});
}

module.exports.viewCreate = (req, res) => {
	res.render('subject/viewCreate');
}

module.exports.viewPostCreate = (req, res) => {
	var id = req.params.id;

	var today = new Date();
	var time =today.getHours() +"h:"+ today.getMinutes()+"m";
	var date = today.getDate() +"-"+ (today.getMonth()+ 1) +"-"+ today.getFullYear();

	req.body.date = time + " " + date;
	req.body.notes = req.body.notes.split('\r\n'||'\r\n\r\n'); 

	db.get('subject').find({id: id}).get('news').push(req.body).write();

	var count = db.get('subject').find({id: id}).get('amount').value();
				db.get('subject').find({id: id}).set('amount', count + 1).write();

	res.redirect('/subject/'+id);
} 


module.exports.remove = (req, res) => {
	var id = req.params.id.split('+').slice(0,1).join('');
	var date = req.params.id.split('+').slice(1).join('');

	db.get('subject').find({id: id}).get('news').remove({date: date}).write();
	var count = db.get('subject').find({id: id}).get('amount').value();
				db.get('subject').find({id: id}).set('amount', count - 1).write();
	res.redirect('/subject/'+ id); 
}

module.exports.edit = (req, res) => {
	var id = req.params.id.split('+').slice(0,1).join('');
	var date = req.params.id.split('+').slice(1).join('');

	var value = db.get('subject').find({id: id}).get('news').find({date: date}).value();

	res.render('subject/viewCreate',{
		heading: (value.heading) ? (value.heading) : "",
		notes: (value.notes) ? value.notes.join('\r\n'||'\r\n\r\n') : "",
		link: value.link ? value.link : ""
	});
}

module.exports.postEdit= (req, res)=>{
	var today = new Date();
	var time =today.getHours() +"h:"+ today.getMinutes()+"m";
	var date = today.getDate() +"-"+ (today.getMonth()+ 1) +"-"+ today.getFullYear();

	req.body.date ="Fixed: " + time + " " + date;
	req.body.notes = req.body.notes.split('\r\n'||'\r\n\r\n');

	var id = req.params.id.split('+').slice(0,1).join('');
	var date = req.params.id.split('+').slice(1).join('');
	db.get('subject').find({id: id}).get('news').find({date: date})
	.set('heading', req.body.heading)
	.set('notes',req.body.notes)
	.set('link', req.body.link)
	.set('date', req.body.date)
	.write();
	res.redirect('/subject/'+id);
}

module.exports.hacknaoViewCreate = (req, res)=>{
	res.render('subject/hacknaoCreate');
}

module.exports.hacknaoCreate = (req, res)=>{
	db.get('hacknao').push(req.body).write();
	res.redirect('/subject/english/hacknao1500');
}

module.exports.hacknao = (req, res)=>{
	var value = db.get('hacknao').value();
	res.render('subject/hacknaoView',{
		values: value
	});
}













