import { StyleSheet, Text, View, Image } from "react-native";
import { useFonts } from "expo-font";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function NavBar(props) {
  const [loaded] = useFonts({
    Roboto: require("../assets/fonts/Roboto-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.fundo}>
      <Image
        source={require("../assets/burger.png")}
        style={{ width: 50, height: 50 }}
      />
      <Text style={styles.titulo}>{props.nome}</Text>
      {props.navigation && (
        <Ionicons
          onPress={() => props.navigation.toggleDrawer()}
          name="menu"
          size={38}
          color="white"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  fundo: {
    marginTop: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#091014",
    padding: 10,
    height: "12%",
  },
  text: {
    color: "white",
  },
  titulo: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 36,
    color: "#FFD818",
  },
});
