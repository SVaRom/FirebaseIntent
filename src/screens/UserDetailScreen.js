import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import firebase from "../../database/firebase";
const UsersDetailScreen = ({ navigation, route }) => {
  const initialState = {
    id: "",
    name: "",
    email: "",
    number: "",
  };

  const [user, setUser] = useState(initialState);
  const openConfirmationAlert = () => {
    Alert.alert(
      "Removing the User",
      "Are you sure?",
      [
        { text: "Yes", onPress: () => deleteUser() },
        { text: "No", onPress: () => console.log("canceled") },
      ],
      {
        cancelable: true,
      }
    );
  };
  const getUserById = async (userid) => {
    console.log(userid);
    const dbRef = firebase.db.collection("users").doc(userid);
    const doc = await dbRef.get();
    const user = doc.data();
    setUser({ ...user, id: doc.id });
    console.log(user);
  };
  useEffect(() => {
    getUserById(route.params.userID);
  }, []);
  const handleChangeText = (name, value) => {
    setUser({ ...user, [name]: value });
  };
  const deleteUser = async () => {
    const dbRef = firebase.db.collection("users").doc(user.id);
    await dbRef.delete();
    navigation.navigate("UserList");
  };
  const updateUser = async () => {
    const dbRef = firebase.db.collection("users").doc(user.id);
    await dbRef.set({
      name: user.name,
      email: user.email,
      number: user.number,
    });
    setUser(initialState);
    navigation.navigate("UserList");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          value={user.name}
          placeholder="Name User"
          onChangeText={(value) => handleChangeText("name", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          value={user.email}
          placeholder="Email User"
          onChangeText={(value) => handleChangeText("email", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          value={user.number}
          placeholder="Phone User"
          onChangeText={(value) => handleChangeText("number", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Button title="Update User" color="#72a29b" onPress={updateUser} />
      </View>
      <View style={styles.inputGroup}>
        <Button title="Delete User" onPress={() => openConfirmationAlert()} />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  btn: {
    marginBottom: 7,
  },
});
export default UsersDetailScreen;
