var db = require('../db');

module.exports.home =  (req, res) => {
	var term = req.query.term;
	var year = req.query.year;
	var category = req.query.category;
	
	var subjects = db.get('subject').filter((x)=>{
		return (x.term === term && x.year === year && x.category === category);
	}).value();

	res.render('home/home', {
		subjects: subjects
	});
}
