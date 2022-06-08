const User = require("../model/user")

module.exports = async () => {
	const envAdmin = {
		AdminName: process.env.ADMIN_NAME,
		AdminEmail: process.env.ADMIN_EMAIL
	}
	const a = await User.findOne({email: envAdmin.AdminEmail})
	if(!a) {
		const admin = new User({
			name: envAdmin.AdminName,
			isAdmin: true,
			email: envAdmin.AdminEmail,
		})
		await admin.save()
	}


}