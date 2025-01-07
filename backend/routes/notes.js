const express = require("express");
const router = express.Router();
const { tokenVerification } = require("../utils/tokenVerification")
const Note = require("../models/noteModel")


//ADD NOTE
/*
Eğer Express.js kullanıyorsanız ve uygulamanızda şu middleware’i eklediyseniz:

app.use(express.json());
Bu middleware, gelen HTTP isteklerinde Content-Type: application/json header'ını kontrol eder. Eğer bir JSON string varsa, bunu otomatik olarak 
JavaScript nesnesine çevirir ve req.body içine yerleştirir.

*/
router.post("/add-note", tokenVerification, async (req, res) => {
    try {

        const { title, description, dueDate, status, priority, important } = req.body;
        const userId = req.user.userId;

        if (!title) return res.status(400).json({ error: true, message: "Please enter a title !" })
        if (!description) return res.status(400).json({ error: true, message: "Please enter a description !" })
        if (!dueDate) return res.status(400).json({ error: true, message: "Please enter a dueDate !" })
        if (!status) return res.status(400).json({ error: true, message: "Please enter a status !" })
        if (!priority) return res.status(400).json({ error: true, message: "Please enter a priority !" })

        const newNote = new Note({
            title, description, dueDate, status, priority, user: userId, important
        })

        const savedNote = await newNote.save();
        return res.status(201).json({
            error: false,
            savedNote,
            message: "Note successfully saved !"
        })


    } catch (err) {
        console.log("not ekleme hatası : ", err);

        return res.status(500).json({
            error: true,
            mesage: "Something went wrong on the server !"
        })
    }
})

//GET ALL NOTES 
router.get("/get-all-notes", tokenVerification, async (req, res) => {

    try {
        const userId = req.user.userId
        const notes = await Note.find({ user: userId }).sort({ createdAt: -1 })
        return res.status(201).json({
            error: false,
            notes,
            message: "Data extraction successful !"
        })
    } catch (err) {
        console.log("Get all notes hatası : ", err);
        return res.status(500).json({
            error: true,
            message: "Something went wrong on the server !"
        })
    }
})

//DELETE NOTES
router.delete("/delete-note/:id", tokenVerification, async (req, res) => {
    try {
        const noteId = req.params.id;
        const userId = req.user.userId;
        const note = await Note.findOne({ user: userId, _id: noteId });
        if (!note) return res.status(404).json({ error: true, message: "Note not found !" })
        await Note.deleteOne({ _id: noteId });
        return res.status(201).json({ error: false, message: "Note is succesfully deleted !" })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Something went wrong on the server !"
        })
    }
})

//UPDATE IMPORTANCE OF NOTE
router.patch("/update-importance/:id", tokenVerification, async (req, res) => {
    try {
        const { important } = req.body;
        const userId = req.user.userId;
        const noteId = req.params.id;
        const note = await Note.findOne({ user: userId, _id: noteId });
        if (!note) return res.status(404).json({ error: true, message: "Note not found !" });
        note.important = important;
        await note.save();
        return res.status(200).json({ error: false, message: "Changed the importance of the grade !" });
    } catch (err) {
        return res.status(500).json({
            error: true,
            message: "Something went wrong on the server !"
        })
    }

})

//UPDATE NOTES
router.patch("/update-notes/:id", tokenVerification, async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        if (!updateData || Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: "No fields to update" });
        }

        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );
       

        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        return res.status(200).json({
            message: "Note updated successfully",
            error : false,
        });
    } catch (error) {
        console.error("Error updating note:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router