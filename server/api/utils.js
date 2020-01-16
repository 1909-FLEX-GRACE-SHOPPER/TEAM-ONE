const router = require("express").Router();

//Pagination middleware. 
const paginate = (model) => {
	return (req, res, next) => {
		const limit = req.query.limit * 1 || 10;
		const offset = req.query.page * limit || 1 * limit;

		model.findAndCountAll({
			offset,
			limit,
		})
		.then(foundModels => foundModels)
		next();
	}
}

module.exports = router