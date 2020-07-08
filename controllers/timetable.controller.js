var db = require('../db');
var today = new Date();
var day = today.getDay() + 1;
if(day === 1)
	day += 1;

var hour = today.getHours();

var timetable = db.get('timetable').value();
var calendar = timetable[0].tkb.find((x)=>{
	return x.number === day;
});

var calendar1 = timetable[1].tkb.find((x)=>{
	return x.number === day;
});

module.exports.timetable= (req, res)=>{
	res.render('timetable/timetable',{
		timetables: timetable,
		day: day,
		calendar: calendar,
		hours: hour
	});
}

module.exports.search= (req, res)=>{
	var year = req.query.year;
	var term = req.query.term;
	var timetable= db.get('timetable').find((x)=>{
		return x.year === year && x.term === term;
	}).value();

	res.render('timetable/searchtimetable',{
		timetables: timetable,
		day: day,
		calendar: calendar1,
		hours: hour,
		year: year,
		term: term
	});
}