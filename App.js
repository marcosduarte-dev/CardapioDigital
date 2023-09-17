import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import ListagemLanches from "./Components/ListagemLanches";
import CadastroLanches from "./Components/CadastroLanches";
import Carrinho from "./Components/Carrinho";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator()

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        {/* <DrawerNavigator /> */}
        <StackNavigator />
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
}

// function DrawerNavigator() {
//   return (
//     <Drawer.Navigator
//       screenOptions={{
//         drawerStyle: {
//           backgroundColor: "#FFFFFF",
//           color: "white",
//         },
//         headerShown: false,
//         headerStyle: { backgroundColor: "black" },
//       }}
//     >
//       <Drawer.Screen name="Cardapio" component={ListagemLanches} />
//       <Drawer.Screen name="Carrinho" component={Carrinho} />
//       <Drawer.Screen name="Cadastro Lanches" component={CadastroLanches} />
//     </Drawer.Navigator>
//   );
// }

function StackNavigator(){
  return(
    <Stack.Navigator
    initialRouteName="Cardapio"
    screenOptions={{
      drawerStyle: {
        backgroundColor: "#FFFFFF",
        color: "white",
      },
      headerShown: false,
      headerStyle: { backgroundColor: "black" },
    }}
    >
      <Stack.Screen name="Cardapio" component={ListagemLanches}/>
      <Stack.Screen name="Carrinho" component={Carrinho}/>
      <Stack.Screen name="Cadastro Lanches" component={CadastroLanches}/>
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#091014",
    minHeight: "100%",
  },
});
