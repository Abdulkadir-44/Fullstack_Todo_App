const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
require('dotenv').config();

const notesRouter = require("./routes/notes")
const authRouter = require("./routes/auth")
const PORT = 3000;
const app = express();

//cors hatası ve gelen istekleri json formatında okuma işlemi sağlandı
app.use(express.json());
app.use(
    cors({
        origin: "*"
    })
)

//MongoDB bağlantısı yapıldı
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Veritabanı bağlantısı gerçekleşti...");

}).catch(err => {
    console.log("Bağlantı hatası : ", err);
})

app.use("/api/auth", authRouter)
app.use("/api/notes", notesRouter)


app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda ayağa kaldırıldı...`);

})