import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native";
import Header from "./components/header";
import MainBody from "./components/mainBody";
import LiveFeed from "./components/liveFeed";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <Header />

        <Stack.Navigator
          initialRouteName="Main"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Main" component={MainBody} />
          <Stack.Screen name="liveFeed" component={LiveFeed} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}
