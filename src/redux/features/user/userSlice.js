import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import auth from "../../../utils/firebase.config";

const initialState = {
  name: "",
  email: "",
  isLoading: true,
  isErrror: false,
  error: "",
};

export const createUser = createAsyncThunk(
  "userSlice/createUser",
  async ({ email, password, name }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
      displayName: name,
    })
    // console.log(data);
    return {
      email: data.user.email,
      name: data.user.displayName,

    };
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, {payload}) => {
      state.email = payload.email;
      state.name = payload.name;
    },
    toggleLoading: (state, {payload}) => {
      state.isLoading = payload;
    },
    logout: (state) => {
      state.email = "";
      state.name = "";
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.isLoading = true;
      state.isErrror = false;
      state.error = "";
      state.email = "";
      state.name = "";
    })
    .addCase(createUser.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      state.isErrror = false;
      state.error = "";
      state.email = payload.email;
      state.name = payload.name;
    })
    .addCase(createUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isErrror = true;
      state.error = action.error.message;
      state.email = "";
      state.name = "";
    });
  },
});

export default userSlice.reducer;
export const { setUser, toggleLoading, logout } = userSlice.actions;
