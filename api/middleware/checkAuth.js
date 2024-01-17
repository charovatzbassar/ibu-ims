module.exports = (req, res, next) => {
  req.user ? next() : res.json({ msg: "Unauthorized", status: 401 });
};