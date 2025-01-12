const jwt = require('jsonwebtoken');

require("dotenv").config()
const createJWT = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email }, // Payload
        process.env.JWT_SECRET, // Bu kısmı çevre değişkenlerine koymanız önerilir
        { expiresIn: '4h' } // Token geçerlilik süresi
    );
};

module.exports = {
    createJWT
}
