const mongoose = require("mongoose");
const bcrypt = require('bcrypt')


const Schema = mongoose.Schema;


const userShema = new Schema(
    {
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        avatarURL: {
            type: String,
            required: true,
        },
        subscription: {
            type: String,
            enum: ["starter", "pro", "business"],
            default: "starter"
        },
        token: {
            type: String,
            default: null,
        },
        verify: {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: String,
            required: [true, 'Verify token is required'],
        },


    },
    { versionKey: false, timestamps: false },
);


userShema.pre('save', async function () {
    if (this.isNew) {
        this.password = await bcrypt.hash(this.password, 10)
    }


})



const User = mongoose.model("user", userShema);

module.exports = User;