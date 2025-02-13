import { FunctionComponent, useEffect, useRef, useState } from "react";
import { StyleProp, ViewStyle } from "react-native";
import {
  Audio,
  AVMetadata,
  AVPlaybackStatus,
  AVPlaybackStatusSuccess,
} from "expo-av";
import { Asset } from "expo-asset";
import { Player } from "../Player";
import { useAppDispatch } from "@/src/store/store";
import {
  rewindSong,
  setSoundObject,
  skipSong,
} from "@/src/store/song/songSlice";

type PlaybackSource =
  | number
  | {
      uri: string;
      overrideFileExtensionAndroid?: string;
      headers?: {
        [fieldName: string]: string;
      };
    }
  | Asset;

interface Props {
  style?: StyleProp<ViewStyle>;
  source: PlaybackSource;
}

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

const isAVPlaybackStatusSuccess = (
  status: AVPlaybackStatus,
): status is AVPlaybackStatusSuccess =>
  Boolean((status as AVPlaybackStatusSuccess).uri);

export const AudioPlayer: FunctionComponent<Props> = ({ style, source }) => {
  const dispatch = useAppDispatch();
  const [sound, setSound] = useState<Audio.Sound | undefined>();
  const [status, setStatus] = useState<Status>({
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
  const prevStatus = useRef<Status | null>(null);
  const [metadata, setMetadata] = useState<AVMetadata>({});
  const updateStateToStatus = (newStatus: AVPlaybackStatus) => {
    if (isAVPlaybackStatusSuccess(newStatus)) {
      console.log("onPlaybackStatusUpdate prevStatus: ", prevStatus.current);
      console.log("onPlaybackStatusUpdate newStatus: ", newStatus);
      setStatus(newStatus);
      prevStatus.current = newStatus;
    } else {
      setStatus({
        ...status,
        errorMessage: newStatus.error,
      });
    }
  };

  const updateMetadata = (metadata: AVMetadata) => {
    setMetadata(metadata);
  };

  useEffect(() => {
    const _loadSoundAsync = async () => {
      if (sound) {
        console.log("Unloading Sound");
        await sound.unloadAsync();
      }
      console.log("Load sound async");
      const soundObject = new Audio.Sound();
      try {
        await soundObject.loadAsync(source, {
          progressUpdateIntervalMillis: 500,
        });
        soundObject.setOnPlaybackStatusUpdate(updateStateToStatus);
        soundObject.setOnMetadataUpdate(updateMetadata);
        const status = await soundObject.getStatusAsync();
        updateStateToStatus(status);
        setSound(soundObject);
        soundObject?.playAsync();
        // dispatch(setSoundObject(() => soundObject));
      } catch (e) {
        console.error("Error loading sound", e);
      }
    };
    _loadSoundAsync();
  }, [source]);

  /**
   * TODO: do we need to clean this up? cleaning this up is causing the player screen to not load the audio automatically
   * The problem is because when we switch to other tab, then this component is unmounted, and the sound is unloaded
   */
  // useEffect(() => {
  //   return sound
  //     ? () => {
  //         console.log("Unloading Sound");
  //         sound.unloadAsync();
  //       }
  //     : undefined;
  // }, [sound]);

  const _skipSong = () => {
    dispatch(skipSong());
  };

  const _rewindSong = () => {
    dispatch(rewindSong());
  };
  const _playAsync = async () => {
    sound?.playAsync();
  };

  const _pauseAsync = async () => {
    _clearJsiAudioSampleCallback();
    sound?.pauseAsync();
  };

  const _replayAsync = async () => sound?.replayAsync();

  const _setPositionAsync = async (position: number) =>
    sound?.setPositionAsync(position);

  const _setIsLoopingAsync = async (isLooping: boolean) =>
    sound?.setIsLoopingAsync(isLooping);

  const _setIsMutedAsync = async (isMuted: boolean) =>
    sound?.setIsMutedAsync(isMuted);

  const _setVolumeAsync = async (volume: number, audioPan?: number) =>
    sound?.setVolumeAsync(volume, audioPan);

  const _setRateAsync = async (
    rate: number,
    shouldCorrectPitch: boolean,
    pitchCorrectionQuality = Audio.PitchCorrectionQuality.Low,
  ) => {
    await sound?.setRateAsync(rate, shouldCorrectPitch, pitchCorrectionQuality);
  };

  const _clearJsiAudioSampleCallback = () => {
    // it throws UnavailabilityError when platform is not supported
    // ignore this, we set it here to null anyway
    try {
      sound?.setOnAudioSampleReceived(null);
    } catch {}
  };

  return (
    <Player
      {...status}
      metadata={metadata}
      style={style}
      playAsync={_playAsync}
      pauseAsync={_pauseAsync}
      replayAsync={_replayAsync}
      setPositionAsync={_setPositionAsync}
      setIsLoopingAsync={_setIsLoopingAsync}
      setRateAsync={_setRateAsync}
      setIsMutedAsync={_setIsMutedAsync}
      setVolume={_setVolumeAsync}
      skipSong={_skipSong}
      rewindSong={_rewindSong}
    />
  );
};
