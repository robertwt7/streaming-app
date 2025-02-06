import { FunctionComponent } from "react";
import { ScrollView, View } from "react-native";
import { SongRow } from "../SongRow";
import { useGetAllSongQuery } from "@/src/store/services/song";
import { Song } from "@/src/store/services/types";

export const LibraryScreen: FunctionComponent = () => {
  const { data, error, isSuccess } = useGetAllSongQuery();
  return (
    <ScrollView className="flex flex-1">
      {isSuccess &&
        data.map((song: Song, i) => (
          <View key={song.id}>
            <SongRow song={song} />
            {i !== data.length - 1 && (
              <View className="mx-4 border-b border-gray-500" />
            )}
          </View>
        ))}
    </ScrollView>
  );
};
