import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TextInput, Button } from "react-native";
import firebase from "../../database/firebase";
const CreateUserScreen = ({ navigation }) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    number: "",
  });
  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const SaveNewUser = async () => {
    //! await porque es asincrono y debemos usar async porque es sincronizable a datos nota: podemos agregar un loader
    if (state.name === "") {
      alert("give me a name");
    } else {
      try {
        await firebase.db.collection("users").add({
          name: state.name,
          email: state.email,
          number: state.number,
        });
        alert("SIUUUUUUU");
        navigation.navigate("UsersList");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Name User"
          onChangeText={(value) => handleChangeText("name", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email User"
          onChangeText={(value) => handleChangeText("email", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Phone User"
          onChangeText={(value) => handleChangeText("phone", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Button title="Save User" onPress={SaveNewUser} />
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

export default CreateUserScreen;
