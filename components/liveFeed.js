import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { Video } from "expo-av";

export default function liveFeed() {
  const video = useRef(null);
  const [selectedCam, setSelectedCam] = useState("Front Porch");

  const handleCameraChange = (cam) => {
    setSelectedCam(cam);
  };

  return (
    <ScrollView style={{ marginBottom: 50 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Live Camera Viewer</Text>

        <View style={styles.videoColumn}>
          {["Front Porch", "Backyard", "Garage", "Nothin"].map((cam) => (
            <View key={cam} style={styles.videoContainer}>
              <Text style={styles.cameraTitle}>{cam}</Text>
              <View style={styles.videoPlaceholder}>
                <Video
                  ref={video}
                  style={styles.video}
                  source={{
                    uri: "https://www.w3schools.com/html/mov_bbb.mp4",
                  }}
                  useNativeControls
                  resizeMode="contain"
                  isLooping
                />
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    color: "#1F2937",
  },
  videoColumn: {
    width: "100%",
    paddingHorizontal: 10,
  },
  videoContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  cameraTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#4B5563",
  },
  videoPlaceholder: {
    width: "100%",
    height: Dimensions.get("window").height * 0.2,
    backgroundColor: "#D1D5DB",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});
