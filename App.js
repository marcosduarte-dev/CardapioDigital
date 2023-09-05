import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import NavBar from "./Components/NavBar";
import ListagemLanches from "./Components/ListagemLanches";
import CadastroLanches from "./Components/CadastroLanches";
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavBar></NavBar>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ListagemLanches" options={{ headerShown: false }} component={ListagemLanches} />
          <Stack.Screen name="CadastroLanches" options={{ headerShown: false }} component={CadastroLanches} />
        </Stack.Navigator>
      </NavigationContainer>
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
