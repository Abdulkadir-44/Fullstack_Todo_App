import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    tasks: [],
    loading: false,
    error: null
}

export const todosSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setAllTasks: (state, action) => {
            state.tasks = action.payload
            state.loading = false
        },
        setLoading: (state) => {
            state.loading = true
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false; // Hata durumunda yükleme biter
        }
    }
})

export const { setAllTasks, setLoading, setError } = todosSlice.actions
export default todosSlice.reducer