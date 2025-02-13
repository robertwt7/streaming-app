import { FunctionComponent } from "react";
import { ScrollView, View, Text } from "react-native";
import { SongRow } from "../SongRow";
import { useGetAllSongQuery } from "@/src/store/services/coreApi";
import { Song } from "@/src/store/services/coreApi";
import { useAppDispatch } from "@/src/store/store";
import { setQueue } from "@/src/store/song/songSlice";
import { NowPlaying } from "../NowPlaying";

export const LibraryScreen: FunctionComponent = () => {
  const { data, error, isSuccess } = useGetAllSongQuery();
  const dispatch = useAppDispatch();

  const handlePress = (): void => {
    if (isSuccess) {
      dispatch(setQueue(data));
    }
  };
  return (
    <>
      <ScrollView className="flex flex-1">
        {isSuccess &&
          data.map((song: Song, i) => (
            <View key={song.id}>
              <SongRow song={song} index={i} onPress={handlePress} />
              {i !== data.length - 1 && (
                <View className="mx-4 border-b border-gray-300" />
              )}
            </View>
          ))}
      </ScrollView>
      <NowPlaying />
    </>
  );
};
