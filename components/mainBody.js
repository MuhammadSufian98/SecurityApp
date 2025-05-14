import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import { WebView } from "react-native-webview";
import axios from "axios";

export default function MainBody() {
  const video = useRef(null);
  const [showLive, setShowLive] = useState(false);
  const [sensorCount, setSensorCount] = useState(0);
  const [logs, setLogs] = useState([]);

  const cameraFeeds = [
    {
      name: "Front Porch",
      uri: "http://192.168.10.120",
    },
  ];
  const [currentCamera, setCurrentCamera] = useState(cameraFeeds[0]);

  const screenWidth = Dimensions.get("window").width;
  const isSmallScreen = screenWidth <= 650;

  // Fetch sensor logs from the backend
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get(
          "https://security-app-backend.vercel.app/sensorLog"
        );
        setLogs(response.data);
        setSensorCount(response.data.length); // Update sensor count
      } catch (error) {
        console.error("Error fetching sensor logs:", error);
      }
    };

    fetchLogs();
  }, [sensorCount]);

  const renderAlarm = (title, key) => {
    const sendAlarmStatus = async (status) => {
      try {
        const response = await axios.post(
          "https://security-app-backend.vercel.app/alarmStatus",
          { status },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.data.success) {
          Alert.alert(
            "Success",
            `Alarm ${status ? "Activated" : "Deactivated"}`
          );
        }
      } catch (error) {
        console.error("Error updating alarm status:", error);
        Alert.alert("Error", "Could not update alarm status.");
      }
    };

    return (
      <View
        style={[
          styles.gridItem,
          { width: isSmallScreen ? "100%" : "48%", gap: 10 },
        ]}
        key={key}
      >
        <Text style={styles.headingImage}>{title}</Text>
        <View style={{ flexDirection: "row", gap: 20 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => sendAlarmStatus(true)}
          >
            <Text style={styles.buttonText}>Activate</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => sendAlarmStatus(false)}
          >
            <Text style={styles.buttonText}>Deactivate</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderCamera = (title, key) => (
    <View
      style={[
        styles.gridItem,
        { width: isSmallScreen ? "100%" : "48%", gap: 10 },
      ]}
      key={key}
    >
      <Text style={styles.headingImage}>{title}</Text>
      <View style={styles.CameraBTNContainer}>
        <TouchableOpacity
          onPress={() => setShowLive((prev) => !prev)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {showLive ? "Hide Feed" : "Live Feed"}
          </Text>
        </TouchableOpacity>
      </View>

      {showLive && (
        <View style={styles.videoContainer}>
          <Text style={styles.cameraTitle}>{currentCamera.name}</Text>
          <View style={styles.videoPlaceholder}>
            <WebView style={styles.video} source={{ uri: currentCamera.uri }} />
          </View>
        </View>
      )}
    </View>
  );

  return (
    <ScrollView style={{ marginBottom: 50 }}>
      <View style={styles.mainBodyOutter}>
        <View style={[styles.topRightButtonContainer, { marginTop: 70 }]}>
          <TouchableOpacity
            style={styles.topRightButton}
            onPress={() => {
              if (sensorCount === 0) {
                Alert.alert("No Sensor Triggered Yet.");
              } else {
                Alert.alert(
                  "Sensor Triggered",
                  "Sensor Triggered.\n".repeat(sensorCount).trim()
                );
              }
            }}
          >
            <Text style={styles.topRightButtonText}>Show Logs</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.mainBodyContainer, { marginTop: 70 }]}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Security</Text>
          </View>

          <View style={styles.gridContainer}>
            {renderAlarm("Alarm", "frontDoorLock")}
          </View>

          <View style={styles.sensorCountContainer}>
            <Text style={styles.sensorCountText}>
              Sensor Triggered: {sensorCount} time{sensorCount === 1 ? "" : "s"}
            </Text>
          </View>
        </View>

        <View style={[styles.mainBodyContainer]}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Cameras</Text>
          </View>
          <View style={styles.gridContainer}>
            {renderCamera("Camera", "living")}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainBodyOutter: {
    width: "100%",
    paddingTop: 30,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
  },
  topRightButtonContainer: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
  },

  topRightButton: {
    backgroundColor: "#EF4444",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    elevation: 4,
  },

  topRightButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  mainBodyContainer: {
    width: "100%",
    padding: 20,
    justifyContent: "flex-start",
    zIndex: 0,
  },
  headingContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    marginBottom: 20,
    gap: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "600",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
    paddingHorizontal: 10,
  },
  gridItem: {
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 40,
    paddingBottom: 20,
  },
  headingImage: {
    fontSize: 24,
    fontWeight: "500",
  },
  CameraBTNContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  button: {
    gap: 20,
    width: 100,
    height: 40,
    backgroundColor: "#4338CA",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  videoContainer: {
    marginBottom: 20,
    alignItems: "center",
    width: "100%",
  },
  cameraTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#4B5563",
  },
  videoPlaceholder: {
    width: "100%",
    height: Dimensions.get("window").height * 0.25,
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
  // New styles for sensor count
  sensorCountContainer: {
    marginTop: 10,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
  },
  sensorCountText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
});
