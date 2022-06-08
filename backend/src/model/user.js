const mongoose =  require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const Test = require("./test")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate(val) {
            if(!validator.isEmail(val)) throw new Error("Is'nt email!");
        }
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    results: [{
        type: mongoose.Schema.ObjectId,
        ref: "Result"
    }]
},{
    timestamps: true
})


userSchema.statics.findOrCreate = async (profile) => {
    let user = await User.findOne({ email: profile.email })
    if(!user) {
        user = new User({
            name: profile.name,
            email: profile.email
        })
        await user.save()
    }
    return user
}


userSchema.pre("remove", async function(next) {
    await Test.deleteMany({author: this._id})
    next()
})

const User = new mongoose.model("User", userSchema)

module.exports = User