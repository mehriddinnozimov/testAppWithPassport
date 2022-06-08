const User = require("../model/user")
const Test = require("../model/test")

exports.getAll =  async (req, res) => {
    try {
        let query = {}
        if(req.query) query = req.query
        const users = await User.find(query)
        return res.json({ success: true, users })
    } catch (err) {
        return res.json({success:false, err})
    }
}

exports.getMe =  async (req, res) => {
    try {
        return res.json({ success:true, user: req.user })
    } catch (err) {
        return res.json({ success:false, err })
    }
}

exports.getById =  async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        if(!user) throw "User not found!";

        return res.json({ success: true, user })
    } catch (err) {
        return res.json({ success:false, err })
    }
    
}

exports.getTestByUser =  async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        if(!user) throw "User not found!"
        const tests = await Test.find({author: req.params.userId}).sort({createdAt:-1})
        if(!tests || tests.length == 0) throw "This user hasn't any test!"
        return res.json({ success: true, tests })
    } catch (err) {
        return res.json({ success:false, err })
    }
}

exports.update =  async (req, res) => {
    try {
        if(!req.body || !req.body.name) throw "Wrong body!"
        req.user.name = req.body.name
        await req.user.save()

        return res.json({ success: true, user: req.user })
    } catch (err) {
        return res.json({ success:false, err })
        
    }
}

exports.remove =  async (req, res) => {
    try {
        await req.user.remove()
        return res.json({ success: true })
    } catch (err) {
        return res.json({ success:false, err })
    }
}

exports.logout = (req, res) => {
    req.logout()
    return res.json({ success: true })
}