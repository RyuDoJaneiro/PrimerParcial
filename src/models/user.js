const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
        userName: {
                type: String,
                required: true
        },
        userPassword: {
                type: String,
                required:true
        },
        isActive: {
                type: Boolean,
                default: true
        },
        role: [{
                type: String
        }]
}, {
        timestamps: true,
        versionKey: false
})

module.exports = model("User", UserSchema);