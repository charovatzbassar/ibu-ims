import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import appAxios from "../services/appAxios";

const token = localStorage.getItem("token") || null;

const initialState = {
  user: {
    firstName: null,
    lastName: null,
    email: null,
    role: null,
    token,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: () => {
      window.location.href = "http://localhost:8080/api/auth/google";
    },
    logout: (state) => {
      appAxios.get("/auth/google/logout").then(() => {
        state = initialState;
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        window.location.href = "/auth/login";
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      const { jwtToken, role, profile } = action.payload;

      state.user = {
        token: jwtToken,
        role: role,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
      };

      localStorage.setItem("token", jwtToken);
    });
  },
});

export const loginUser = createAsyncThunk("auth/google/user", async () => {
  const { data } = await appAxios.get("/auth/google/user");
  return data.user;
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
