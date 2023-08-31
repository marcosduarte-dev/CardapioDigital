import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";


export default function ListagemLanches() {
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loaded] = useFonts({
    Road_Rage: require("../assets/fonts/RoadRage.ttf"),
    FingerPaint: require("../assets/fonts/FingerPaint-Regular.ttf"),
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://cardapiodigital-4f53e-default-rtdb.firebaseio.com/Lanches/.json"
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    }
  };

  if (!loaded) {
    return null;
  }

  const handleCardPress = (id) => {
    setSelectedId(id);
    console.log(id);
    setTimeout(() => {
      setSelectedId(null);
    }, 800);
  };

  const renderIngredientes = (ingredientes, isSelected) => {
    const ingredientesArray = ingredientes.split("/N");

    return ingredientesArray.map((ingrediente, index) => (
      <Text key={index} style={[styles.text, styles.ingredientes, isSelected && styles.selectedText]}>
        {ingrediente}
      </Text>
    ));
  };

  return (
    <View style={{ padding: 15 }}>
      {Object.keys(data).map((id) => {
        const { lanche, preco, ingredientes, imagem } = data[id];
        const isSelected = id === selectedId;
        return (
          <TouchableOpacity
            key={id}
            onPress={() => handleCardPress(id)}
            activeOpacity={0.6}
          >
            <View style={[styles.view, isSelected && styles.selectedView]}>
              <Image
                source={{ uri: imagem }}
                style={{ width: 120, height: 120 }}
              />
              <View style={[styles.overlay, isSelected && styles.overlayVisible]} />
              <View style={styles.cardContent}>
                <Text style={[styles.text, styles.titulo, isSelected && styles.selectedText]}>{lanche}</Text>
                {renderIngredientes(ingredientes, isSelected)}
                <Text style={[styles.text, isSelected && styles.selectedText]}>R$ {preco}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    marginTop: 11,
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
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'green',
    opacity: 0,
  },
  overlayVisible: {
    opacity: 1,
  },
  cardContent: {
    marginLeft: 10,
  },
  text: {
    color: "white",
  },
  ingredientes: {
    fontFamily: "FingerPaint",
  },
  titulo: {
    fontFamily: "Road_Rage",
    textTransform: 'uppercase',
    fontSize:42
  },
  selectedText: {
    color: 'green', // Define a cor do texto como verde quando o card estiver selecionado
  },
});
