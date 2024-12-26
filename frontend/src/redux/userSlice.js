import { createSlice } from "@reduxjs/toolkit"

//localstoragedaki itemi aldık 
const storedUser = JSON.parse(localStorage.getItem('user'))

const initialState = {
    //eğer localstorageda böyle bir değer varsa stringden js nesnesine parse ettik
    user: storedUser || null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userLogin: (state, action) => {
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        userLogout: (state) => {
            localStorage.removeItem('user')
            state.user = null
        }
    }
})

export const { userLogin, userLogout } = userSlice.actions
export default userSlice.reducer