import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native";
import Header from "./components/header";
import MainBody from "./components/mainBody";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          header: () => <Header />,
        }}
      >
        <Stack.Screen name="Main" component={MainBody} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
