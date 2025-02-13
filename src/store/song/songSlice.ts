import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Song } from "../services/coreApi";
import { Audio } from "expo-av";
interface SongState {
  nowPlayingIndex: number | null;
  queue: Song[] | null;
  nowPlayingSoundObject: (() => Audio.Sound) | null;
}

const initialState: SongState = {
  nowPlayingIndex: null,
  queue: null,
  nowPlayingSoundObject: null,
};

export const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    setNowPlayingIndex: (state: SongState, action: PayloadAction<number>) => {
      state.nowPlayingIndex = action.payload;
    },
    skipSong: (state: SongState) => {
      if (state.nowPlayingIndex === null || state.queue === null) {
        return state;
      }
      if (state.nowPlayingIndex === state.queue.length - 1) {
        return {
          ...state,
          nowPlayingIndex: 0,
        };
      }

      return {
        ...state,
        nowPlayingIndex: state.nowPlayingIndex + 1,
      };
    },
    rewindSong: (state: SongState) => {
      if (state.nowPlayingIndex === null || state.queue === null) {
        return state;
      }

      if (state.nowPlayingIndex === 0) {
        return {
          ...state,
          nowPlayingIndex: state.queue.length - 1,
        };
      }

      return {
        ...state,
        nowPlayingIndex: state.nowPlayingIndex - 1,
      };
    },
    setQueue: (state: SongState, action: PayloadAction<Song[]>) => {
      return {
        ...state,
        queue: action.payload,
      };
    },
    setSoundObject: (
      state: SongState,
      action: PayloadAction<() => Audio.Sound>,
    ) => {
      return {
        ...state,
        nowPlayingSoundObject: action.payload,
      };
    },
  },
});

export const nowPlayingIndexSelector = (state: RootState) =>
  state.song.nowPlayingIndex;

const queueSelector = (state: RootState) => state.song.queue;

export const nowPlayingHlsSelector = createSelector(
  nowPlayingIndexSelector,
  queueSelector,
  (nowPlayingHls, queue) => {
    if (nowPlayingHls === null || queue === null) {
      return null;
    }
    return queue[nowPlayingHls].hlsPlaylists[0].url;
  },
);

export const nowPlayingMetadataSelector = createSelector(
  nowPlayingIndexSelector,
  queueSelector,
  (nowPlayingIndex, queue) => {
    if (nowPlayingIndex === null || queue === null) {
      return null;
    }
    return queue[nowPlayingIndex];
  },
);

export const nextInQueueSelector = (state: RootState) => state.song.queue;

export const nowPlayingSoundObjectSelector = (state: RootState) =>
  state.song.nowPlayingSoundObject;

export const {
  setNowPlayingIndex,
  setQueue,
  skipSong,
  rewindSong,
  setSoundObject,
} = songSlice.actions;
