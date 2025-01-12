const cron = require('node-cron');
const User = require('../models/userModel');
const Note = require('../models/noteModel');
const { sendUpcomingTasksMail } = require('../utils/emailService');

const startTaskScheduler = () => {
    console.log('Scheduler kurulumu yapılıyor...');
    console.log('Bir sonraki çalışma zamanı: 14:58');
    
    cron.schedule('03 21 * * *', async () => {
        console.log('Cron görevi başladı - ' + new Date().toLocaleString());
        try {
            const users = await User.find();
            console.log(`${users.length} kullanıcı bulundu.`);

            for (const user of users) {
                const tasks = await Note.find({ user: user._id });
                // console.log(`${user.email} adresine ${tasks.length} görev bulundu.`);
                const upcomingTasks = tasks.filter(task => {
                    const today = new Date();
                    const dueDate = new Date(task.dueDate);
                    const diffTime = dueDate - today;
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                    return diffDays <= 7 && diffDays > 0;
                });

                if (upcomingTasks.length > 0) {
                    console.log(`${user.email} adresine ${upcomingTasks.length} adet yaklaşan görev maili gönderiliyor...`);
                    await sendUpcomingTasksMail(user.email, upcomingTasks);
                }
            }
        } catch (error) {
            console.error('Task scheduler hatası:', error);
        }
    });
};

module.exports = {
    startTaskScheduler
}; 