import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "./components/header";
import MainBody from "./components/mainBody";
import liveFeed from "./components/liveFeed";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Header />
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Main" component={MainBody} />
        <Stack.Screen name="liveFeed" component={liveFeed} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
