import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Button } from "react-native";
import firebase from "../../database/firebase";
import { ListItem, Avatar } from "@rneui/themed";
const UsersList = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    let abortController = new AbortController();
    firebase.db.collection("users").onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.docs.forEach((doc) => {
        const { name, email, number } = doc.data();
        const id = doc.id;
        users.push({ id: id, name: name, email: email, number: number });
      });
      setUsers(users);
    });
    abortController.abort();
  }, []);
  return (
    <ScrollView>
      <Button
        title="Create User"
        onPress={() => navigation.navigate("CreateUserScreen")}
      />

      {users.map((user) => {
        return (
          <ListItem
            key={user.id}
            onPress={() => {
              navigation.navigate("UsersDetailScreen", { userID: user.id });
            }}
            bottomDivider
          >
            <ListItem.Chevron />
            <Avatar
              rounded
              source={{
                uri: "https://scontent.fntr5-1.fna.fbcdn.net/v/t39.30808-6/275760960_5336968206321620_2186126555187511708_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=_fxqJgLuDrIAX8pKV2d&_nc_ht=scontent.fntr5-1.fna&oh=00_AT-tj3OXB5ylkrawzlNDuG2CHJW8BXKfoM4oYAIdzOWUNw&oe=629268DE",
              }}
            />
            <ListItem.Content>
              <ListItem.Title>{user.name}</ListItem.Title>
              <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};
export default UsersList;
