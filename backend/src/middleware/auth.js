module.exports = (req, res, done) => {
	if(!req.user) return res.json({success: false, err: "User not log in"})
	done()

}