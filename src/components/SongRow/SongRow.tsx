import { View, Text, Pressable } from "react-native";
import { FunctionComponent } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Song } from "@/src/store/services/coreApi";
import { useAppDispatch } from "@/src/store/store";
import {
  setNowPlayingMetadata,
  setNowPlayingUrl,
} from "@/src/store/song/songSlice";

interface SongRowProps {
  className?: string;
  song: Song;
}
export const SongRow: FunctionComponent<SongRowProps> = ({
  className,
  song,
}) => {
  const dispatch = useAppDispatch();
  const handlePress = (song: Song) => {
    dispatch(setNowPlayingUrl(song.hlsPlaylists[0].url));
    dispatch(setNowPlayingMetadata(song));
  };
  return (
    <Pressable
      className={`flex flex-row p-4 items-center active:opacity-50 ${className}`}
      onPress={() => handlePress(song)}
    >
      <View>
        <MaterialIcons size={20} name="music-note" color="black" />
      </View>
      <View className="flex flex-1 ml-4">
        <View className="flex flex-row justify-between items-center">
          <View className="flex-1">
            <Text numberOfLines={1} className="font-bold overflow-hidden">
              {song.name}
            </Text>
            <Text numberOfLines={1} className="text-gray-500 overflow-hidden">
              {song.artist.map(
                (artist, i) =>
                  `${artist.name} ${i < song.artist.length - 1 ? "," : ""}`,
              )}
            </Text>
          </View>
          <View>
            <MaterialIcons size={20} name="more-vert" color="black" />
          </View>
        </View>
      </View>
    </Pressable>
  );
};
