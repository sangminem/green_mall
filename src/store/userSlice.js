import { createSlice } from '@reduxjs/toolkit'

let user = createSlice({
    name : 'user',
    initialState : { name : '그린몰', age : 20 },
    reducers : {
        increase(state){
            state.age += 1
        },
        increase10(state, action){
            state.age += action.payload
        }
    }
})

export let { increase, increase10 } = user.actions

export default user