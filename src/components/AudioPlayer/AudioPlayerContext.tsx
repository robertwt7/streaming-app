import { Audio } from "expo-av";
import {
  createContext,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useState,
} from "react";

interface Status {
  androidImplementation?: string;
  isLoaded: boolean;
  isLooping: boolean;
  isPlaying: boolean;
  errorMessage?: string;
  positionMillis: number;
  durationMillis?: number;
  rate: number;
  volume: number;
  audioPan: number;
  isMuted: boolean;
  shouldCorrectPitch: boolean;
}

interface AudioPlayerContextValue {
  nowPlayingSoundObject: Audio.Sound | null;
  setNowPlayingSoundObject: Dispatch<SetStateAction<Audio.Sound | null>>;
  nowPlayingStatus: Status;
  setNowPlayingStatus: Dispatch<SetStateAction<Status>>;
}

interface AudioPlayerProviderProps {
  children: React.ReactNode;
}

export const AudioPlayerContext = createContext<AudioPlayerContextValue>({
  nowPlayingSoundObject: null,
  setNowPlayingSoundObject: () => null,
  nowPlayingStatus: {
    androidImplementation: "SimpleExoPlayer",
    isMuted: false,
    isLoaded: false,
    isLooping: false,
    isPlaying: false,
    positionMillis: 0,
    durationMillis: 0,
    rate: 1,
    volume: 1,
    audioPan: 0,
    shouldCorrectPitch: false,
  },
  setNowPlayingStatus: () => null,
});

export const AudioPlayerProvider: FunctionComponent<
  AudioPlayerProviderProps
> = ({ children }) => {
  const [nowPlayingSoundObject, setNowPlayingSoundObject] =
    useState<Audio.Sound | null>(null);

  const [nowPlayingStatus, setNowPlayingStatus] = useState<Status>({
    androidImplementation: "SimpleExoPlayer",
    isMuted: false,
    isLoaded: false,
    isLooping: false,
    isPlaying: false,
    positionMillis: 0,
    durationMillis: 0,
    rate: 1,
    volume: 1,
    audioPan: 0,
    shouldCorrectPitch: false,
  });
  return (
    <AudioPlayerContext.Provider
      value={{
        nowPlayingSoundObject,
        setNowPlayingSoundObject,
        nowPlayingStatus,
        setNowPlayingStatus,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};
