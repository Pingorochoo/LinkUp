import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (!state.user) {
        console.error("user not exists");
        return;
      }
      state.user.friends = action.payload.friends;
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      //idea para mejorar el rendimiendo que tal si hacermos un objeto donde las llaves sean el id del post y el valor el post, asi no tenemos que recorrer un arreglo si no simplemente acceder a el con su clave
      const updatedPosts = state.posts.map((post) => {
        return post._id === action.payload.post._id ? action.payload.post : post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const {setMode, setLogin, setLogout, setFriends, setPosts, setPost}=authSlice.actions
export default authSlice.reducer