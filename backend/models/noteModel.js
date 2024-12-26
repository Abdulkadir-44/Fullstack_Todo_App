const mongoose = require("mongoose")


const NoteSchema = new mongoose.Schema({
    title : {type : String , required : true},
    description : {type : String , required : true},
    dueDate : {type : Date , required : true},
    status  : {type : String , required : true},
    priority : {type : String , required : true},
    important : {type : Boolean , default : false},
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
},{timestamps : true})


module.exports = mongoose.model("Note", NoteSchema)
/*
id: Benzersiz bir kimlik (UUID veya otomatik oluşturulmuş ID).
title: Görevin başlığı.
description: Görevin açıklaması.
createdAt: Görevin eklendiği tarih.
dueDate: Görevin bitmesi gereken tarih.
status: Görevin durumu (örneğin, "pending", "in-progress", "completed", "overdue").
priority: Görevin önceliği (örneğin, "low", "medium", "high").
isCompleted: Görevin tamamlanıp tamamlanmadığını belirten boolean (true/false).
completedAt: Görevin tamamlandığı tarih (eğer tamamlandıysa).

*/