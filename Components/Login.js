import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import NavBar from "./NavBar";
import { getFirestore } from "firebase/firestore";

const auth = getAuth();

export default function Login({ updateUserLoggedIn, navigation }) {
  const [value, setValue] = useState({
    email: "",
    password: "",
    error: "",
  });

  async function signIn() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);

      updateUserLoggedIn(true);
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.navigate("Cardapio");
      }
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
    }
  }

  return (
    <View style={styles.mainContainer}>
      <NavBar navigation={navigation} nome="Login"/>
      <View style={styles.container}>
        {!!value.error && (
          <View style={styles.error}>
            <Text>{value.error}</Text>
          </View>
        )}

        <View style={styles.controls}>
          <Input
            placeholder="Email"
            containerStyle={styles.control}
            value={value.email}
            onChangeText={(text) => setValue({ ...value, email: text })}
            leftIcon={<Icon style={{color: 'white'}} name="envelope" size={16} />}
          />

          <Input
            placeholder="Password"
            containerStyle={styles.control}
            value={value.password}
            onChangeText={(text) => setValue({ ...value, password: text })}
            secureTextEntry={true}
            leftIcon={<Icon style={{color: 'white'}} name="key" size={16} />}
          />

          <Button
            title="Logar"
            buttonStyle={styles.control}
            onPress={signIn}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#091014",
  },
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#091014",
    alignItems: "center",
    justifyContent: "center",
  },

  controls: {
    flex: 1,
  },

  control: {
    height: 50,
    width: 350,
    marginTop: 15,
    color: "white",
  },

  error: {
    marginTop: 10,
    padding: 10,
    color: "#fff",
    backgroundColor: "#D54826FF",
  },
});
