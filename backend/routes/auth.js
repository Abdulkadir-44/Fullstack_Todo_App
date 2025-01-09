require("dotenv").config()
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { tokenVerification } = require("../utils/tokenVerification")
const { sendEmail } = require("../utils/emailService")
const mongoose = require('mongoose');


router.get("/getall-userInfo", tokenVerification, async (req, res) => {
    try {
        const { userId, accesToken } = req.user;
        if (!userId) {
            return res.status(400).json({ message: "Token verification failed!", error: true });
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID!", error: true });
        }

        const userInfo = await User.findById(userId);
        if (!userInfo) {
            return res.status(404).json({ message: "User not found!", error: true });
        }

        return res.status(201).json({
            error: false,
            message: "User information retrieved successfully!",
            userInfo: {
                fullName: userInfo.fullName,
                email: userInfo.email,
                createdAt: userInfo.createdAt,
                _id: userInfo._id,
                avatar: userInfo.avatar
            },
            accesToken
        })

    } catch (error) {
        console.error("Error fetching user data:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: true,
        });
    }
});


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
            console.log("deneme2", userInfo)
            const accesToken = jwt.sign({ userId: userInfo._id, email: userInfo.email }, process.env.JWT_SECRET, { expiresIn: "4h" })
            return res.status(201).json({
                error: false,
                message: "Login success !",
                userInfo,
                accesToken
            })
        }
        if (!passwordMatch) return res.status(400).json({ error: true, message: "Password is incorrect !" })

    } catch (error) {
        console.log("login hatası : ", error);
        return res.status(500).json({ error: true, message: "Something went wrong on the server" })

    }
})

router.patch("/update-avatar", tokenVerification, async (req, res) => {

    try {
        console.log(req.body.avatar)
        const { avatar } = req.body
        if (!avatar) return res.status(400).json({ message: "Avatar is required !", error: true });

        if (typeof avatar === 'string' && avatar.startsWith('http')) {
            const updatedUser = await User.findByIdAndUpdate(
                req.user.userId, //Tokenden gelen userId
                { avatar },
                { new: true, runValidators: true }
            );
            if (!updatedUser) return res.status(404).json({ message: "User not found !", error: true });

            return res.status(200).json({
                message: "Avatar updated succesfully !"
            });
        }

    } catch (error) {
        console.error("Error updating avatar:", error);
        return res.status(500).json({ message: "Internal server error" });
    }

})

//CHANGE FULLNAME
router.patch("/change-fullname", tokenVerification, async (req, res) => {
    try {
        console.log(req.body)
        const { userId } = req.user
        const { newFullName } = req.body
        if (!newFullName) return res.status(400).json({ message: "Username is missing from the request !" })
        const userInfo = await User.findById(userId)
        if (!userInfo) {
            return res.status(404).json({
                message: "User not found",
                error: true
            });
        }

        await User.findByIdAndUpdate(
            userId,
            { fullName: newFullName },
            { new: true, runValidators: true }
        )
        return res.status(200).json({
            message: `Username updated to ${newFullName}`,
            error: false
        })
    } catch (error) {
        console.log("İsim değiştirme hatası : ", error)
        return res.status(500).json({
            message: "Something went wrong on the server"
        })
    }
})

//CHANGE PASSWORD
router.patch("/change-password", tokenVerification, async (req, res) => {
    try {
        //belki burda id göndermem gerekebilir çünkü mongoDB'de kullanıcıyı bulmak istiyorum 
        const { userId } = req.user
        const { oldPassword, newPassword } = req.body
        if (!oldPassword) return res.status(400).json({ message: "Old password is missing from the request !" });
        if (!newPassword) return res.status(400).json({ message: "New password is missing from the request !" });
        const userInfo = await User.findOne({ _id: userId })
        if (!userInfo) {
            return res.status(404).json({
                message: "User not found",
                error: true
            });
        }
        const passwordMatch = await bcrypt.compare(oldPassword, userInfo.password)
        const isSamePassword = await bcrypt.compare(newPassword, userInfo.password);
        if (isSamePassword) {
            return res.status(400).json({
                message: "New password cannot be the same as the old password!"
            });
        }
        if (passwordMatch) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await User.findByIdAndUpdate(
                userId,
                { password: hashedPassword },
                { new: true, runValidators: true }
            )

            return res.status(200).json({
                message: "Password successfully changed !",
                error: false
            })
        }
        return res.status(400).json({
            message: "The old password entered does not match the password in the system !"
        })

    } catch (error) {
        console.log("Şifre değişikliği hatası : ", error)
        return res.status(500).json({ error: true, message: "Something went wrong on the server" })
    }
})

//ŞİFRE SIFIRLAMA MAİLİ GÖNDERME
router.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email gerekli!", error: true });

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "Bu email ile kayıtlı kullanıcı bulunamadı!", error: true });

        // Sıfırlama tokeni oluştur (1 saat geçerli)
        const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Kullanıcının reset token'ını ve son kullanma tarihini kaydet
        await User.findByIdAndUpdate(user._id, {
            resetPasswordToken: resetToken,
            resetPasswordExpires: Date.now() + 3600000 // 1 saat
        });

        const resetUrl = `${process.env.FRONTEND_URL}/auth/reset-password/${resetToken}`;
        // Email içeriği
        const message = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #4F46E5; margin: 0;">NOTEFLOW</h1>
        <p style="color: #6B7280; margin-top: 10px;">Şifre Sıfırlama İsteği</p>
      </div>

      <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <p style="color: #374151; margin-bottom: 15px;">Merhaba,</p>
        
        <p style="color: #374151; margin-bottom: 15px;">
          Hesabınız için bir şifre sıfırlama isteği aldık. Eğer bu isteği siz yaptıysanız, 
          aşağıdaki butona tıklayarak şifrenizi sıfırlayabilirsiniz.
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background-color: #4F46E5; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 6px; display: inline-block;">
            Şifremi Sıfırla
          </a>
        </div>
        
        <p style="color: #374151; margin-bottom: 15px;">
          ${resetUrl}
        </p>
        <p style="color: #374151; margin-bottom: 15px;">
          Bu link 1 saat boyunca geçerli olacaktır.
        </p>

        <p style="color: #374151; margin-bottom: 15px;">
          Eğer şifre sıfırlama isteğinde bulunmadıysanız, bu emaili görmezden gelebilirsiniz.
        </p>
      </div>

      <div style="text-align: center; color: #6B7280; font-size: 14px;">
        <p>Bu otomatik bir emaildir, lütfen cevaplamayınız.</p>
      </div>
    </div>
  `;

        await sendEmail({
            email: user.email,
            subject: 'Şifre Sıfırlama İsteği',
            message
        });



        return res.status(200).json({
            error: false,
            message: "Şifre sıfırlama bağlantısı email adresinize gönderildi."
        });

    } catch (error) {
        console.log("Şifre sıfırlama hatası:", error);
        return res.status(500).json({ message: "Sunucu hatası oluştu!", error: true });
    }
});

//ŞİFRE SIFIRLAMA İŞLEMİ
router.post("/reset-password/:token", async (req, res) => {

    try {
        const { token } = req.params;
        const { newPassword } = req.body;
        if (!token || !newPassword) {
            return res.status(400).json({ message: "Token ve yeni şifre gerekli!", error: true });
        }

        // Token'ı doğrula
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({
            _id: decoded.userId,
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                message: "Geçersiz ya da süresi dolmuş şifre sıfırlama bağlantısı!",
                error: true
            });
        }

        // Yeni şifreyi hashle ve kaydet
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        return res.status(200).json({
            error: false,
            message: "Şifreniz başarıyla güncellendi!"
        });

    } catch (error) {
        console.log("Şifre sıfırlama hatası:", error);
        return res.status(500).json({ message: "Sunucu hatası oluştu!", error: true });
    }
});



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


findByIdAndUpdate metodu, belirtilen bir MongoDB ObjectID'ye sahip kullanıcıyı bulur ve bu kullanıcıyla ilgili verilen güncelleme işlemlerini yapar. 
Bu metodun 3 parametresi vardır:

Birinci parametre (ID): Güncellenmek istenen dokümanın (bu durumda kullanıcının) ID'sini belirtir.
İkinci parametre (güncelleme objesi): Bu parametre, güncellemek istediğiniz alanları ve yeni değerleri içerir. Örneğin, avatar'ı güncellemek 
istiyorsanız, burada { avatar: fileUrl } gibi bir şey yazarsınız.
Üçüncü parametre (opsiyonel seçenekler): Bu parametre, güncelleme işleminin nasıl yapılacağını belirler. Örneğin, new: true yeni güncellenmiş belgeyi 
geri döndürür, runValidators: true ise modelde belirtilen doğrulama kurallarını çalıştırır.

*/