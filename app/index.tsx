import { AudioScreen } from "@/src/components/AudioScreen";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="justify-center items-center flex flex-1">
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <AudioScreen />
    </View>
  );
}
