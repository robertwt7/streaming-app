import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Song } from "../services/coreApi";

interface SongState {
  nowPlayingUrl: string | null;
  nowPlayingMetadata: Partial<Song> | null;
}

const initialState: SongState = {
  nowPlayingUrl: null,
  nowPlayingMetadata: null,
};

export const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    setNowPlayingUrl: (state: SongState, action: PayloadAction<string>) => {
      state.nowPlayingUrl = action.payload;
    },
    setNowPlayingMetadata: (
      state: SongState,
      action: PayloadAction<Partial<Song>>,
    ) => {
      return {
        ...state,
        nowPlayingMetadata: action.payload,
      };
    },
  },
});

export const nowPlayingSelector = (state: RootState) =>
  state.song.nowPlayingUrl;

export const nowPlayingMetadataSelector = (state: RootState) =>
  state.song.nowPlayingMetadata;

export const { setNowPlayingUrl, setNowPlayingMetadata } = songSlice.actions;
