import { View, Text, Pressable } from "react-native";
import { FunctionComponent } from "react";
import { MaterialIcons } from "@expo/vector-icons";

interface SongRowProps {
  className?: string;
}
export const SongRow: FunctionComponent<SongRowProps> = ({ className }) => {
  return (
    <Pressable
      className={`flex flex-row p-4 items-center active:opacity-50 ${className}`}
    >
      <View>
        <MaterialIcons size={20} name="music-note" color="black" />
      </View>
      <View className="flex flex-1 ml-4">
        <View className="flex flex-row justify-between items-center">
          <View>
            <Text className="font-bold">Song Name</Text>
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
