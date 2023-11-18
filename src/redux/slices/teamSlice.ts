import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface UserProps {
    id: any;
    avatar: String;
    first_name: String;
    last_name: String;
    gender: String;
    domain: String;
    available: Boolean;
  }
interface TeamState {
  team: UserProps[];
}

const initialState: TeamState = {
  team: [],
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setTeam: (state, action: PayloadAction<UserProps[]>) => {
      state.team = action.payload;
    },
    clearTeam: (state) => {
      state.team = [];
    },
  },
});

export const { setTeam, clearTeam } = teamSlice.actions;
export default teamSlice.reducer;
