import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  email: string;
  firstName: string;
  lastName: string;
  token: string;
  imgUrl: string;
  id: string;
}

export const counterSlice = createSlice({
  name: "USER",
  initialState: {
    email: "",
    firstName: "",
    lastName: "",
    token: "",
    imgUrl: "",
    id: "",
  },

  reducers: {
    USER: (state: UserState, action) => {
      return {
        ...state,
        email: action.payload.data.email,
        firstName: action.payload.data.firstName,
        lastName: action.payload.data.lastName,
        token: action.payload.token,
        imgUrl: action.payload.data.imgUrl,
        id: action.payload.data.id,
      };
    },

    LogoutUSER: (state: UserState) => {
      state.email = "";
      state.firstName = "";
      state.lastName = "";
      state.token = "";
      state.imgUrl = "";
      state.id = "";
    },
  },
});

export const { USER } = counterSlice.actions;

// selector for getting the state
export const selectUser = (state: { user: UserState }) => state.user;

export default counterSlice.reducer;
