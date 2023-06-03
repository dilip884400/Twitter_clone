
import { configureStore } from "@reduxjs/toolkit";
import {userSlice,TweetSlice} from "./reducer";


const store = configureStore({
    reducer:{
        user:userSlice.reducer,
        Tweets:TweetSlice.reducer,
    }
})

  


export default store;