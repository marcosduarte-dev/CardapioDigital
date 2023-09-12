import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import ListagemLanches from "./Components/ListagemLanches";
import CadastroLanches from "./Components/CadastroLanches";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#FFFFFF",
          color: "white",
        },
        headerShown: false,
        headerStyle: { backgroundColor: "black" },
      }}
    >
      <Drawer.Screen name="Cardapio" component={ListagemLanches} />
      <Drawer.Screen name="Cadastro Lanches" component={CadastroLanches} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#091014",
    minHeight: "100%",
  },
});
