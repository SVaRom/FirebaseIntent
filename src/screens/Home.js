import React from "react";
import { Text, Button, View } from "react-native";
const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Puta mal parida de mierda</Text>
      <Button
        title="Jump"
        onPress={() => {
          navigation.push("Details");
        }}
      />
    </View>
  );
};
export default HomeScreen;
