import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import { useFonts } from "expo-font";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import NavBar from "./NavBar";


export default function ListagemLanches({ navigation }) {
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loaded] = useFonts({
    Road_Rage: require("../assets/fonts/RoadRage.ttf"),
    FingerPaint: require("../assets/fonts/FingerPaint-Regular.ttf"),
    RisqueRegular: require("../assets/fonts/Risque-Regular.ttf"),
  });
  const [carrinho, setCarrinho] = useState([]);
  const [carrinhoItens, setCarrinhoItens] = useState()

  


  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://cardapiodigital-4f53e-default-rtdb.firebaseio.com/Lanches/.json"
      );
      const json = await response.json();
      console.log("Buscou os dados!");
      setData(json);
    } catch (error) {
      console.error(error);
    }
  };

  if (!loaded) {
    return null;
  }

  const handleCardPress = (id, lanche, preco) => {

    const itemSelecionado = carrinho.find(item => item.id === id);

    if (itemSelecionado) {
      const novoCarrinho = carrinho.map(item => {
        if (item.id === id) {
          setCarrinhoItens('Hamburguer')
          return { ...item, quantidade: item.quantidade + 1, preco: (item.quantidade + 1) * preco };
        }
        return item;
      });
      setCarrinho(novoCarrinho);
    } else {
      const novoItem = { id: id, lanche: lanche, quantidade: 1, preco: preco };
      setCarrinho([...carrinho, novoItem]);
    }

    setSelectedId(id);
    console.log(id);
    setTimeout(() => {
      setSelectedId(null);
    }, 800);
  };

  const renderIngredientes = (ingredientes, isSelected) => {
    const ingredientesArray = ingredientes.split("/N");

    return ingredientesArray.map((ingrediente, index) => (
      <Text
        key={index}
        style={[
          styles.text,
          styles.ingredientes,
          isSelected && styles.selectedText,
        ]}
      >
        {ingrediente}
      </Text>
    ));
  };

  const calcularPrecoTotal = () => {
    let total = 0;
    carrinho.forEach((item) => {
      total += item.preco;
    });
    return total;
  };



  
  
  return (
    <View style={styles.bg_black}>
      <NavBar navigation={navigation} nome="Cardapio"/>
      <ScrollView style={[{ padding: 15 }, styles.bg_black]}>
        {Object.keys(data).map((id) => {
          const { lanche, preco, ingredientes, imagem } = data[id];
          const isSelected = id === selectedId;
          return (
            <TouchableOpacity
              key={id}
              onPress={() => handleCardPress(id, data[id].lanche, data[id].preco)}
              activeOpacity={0.6}
            >
              <View style={[styles.view, isSelected && styles.selectedView]}>
                <Image
                  source={{ uri: imagem }}
                  style={{ width: 120, height: 120 }}
                />
                <View
                  style={[styles.overlay, isSelected && styles.overlayVisible]}
                />
                <View style={styles.cardContent}>
                  <Text
                    style={[
                      styles.text,
                      styles.titulo,
                      isSelected && styles.selectedText,
                    ]}
                  >
                    {lanche}
                  </Text>
                  {renderIngredientes(ingredientes, isSelected)}
                  <View style={styles.flex}>
                    <Text
                      style={[
                        styles.text,
                        styles.preco,
                        isSelected && styles.selectedText,
                      ]}
                    >
                      R$ {preco},00
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
         <Text style={{ color: 'white' }}>
        {carrinho.length > 0 ? (
          carrinho.map((item) => (
            <Text key={item.id}>
             {item.quantidade} Lanche: {item.lanche}  Preço: {item.preco}{'\n'}
            </Text>
          ))
        ) : (
          <Text>Nenhum item no carrinho</Text>
        )}
      </Text>
      <Text style={{ color: 'white' }}>
        Preço Total: R$ {calcularPrecoTotal()}
      </Text>
      <View style={styles.button}>
        <Button 
          title="Carrinho"
          onPress={() => {
            navigation.navigate('Carrinho', { carrinhoItens: carrinho });
          }}
        />
      </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    marginBottom: 15,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#091014",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  bg_black: {
    backgroundColor: "#091014",
    minHeight: "100%",
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#7CFC00",
    opacity: 0,
  },
  overlayVisible: {
    opacity: 1,
  },
  cardContent: {
    marginLeft: 15,
    width: "60%",
  },
  text: {
    color: "white",
  },
  ingredientes: {
    fontFamily: "FingerPaint",
  },
  titulo: {
    fontFamily: "Road_Rage",
    textTransform: "uppercase",
    fontSize: 42,
  },
  selectedText: {
    color: "#7CFC00",
    textShadowColor: "#7CFC00",
  },
  preco: {
    textShadowColor: "red",
    textShadowRadius: 4,
    textShadowOffset: { width: 2, height: 2 },
    fontSize: 25,
    fontFamily: "RisqueRegular",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    minWidth: '100%'
  }
});
