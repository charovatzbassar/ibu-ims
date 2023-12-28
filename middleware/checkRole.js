module.exports.checkRole = (role) => {
  return (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    }
    res.redirect("/");
  };
};
