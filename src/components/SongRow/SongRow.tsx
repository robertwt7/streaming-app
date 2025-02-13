import { View, Text, Pressable } from "react-native";
import { FunctionComponent } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Song } from "@/src/store/services/coreApi";
import { useAppDispatch } from "@/src/store/store";
import { setNowPlayingIndex } from "@/src/store/song/songSlice";
import { Colors } from "@/src/styles/Colors";

interface SongRowProps {
  className?: string;
  song: Song;
  index: number;
  onPress: () => void;
}
export const SongRow: FunctionComponent<SongRowProps> = ({
  className,
  song,
  index,
  onPress,
}) => {
  const dispatch = useAppDispatch();
  const handlePress = () => {
    dispatch(setNowPlayingIndex(index));
    onPress();
  };
  return (
    <Pressable
      className={`flex flex-row p-4 items-center active:opacity-50 ${className}`}
      onPress={handlePress}
    >
      <View>
        <MaterialIcons size={20} name="music-note" color={Colors.primary} />
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
            <MaterialIcons size={20} name="more-vert" color={Colors.primary} />
          </View>
        </View>
      </View>
    </Pressable>
  );
};
