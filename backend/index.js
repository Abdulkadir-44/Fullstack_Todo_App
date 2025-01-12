const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
require('dotenv').config();
const { startTaskScheduler } = require('./services/taskScheduler'); 
const notesRouter = require("./routes/notes")
const authRouter = require("./routes/auth")
const PORT = 3000;
const app = express();

// MongoDB bağlantısı yapıldı
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Veritabanı bağlantısı gerçekleşti...");
        // MongoDB bağlantısı başarılı olduktan sonra scheduler'ı başlat
        startTaskScheduler();
        console.log("Task Scheduler başlatıldı...");
    })
    .catch(err => {
        console.log("Bağlantı hatası : ", err);
    });

//cors hatası ve gelen istekleri json formatında okuma işlemi sağlandı
app.use(express.json());

app.use(cors({
    origin: "*", // Gerekirse spesifik originler ekleyin
    methods: "GET,POST,PATCH,DELETE,PUT,OPTIONS",
    allowedHeaders: "Content-Type, Authorization", // Gerekli başlıkları ekleyin
    credentials: true // Gerektiğinde izin verin (örneğin, cookies kullanıyorsanız)
}));

app.use("/api/auth", authRouter)
app.use("/api/notes", notesRouter)

app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda ayağa kaldırıldı...`);
});