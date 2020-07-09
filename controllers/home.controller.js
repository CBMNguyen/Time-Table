var db = require('../db');

module.exports.home =  (req, res) => {
	var term = req.query.term;
	var year = req.query.year;
	var category = req.query.category;

	var subjects = db.get('subject').filter((x)=>{
		return (x.term === term && x.year === year && x.category === category);
	}).value();

	var df = db.get('subject').filter((x)=>{
		return (x.term === "2" && x.year === "2019-2020" && x.category === "school");
	}).value();

	if(subjects.length !== 0)
		subjects = subjects;
	if(typeof req.query.term === 'undefined')
		subjects = df;

	res.render('home/home', {
		subjects: subjects,
		values: req.query
	});
}
