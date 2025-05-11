import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Video } from "expo-av";

export default function LiveFeed() {
  const video = useRef(null);
  const cameraFeeds = [
    {
      name: "Front Porch",
      uri: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      name: "Backyard",
      uri: "https://www.w3schools.com/html/movie.mp4",
    },
    {
      name: "Garage",
      uri: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      name: "Driveway",
      uri: "https://www.w3schools.com/html/movie.mp4",
    },
  ];

  return (
    <ScrollView style={{ marginBottom: 50 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Live Camera Viewer</Text>

        <View style={styles.videoColumn}>
          {cameraFeeds.map((cam) => (
            <View key={cam.name} style={styles.videoContainer}>
              <Text style={styles.cameraTitle}>{cam.name}</Text>
              <View style={styles.videoPlaceholder}>
                <Video
                  ref={video}
                  style={styles.video}
                  source={{ uri: cam.uri }}
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
    borderRadius: 10,
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
