module.exports = (req, res, next) => {
	var errors = [];
	if(!req.body.name){
		errors.push('require name subject.');
	}

	if(!req.body.mamon){
		errors.push('require subject code.');
	}

	if(!req.body.gvname){
		errors.push('require teacher name.')
	}

	if(errors.length){
		res.render('subject/create', {
			errors: errors,
			values: req.body
		});
		return;
	}
	next();
}