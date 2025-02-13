import { useEffect } from "react";
import { AudioPlayer } from "../AudioPlayer";
import { Audio } from "expo-av";
import { StyleSheet, View, Text } from "react-native";
import { useAppSelector } from "@/src/store/store";
import {
  nowPlayingHlsSelector,
  nowPlayingMetadataSelector,
} from "@/src/store/song/songSlice";
import { Image } from "expo-image";
import artwork from "@/assets/images/artwork.png";
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export const AudioScreen = () => {
  const musicUri = useAppSelector(nowPlayingHlsSelector);
  const musicMetadata = useAppSelector(nowPlayingMetadataSelector);
  useEffect(() => {
    Audio.setIsEnabledAsync(true);
  }, []);

  return (
    <View className="flex flex-1 p-8">
      <View className="p-12 flex-1 items-center">
        <Image
          contentFit="cover"
          placeholder={{ blurhash }}
          source={artwork}
          transition={1000}
          style={styles.image}
        />
      </View>

      <View className="mt-4 flex-1">
        <View>
          <Text className="text-lg font-bold text-primary">
            {musicMetadata?.name}
          </Text>
          <Text className="text-lg text-primary">
            {musicMetadata?.artist?.[0].name ?? "Unknown Artist"}
          </Text>
        </View>
        <View className="mt-4">
          <AudioPlayer style={styles.player} source={{ uri: musicUri ?? "" }} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  player: {},
  image: {
    flex: 1,
    width: "100%",
    borderRadius: 10,
    aspectRatio: 1,
  },
});
