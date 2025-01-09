const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
    avatar: { 
        type: String, 
        default: "https://www.gravatar.com/avatar/0bb70c68c081aab9be6f75f937b8f06d?d=wavatar" // Varsayılan avatar URL'si 
    },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
