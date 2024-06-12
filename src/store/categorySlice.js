import { createSlice } from "@reduxjs/toolkit";

let categorySlice =createSlice({
    name:"category",
    initialState:{
        category:'jhgf'
    },
    reducers:{
        setCategory:(state,action)=>
        {
          state.category= action.payload 
             }
    },
})
export const{setCategory}=categorySlice.actions
export default categorySlice.reducer  