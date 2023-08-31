import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import NavBar from "./Components/NavBar";
import ListagemLanches from "./Components/ListagemLanches";

export default function App() {
  return (
    <View style={styles.container}>
      <NavBar></NavBar>
      <ListagemLanches></ListagemLanches>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#091014",
    minHeight: "100%",
  },
});
