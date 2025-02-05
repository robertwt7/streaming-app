import { FunctionComponent } from "react";
import { ScrollView, Text } from "react-native";
import { SongRow } from "../SongRow";

export const LibraryScreen: FunctionComponent = () => {
  return (
    <ScrollView className="flex flex-1">
      {Array(10)
        .fill(0)
        .map((_, i) => (
          <SongRow className="border" key={i} />
        ))}
    </ScrollView>
  );
};
