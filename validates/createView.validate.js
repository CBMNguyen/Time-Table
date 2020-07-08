module.exports = (req, res, next) => {
	var errors = [];
	
	if(!req.body.heading){
		errors.push('require heading.');
	}

	if(!req.body.notes){
		errors.push('require notes.');
	}

	if(errors.length){
		res.render('subject/viewCreate', {
			errors: errors
		});
		return;
	}
	next();
}