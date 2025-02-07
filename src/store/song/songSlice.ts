import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SongState {
  nowPlayingUrl: string | null;
}

const initialState: SongState = {
  nowPlayingUrl: null,
};

export const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    setNowPlayingUrl: (state: SongState, action: PayloadAction<string>) => {
      state.nowPlayingUrl = action.payload;
    },
  },
});

export const { setNowPlayingUrl } = songSlice.actions;
