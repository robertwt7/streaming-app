import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { FunctionComponent } from "react";
import { StyleSheet, View, Button } from "react-native";

const videoSource =
  "http://localhost:3000/music/2/AFTER%20I%20SAY%20I'M%20SORRY%20(WHAT%20CAN%20I%20SAY)%20-%20FRANK%20BRAIDWOOD.mp3";

export const VideoScreen: FunctionComponent = () => {
  const player = useVideoPlayer(
    {
      uri: videoSource,
    },
    (player) => {
      player.loop = true;
      player.play();
    },
  );

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  return (
    <View style={styles.contentContainer}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />
      <View style={styles.controlsContainer}>
        <Button
          title={isPlaying ? "Pause" : "Play"}
          onPress={() => {
            if (isPlaying) {
              player.pause();
            } else {
              player.play();
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
});
