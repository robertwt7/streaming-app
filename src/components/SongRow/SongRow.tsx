import { View, Text, Pressable } from "react-native";
import { FunctionComponent } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Song } from "@/src/store/services/types";

interface SongRowProps {
  className?: string;
  song: Song;
}
export const SongRow: FunctionComponent<SongRowProps> = ({
  className,
  song,
}) => {
  return (
    <Pressable
      className={`flex flex-row p-4 items-center active:opacity-50 ${className}`}
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
            <Text className="text-gray-500">Artist Name</Text>
          </View>
          <View>
            <MaterialIcons size={20} name="more-vert" color="black" />
          </View>
        </View>
      </View>
    </Pressable>
  );
};
