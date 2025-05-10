import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function MainBody() {
  const screenWidth = Dimensions.get("window").width;
  const isSmallScreen = screenWidth <= 650;
  const navigation = useNavigation();

  const renderAlarm = (title, subtitle, imageSrc, key) => (
    <View
      style={[styles.gridItem, { width: isSmallScreen ? "100%" : "48%" }]}
      key={key}
    >
      <Image source={imageSrc} style={styles.image} />
      <Text style={styles.headingImage}>{title}</Text>
      <Text style={styles.subHeadingImage}>{subtitle}</Text>
      <View style={{ flexDirection: "row", gap: 40 }}>
        <TouchableOpacity>
          <Image
            source={require("../assets/bell-green.png")}
            style={styles.TempImage}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../assets/disabled.png")}
            style={styles.TempImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCamera = (title, subtitle, imageSrc, key) => (
    <View
      style={[styles.gridItem, { width: isSmallScreen ? "100%" : "48%" }]}
      key={key}
    >
      <Image source={imageSrc} style={styles.image} />
      <Text style={styles.headingImage}>{title}</Text>
      <Text style={styles.subHeadingImage}>{subtitle}</Text>
      <View style={styles.CameraBTNContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("liveFeed", {
              cameraTitle: title,
            })
          }
          style={styles.button}
        >
          <Text style={styles.buttonText}>Live Feed</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.VideoCamButton}>
          <Image
            source={require("../assets/video-cameraIcon.png")}
            style={styles.VideoCameraIcon}
          />
        </TouchableOpacity> */}
      </View>
    </View>
  );

  return (
    <ScrollView style={{ marginBottom: 50 }}>
      <View style={styles.mainBodyContainer}>
        <View style={styles.headingContainer}>
          <Image
            source={require("../assets/shield.png")}
            style={styles.bulbImage}
          />
          <Text style={styles.heading}>Security</Text>
        </View>

        <View style={styles.gridContainer}>
          {renderAlarm(
            "Front Door Lock",
            "August Smart Lock Pro",
            require("../assets/frontDoorLock.jpg"),
            "FrontDoorLock"
          )}
          {renderAlarm(
            "Alarm System",
            "SimpliSafe Home Security",
            require("../assets/alarmSystem.jpg"),
            "kitchen"
          )}
          {renderAlarm(
            "Bedroom",
            "Nanoleaf Essentials",
            require("../assets/garageDoorSensor.jpg"),
            "bedroom"
          )}
        </View>
      </View>

      <View style={styles.mainBodyContainer}>
        <View style={styles.headingContainer}>
          <Image
            source={require("../assets/video-camera.png")}
            style={styles.TempImage}
          />
          <Text style={styles.heading}>Cameras</Text>
        </View>
        <View style={styles.gridContainer}>
          {renderCamera(
            "Front Porch",
            "Arlo Pro 4",
            require("../assets/frontPorch.jpg"),
            "living"
          )}
          {renderCamera(
            "Backyard",
            "Nest Cam IQ Outdoor",
            require("../assets/backyardCam.jpg"),
            "bedroom"
          )}
          {renderCamera(
            "Garage",
            "Ring Indoor Cam",
            require("../assets/garageCam.jpg"),
            "office"
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainBodyContainer: {
    width: "100%",
    padding: 20,
    marginTop: 70,
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
  bulbImage: {
    width: 30,
    height: 30,
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
    fontSize: 16,
    fontWeight: "400",
  },
  subHeadingImage: {
    fontSize: 12,
    fontWeight: "300",
    color: "#6B7280",
    paddingBottom: 30,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 10,
  },
  TempImage: {
    width: 35,
    height: 40,
  },
  CameraBTNContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  button: {
    width: 100,
    height: 40,
    backgroundColor: "#4338CA",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  //   VideoCamButton: {
  //     width: 70,
  //     height: 40,
  //     backgroundColor: "#BDC1C9",
  //     borderRadius: 10,
  //     padding: 20,
  //     justifyContent: "center",
  //     alignItems: "center",
  //   },
  //   VideoCameraIcon: {
  //     width: 40,
  //     height: 40,
  //     padding: 20,
  //   },
});
