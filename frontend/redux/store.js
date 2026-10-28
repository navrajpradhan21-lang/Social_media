import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import postSlice from "./postSlice"
import storySlice from "./storySlice"
import loopSlice from "./loopSlice"

export const  store = configureStore({
    reducer:{
        user:userSlice,
        post:postSlice,
        story: storySlice,
        loop: loopSlice

    }

})

export default store;
