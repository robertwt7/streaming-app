import { useEffect, useState } from "react";
import { AudioPlayer } from "../AudioPlayer";
import { Audio } from "expo-av";
import { PixelRatio, StyleSheet, View } from "react-native";
import { env } from "@/src/config/env";

export const AudioScreen = () => {
  const [musicUri, setMusicUri] = useState<string>(
    `${env.CDN_URL}/music/1/playlist.m3u8`,
  );
  useEffect(() => {
    Audio.setIsEnabledAsync(true);
  }, []);

  return (
    <View className="flex flex-1">
      <AudioPlayer style={styles.player} source={{ uri: musicUri }} />
    </View>
  );
};

const styles = StyleSheet.create({
  player: {
    borderBottomWidth: 1.0 / PixelRatio.get(),
    borderBottomColor: "#cccccc",
  },
});
