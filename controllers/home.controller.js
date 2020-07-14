var db = require('../db');

module.exports.home =  (req, res) => {
	var today = new Date();
	var day = today.getDay() + 1;
	var hour = today.getHours();
	var term = req.query.term;
	var year = req.query.year;
	var category = req.query.category;
	var values = req.query;
// ================================Marquee====================================
	var timetable = db.get('timetable').value();
	var calendar1 = timetable[1].tkb.find((x)=>{
	return x.number === day;
	});

	var timetable= db.get('timetable').find((x)=>{
		return x.year === '2019-2020' && x.term === 'hè';
	}).value();

// ===========================================================================
	var subjects = db.get('subject').filter((x)=>{
		return (x.term === term && x.year === year && x.category === category);
	}).value();

	var df = db.get('subject').filter((x)=>{
		return (x.term === "hè" && x.year === "2019-2020" && x.category === "school");
	}).value();

	// if(subjects.length !== 0)
	// 	subjects = subjects;
	if(typeof req.query.term === 'undefined')
		subjects = df;
	// ===============================================
	var personal;
	if(category === "OneDayOfMe"){
		personal = db.get('personal').value();
		// values = false;
	}
		

	res.render('home/home', {
		subjects: subjects,
		values: values,
		personal: personal,
		day: day,
		timetables: timetable,
		calendar: calendar1,
		hours: hour
	});
}
