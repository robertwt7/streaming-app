import {
  nowPlayingMetadataSelector,
  nowPlayingSoundObjectSelector,
  skipSong,
} from "@/src/store/song/songSlice";
import { useAppDispatch, useAppSelector } from "@/src/store/store";
import { Colors } from "@/src/styles/Colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { FunctionComponent } from "react";
import { Link } from "expo-router";
import {
  Pressable,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

export const NowPlaying: FunctionComponent = () => {
  const musicMetadata = useAppSelector(nowPlayingMetadataSelector);
  const soundObject = useAppSelector(nowPlayingSoundObjectSelector);
  const sound = soundObject !== null ? soundObject() : null;
  const dispatch = useAppDispatch();
  const _playAsync = async () => {
    sound?.playAsync();
  };

  const _pause = () => {
    sound?.pauseAsync();
  };

  //   const _renderPlayPauseButton = () => {
  //     let onPress = _pause;
  //     let iconName = "pause";

  //     if (!props.isPlaying) {
  //       onPress = _play;
  //       iconName = "play";
  //     }

  //     return (
  //       <TouchableOpacity onPress={onPress} disabled={!props.isLoaded}>
  //         <Ionicons
  //           name={iconName as "pause" | "play"}
  //           style={[styles.icon, styles.playPauseIcon]}
  //         />
  //       </TouchableOpacity>
  //     );
  //   };

  const _renderForwardButton = () => {
    let onPress = () => dispatch(skipSong());

    return (
      <TouchableOpacity onPress={onPress}>
        <Ionicons
          name={"play-forward"}
          style={[styles.icon, styles.playPauseIcon]}
        />
      </TouchableOpacity>
    );
  };
  return musicMetadata === null ? null : (
    <View className="fixed bottom-5 mx-4 shadow-md border-white rounded-xl bg-white">
      <Link href="/(tabs)" asChild>
        <Pressable
          className={`flex flex-row p-4 items-center active:opacity-50`}
        >
          <View>
            <MaterialIcons size={20} name="music-note" color={Colors.primary} />
          </View>
          <View className="flex flex-1 ml-4">
            <View className="flex flex-row justify-between items-center">
              <View className="flex-1">
                <Text numberOfLines={1} className="font-bold overflow-hidden">
                  {musicMetadata.name}
                </Text>
                <Text
                  numberOfLines={1}
                  className="text-gray-500 overflow-hidden"
                >
                  {musicMetadata.artist.map(
                    (artist, i) =>
                      `${artist.name} ${i < musicMetadata.artist.length - 1 ? "," : ""}`,
                  )}
                </Text>
              </View>
              <View>
                {/* {_renderPlayPauseButton()} */}
                {_renderForwardButton()}
              </View>
            </View>
          </View>
        </Pressable>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    color: Colors.primary,
  },
  playPauseIcon: {
    fontSize: 34,
  },
});
