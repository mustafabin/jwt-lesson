import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: {},
    isLoggedIn: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.profile = { ...action.payload.profile };
      state.isLoggedIn = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
