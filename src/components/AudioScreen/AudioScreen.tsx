import { useEffect } from "react";
import { AudioPlayer } from "../AudioPlayer";
import { Audio } from "expo-av";
import { PixelRatio, StyleSheet, View, Text } from "react-native";
import { useAppSelector } from "@/src/store/store";
import {
  nowPlayingMetadataSelector,
  nowPlayingSelector,
} from "@/src/store/song/songSlice";
import { Image } from "expo-image";
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export const AudioScreen = () => {
  const musicUri = useAppSelector(nowPlayingSelector);
  const musicMetadata = useAppSelector(nowPlayingMetadataSelector);

  useEffect(() => {
    Audio.setIsEnabledAsync(true);
  }, []);

  return (
    <View className="flex flex-1 p-8">
      <View className="flex-1 justify-center">
        <Image
          contentFit="cover"
          placeholder={{ blurhash }}
          source="artwork"
          transition={1000}
          style={styles.image}
        />
        <AudioPlayer style={styles.player} source={{ uri: musicUri ?? "" }} />

        <Text className="text-2xl font-bold text-primary text-center">
          {musicMetadata?.name}
        </Text>
        <Text className="text-xl text-primary text-center">
          {musicMetadata?.artist?.[0].name ?? "Unknown Artist"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  player: {
    borderBottomWidth: 1.0 / PixelRatio.get(),
    borderBottomColor: "#cccccc",
    width: "100%",
  },
  image: {
    flex: 1,
    width: "100%",
  },
});
