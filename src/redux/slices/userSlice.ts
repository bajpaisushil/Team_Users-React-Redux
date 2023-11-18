// userSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserProps {
  avatar: string;
  first_name: string;
  last_name: string;
  gender: string;
  domain: string;
  available: boolean;
  selected: boolean;
}

interface UserState {
  users: UserProps[];
}

const initialState: UserState = {
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserProps[]>) => {
      // Update selected property
      state.users = action.payload.map(({ selected, ...user }) => ({
        ...user,
        selected: false,
      }));
    },
    toggleSelect: (state, action: PayloadAction<number>) => {
      state.users[action.payload].selected = !state.users[action.payload].selected;
    },
  },
});

export const { setUsers, toggleSelect } = userSlice.actions;
export default userSlice.reducer;
