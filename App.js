import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import ListagemLanches from "./Components/ListagemLanches";
import CadastroLanches from "./Components/CadastroLanches";
import Carrinho from "./Components/Carrinho";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "./config/firebase";
import { useAuthentication } from "./utils/hooks/useAuthentication";
import Login from "./Components/Login";
import { useState, useEffect } from "react";
import { signOut, getAuth } from "firebase/auth";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function CardapioStack() {
  return (
    <Stack.Navigator
      initialRouteName="Cardapio"
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: "black" },
      }}
    >
      <Stack.Screen name="Cardapio" component={ListagemLanches} />
      <Stack.Screen name="Carrinho" component={Carrinho} />
      <Stack.Screen name="CadastroLanches" component={CadastroLanches} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

function Logout({ updateUserLoggedIn, navigation }) {
  const auth = getAuth();

  const logout = () => {
    signOut(auth);
    updateUserLoggedIn(false);
    navigation.goBack();
  };

  useEffect(() => {
    logout();
  }, []);

  return null;
}

export default function App() {
  var user = useAuthentication();

  const [isUserLoggedIn, setUserLoggedIn] = useState(false);

  const updateUserLoggedIn = (loggedIn) => {
    setUserLoggedIn(loggedIn);
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="CardapioStack"
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#FFFFFF",
            color: "white",
          },
          headerShown: false,
          headerStyle: { backgroundColor: "black" },
          drawerPosition: "right",
        }}
      >
        <Drawer.Screen
          name="CardapioStack"
          component={CardapioStack}
          options={{ title: "Cardápio" }}
        />

        {isUserLoggedIn ? (
          <Drawer.Screen
            name="Cadastro Lanche"
            component={CadastroLanches}
            options={{ title: "Cadastro Lanches" }}
          />
        ) : null}

        {isUserLoggedIn ? (
          <Drawer.Screen name="Logout">
            {(props) => (
              <Logout
                {...props}
                updateUserLoggedIn={updateUserLoggedIn}
              />
            )}
          </Drawer.Screen>
        ) : (
          <Drawer.Screen name="Login" options={{ title: "Login" }}>
            {(props) => (
              <Login {...props} updateUserLoggedIn={updateUserLoggedIn} />
            )}
          </Drawer.Screen>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#091014",
    minHeight: "100%",
  },
});
