// Custom middleware to prevent user from accessing important routes if user is not sign in
module.exports.requireAuth = async (req, res, next) => {
    // Check if user has not logged in
    if (!req.signedCookies.userData) {
        res.redirect("/signin");
        return;
    }

    next();
};
