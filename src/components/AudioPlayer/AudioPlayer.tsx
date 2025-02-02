import { FunctionComponent, useEffect, useRef, useState } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import {
  Audio,
  AVMetadata,
  AVPlaybackStatus,
  AVPlaybackStatusSuccess,
} from "expo-av";
import { env } from "@/src/config/env";
import { Asset } from "expo-asset";
import { Player } from "../Player";
import { JsiAudioBar } from "../JsiAudioBar/JsiAudioBar";

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
  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      {
        uri: `${env.CDN_URL}/music/1/playlist.m3u8`,
      },
      {
        shouldPlay: true,
      },
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

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
      } catch (e) {
        console.error("Error loading sound", e);
      }
    };

    _loadSoundAsync();

    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound, source]);

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
    <View className="flex flex-1 justify-center items-center">
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
        extraIndicator={
          <JsiAudioBar isPlaying={status.isPlaying} sound={sound} />
        }
      />
    </View>
  );
};
