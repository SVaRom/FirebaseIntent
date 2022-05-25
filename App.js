import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

//* Components
import UsersDetailScreen from "./src/screens/UserDetailScreen";
import UsersList from "./src/screens/UserList";
import CreateUserScreen from "./src/screens/CreateUserScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="UserList" component={UsersList} />
        <Stack.Screen name="CreateUserScreen" component={CreateUserScreen} />
        <Stack.Screen name="UsersDetailScreen" component={UsersDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
