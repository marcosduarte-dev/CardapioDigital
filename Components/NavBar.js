import { StyleSheet, Text, View } from "react-native";
import { useFonts } from 'expo-font';

export default function NavBar() {

  const [loaded] = useFonts({
    Roboto: require('../assets/fonts/Roboto-Bold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
      <View style={styles.fundo}>
        <Text style={styles.text}>LOGO</Text>
        <Text style={styles.titulo}>CARDAPIO</Text>
        <Text style={styles.text}>MENU</Text>
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
  }
});
