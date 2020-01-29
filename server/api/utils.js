//Pagination middleware.
const paginate = model => {
  return (req, res, next) => {
    const limit = req.query.limit * 1 || 10;
    const offset = req.query.page * limit || 0;

    model
      .findAndCountAll({
        offset,
        limit
      })
      .then(foundModels => {
        res.send(foundModels);
      })
      .catch(e => {
        res.status(500);
        next(e);
      });
  };
};

module.exports = paginate;
