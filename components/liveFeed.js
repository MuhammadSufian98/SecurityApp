import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRoute } from "@react-navigation/native";

export default function LiveFeed() {
  const route = useRoute();
  const { cameraTitle } = route.params || {};
  const [selectedCam, setSelectedCam] = useState(cameraTitle || "Front Porch");

  const handleCameraChange = (cam) => {
    setSelectedCam(cam);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Live Camera Viewer</Text>

      <View style={styles.videoPlaceholder}>
        <Text style={styles.videoText}>[ {selectedCam} Feed Placeholder ]</Text>
      </View>

      <View style={styles.buttonRow}>
        {["Front Porch", "Backyard", "Garage"].map((cam) => (
          <TouchableOpacity
            key={cam}
            style={[
              styles.button,
              selectedCam === cam && styles.selectedButton,
            ]}
            onPress={() => handleCameraChange(cam)}
          >
            <Text
              style={[
                styles.buttonText,
                selectedCam === cam && styles.selectedText,
              ]}
            >
              {cam}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    color: "#1F2937",
  },
  videoPlaceholder: {
    width: "100%",
    height: Dimensions.get("window").height * 0.3,
    backgroundColor: "#D1D5DB",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  videoText: {
    fontSize: 16,
    color: "#4B5563",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    backgroundColor: "#E5E7EB",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  selectedButton: {
    backgroundColor: "#4338CA",
  },
  buttonText: {
    fontSize: 16,
    color: "#1F2937",
    fontWeight: "600",
  },
  selectedText: {
    color: "#ffffff",
  },
});
