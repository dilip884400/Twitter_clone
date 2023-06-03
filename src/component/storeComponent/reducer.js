import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "User",
  initialState: JSON.parse(localStorage.getItem("userdata")) || [],
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("userdata", JSON.stringify(state));
    },
  },
});

const TweetSlice = createSlice({
  name: "Tweets",
  initialState: [],
  reducers: {
    AddAllTweet: (state, action) => {
      state.push(...action.payload);
    },
    addretweet: (state, action) => {
      const { id } = action.payload;
      const data = state.find((item) => item.id === id);
      data.reTweetsCount++;
    },
    addComment: (state, action) => {
      const { id } = action.payload;
      const data = state.find((item) => item.id === id);
      data.commentCount++;
    },
    addLike: (state, action) => {
      const { id } = action.payload;
      const data = state.find((item) => item.id === id);
      if (data.isLiked === true) {
        data.likeCount--;
      } else {
        data.likeCount++;
      }
      data.isLiked = !data.isLiked;
    },
    addTweet: (state, action) => {
      state.unshift(action.payload);
    },
  },
});

export { userSlice, TweetSlice };
