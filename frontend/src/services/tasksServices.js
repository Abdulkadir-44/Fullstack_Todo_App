import { del, get, post, patch } from "./request"

export const getAllTasks = () => get(`http://localhost:3000/api/notes/get-all-notes`)
export const deleteOneNote = (id) => del(`http://localhost:3000/api/notes/delete-note/${id}`)
export const updateImportanceOfNote = (id, data) => patch(`http://localhost:3000/api/notes/update-importance/${id}`, data)
export const updateNote = (id, data) => patch(`http://localhost:3000/api/notes/update-notes/${id}`, data)
export const addNote = (data) => post(`http://localhost:3000/api/notes/add-note`, data)
