module.exports.isLoggedIn = (req, res, next) => {
  req.user ? next() : res.json({ msg: "Unauthorized", status: 401 });
};