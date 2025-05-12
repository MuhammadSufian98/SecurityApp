import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function Header() {

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerInner}>
        <View style={styles.headerCenter}>
          <Image
            source={require("../assets/logo.png")}
            style={styles.headerLogo}
          />
          <Text style={styles.headerText}>Home Security</Text>
        </View>

        <View style={{ width: 40 }} />
      </View>
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
});
