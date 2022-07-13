exports.getUser = function (req, res, next) {
    res.json(req.user)
};
