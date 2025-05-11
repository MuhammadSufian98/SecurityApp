import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigation = useNavigation();

  const goToHomeAndReset = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Main" }],
    });
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerInner}>
        <TouchableOpacity
          onPress={() => setIsMenuOpen(!isMenuOpen)}
          style={styles.menuIconContainer}
        >
          <Image
            source={require("../assets/menu.png")}
            style={styles.menuIcon}
          />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Image
            source={require("../assets/logo.png")}
            style={styles.headerLogo}
          />
          <Text style={styles.headerText}>Smart Home Control</Text>
        </View>

        <View style={{ width: 40 }} />
      </View>

      {isMenuOpen && (
        <View style={styles.pageLinks}>
          <TouchableOpacity onPress={() => goToHomeAndReset()}>
            <Text style={styles.links}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.links}>Security</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.links}>Cameras</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={styles.links}
              onPress={() => navigation.navigate("liveFeed")}
            >
              View Camera
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  headerInner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  headerCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  headerLogo: {
    width: 50,
    height: 50,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  menuIconContainer: {
    padding: 5,
  },
  menuIcon: {
    width: 30,
    height: 30,
  },
  pageLinks: {
    position: "absolute",
    alignItems: "center",
    top: 90,
    left: 0,
    right: 0,
    backgroundColor: "#f0f0f0",
    padding: 10,
    zIndex: 2,
  },
  links: {
    color: "black",
    textDecorationLine: "none",
    marginBottom: 10,
    fontSize: 18,
  },
});
