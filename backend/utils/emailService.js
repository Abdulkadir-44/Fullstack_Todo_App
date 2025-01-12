require('dotenv').config()
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
});

const sendUpcomingTasksMail = async (userEmail, tasks) => {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: 'Yaklaşan Görevleriniz',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2b2b35; text-align: center; padding: 20px 0;">Yaklaşan Görevleriniz</h2>
            <p style="color: #666; text-align: center;">Önümüzdeki 7 gün içinde tamamlanması gereken ${tasks.length} göreviniz bulunuyor.</p>
            
            <div style="padding: 20px;">
              ${tasks.map(task => `
                <div style="
                  background: #f8f9fa;
                  border-radius: 8px;
                  padding: 15px;
                  margin-bottom: 15px;
                  border-left: 4px solid #2b2b35;
                  box-shadow: 0 2px 4px rgba(0,0,0,0.1)
                ">
                  <h3 style="color: #2b2b35; margin: 0 0 10px 0;">${task.title}</h3>
                  <p style="
                    color: #666;
                    margin: 0 0 10px 0;
                    font-size: 14px;
                  ">${task.description}</p>
                  <div style="
                    font-size: 12px;
                    color: #888;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                  ">
                    <p style="margin-right: 5px;">Bitiş Tarihi: ${new Date(task.dueDate).toLocaleDateString('tr-TR')}</p>
                  </div>
                </div>
              `).join('')}
            </div>
            
            <div style="
              text-align: center;
              padding: 20px;
              color: #666;
              font-size: 12px;
              border-top: 1px solid #eee;
            ">
              <p>Bu e-posta NoteFlow uygulaması tarafından otomatik olarak gönderilmiştir.</p>
            </div>
          </div>
        `
      };
  
      await transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Email gönderimi sırasında hata:', error);
      return false;
    }
};

const sendEmail = async ({ email, subject, message }) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; margin-bottom: 20px;">NoteFlow Uygulaması</h2>
          
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
  sendUpcomingTasksMail,
  sendEmail
}; 
