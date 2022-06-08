const passport = require("../middleware/passport")

exports.getGoogle = passport.authenticate("google", {
	scope: ["email", "profile"]
})

exports.getGoogleCallBack = passport.authenticate("google", {
	failureRedirect: "/auth/failure",
	successRedirect: "/auth/success",
	session: true
})

exports.failure = (req, res) => {
	return res.json({ success: false, error: "failure log in" })
}

exports.logout = (req, res) => {
	req.logout()
    return res.json({ success: true })
}

exports.success = (req, res) => {
	return res.redirect("/users/me")
}