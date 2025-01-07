require('dotenv').config()
const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
      type: 'login'
    },
    debug: true // Hata ayıklama için
  });


  const sendEmail = async ({ email, subject, message }) => {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb; margin-bottom: 20px;">Ders Programı Uygulaması</h2>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              ${message}
            </div>
            
            <p style="color: #64748b; font-size: 14px; margin-top: 20px;">
              Bu email otomatik olarak gönderilmiştir. Lütfen cevaplamayınız.
            </p>
          </div>
        `
      };
  
      await transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Email gönderme hatası:', error);
      throw error;
    }
  };
  
  module.exports = {
    sendEmail
  }; 
