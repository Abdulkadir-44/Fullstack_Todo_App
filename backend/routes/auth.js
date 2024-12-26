const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//CREATE ACCOUNT bu kısımda bizim url değerimiz = http://localhost:3000/api/auth/register
router.post("/register", async (req, res) => {
    try {
        const { fullName, email, password } = req.body

        if (!fullName) return res.status(400).json({ message: "Name and surname required !", error: true })
        if (!email) return res.status(400).json({ message: "Email required !", error: true })
        if (!password) return res.status(400).json({ message: "Password required !", error: true })
    
        //eğer bu kullanıcı sistemde kayıtlı ise 
        const isUser = await User.findOne({ email: email })
        if (isUser) return res.status(400).json({ message: "User is already registered !", error: true })

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })

        await newUser.save()
        //kullanıcı başarılı bir şekilde kayıdedilmişse token oluşturuyoruz
        const accesToken = jwt.sign({ userId: newUser._id, fullName: fullName }, process.env.JWT_SECRET, { expiresIn: '4h' })

        return res.status(201).json({
            error: false,
            newUser: {
                fullName: newUser.fullName,
                email: newUser.email,
                updateAt: newUser.updateAt,
                createdAt: newUser.createdAt
            },
            accesToken,
            message: "User account has been created !"
        })

    } catch (error) {
        console.log("Register hatası :", error);
        return res.status(500).json({ message: "An error occurred !" })

    }
})

//LOGIN işlemi bu kısımda bizim url değerimiz = http://localhost:3000/api/auth/login
router.post("/login", async (req, res) => {
    try {
        console.log(req.body);

        const { email, password } = req.body
        if (!email) return res.status(400).json({ message: "Email is required !", error: true })
        if (!password) return res.status(400).json({ message: "Password is required !", error: true })

        const userInfo = await User.findOne({ email: email })

        if (!userInfo) return res.status(404).json({ error: true, message: "The user is not registered !" })

        const passwordMatch = await bcrypt.compare(password, userInfo.password)

        if (userInfo.email === email && passwordMatch) {
            const accesToken = jwt.sign({ userId: userInfo._id, email: userInfo.email }, process.env.JWT_SECRET, { expiresIn: "4h" })
            return res.status(201).json({
                error: false,
                message: "Login success !",
                userInfo: {
                    fullName: userInfo.fullName,
                    email: userInfo.email,
                    createdAt: userInfo.createdAt,
                    _id: userInfo._id
                },
                accesToken
            })
        }
        if (!passwordMatch) return res.status(400).json({ error: true, message: "Password is incorrect !" })

    } catch (error) {
        console.log("login hatası : ", error);
        return res.status(500).json({ error: true, message: "Something went wrong on the server" })

    }
})


module.exports = router

/*
Doğru LOGIN işlemi sonucu dönen  cevap
{
    "error": false,
    "message": "Login success !",
    "userInfo": {
        "fullName": "Yusuf Erden",
        "email": "yusufbaba@gmail.com",
        "createdAt": "2024-09-22T11:49:32.619Z",
        "_id": "66f0044c5819de123839e56d"
    },
    "accesToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmYwMDQ0YzU4MTlkZTEyMzgzOWU1NmQiLCJlbWFpbCI6Inl1c3VmYmFiYUBnbWFpbC5jb20iLCJpYXQiOjE3MjcwMDU4MTEsImV4cCI6MTcyNzAxMzAxMX0.hJKrG2M7Y3TUStUw8yb_1ouN4IZOV0ZZ1YAbupDwldI"
}

Doğru REGISTER işlemi sonucu dönen cevap 

{
    "error": false,
    "message": "Login success !",
    "userInfo": {
        "fullName": "Yusuf Erden",
        "email": "yusufbaba@gmail.com",
        "createdAt": "2024-09-22T11:49:32.619Z",
        "_id": "66f0044c5819de123839e56d"
    },
    "accesToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmYwMDQ0YzU4MTlkZTEyMzgzOWU1NmQiLCJlbWFpbCI6Inl1c3VmYmFiYUBnbWFpbC5jb20iLCJpYXQiOjE3MjcwMDU4MTEsImV4cCI6MTcyNzAxMzAxMX0.hJKrG2M7Y3TUStUw8yb_1ouN4IZOV0ZZ1YAbupDwldI"
}


*/