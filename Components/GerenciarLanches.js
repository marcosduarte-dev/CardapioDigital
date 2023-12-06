import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ImagePicker from "expo-image-picker";
import * as yup from "yup";
import NavBar from "./NavBar";
import {
  collection,
  getFirestore,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { Dropdown } from "react-native-element-dropdown";
import { useFocusEffect } from "@react-navigation/native";

export default function GerenciarLanches({ navigation }) {
  const fieldsValidationSchema = yup.object().shape({
    lanche: yup.string().required("Esse campo não pode ser vazio"),
    preco: yup.string().required("Esse campo não pode ser vazio"),
    ingrediente: yup.string().required("Esse campo não pode ser vazio"),
  });

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(fieldsValidationSchema) });
  const [image, setImage] = useState(null);
  const [data, setData] = useState([]);
  const [lanchesDropdown, setLanchesDropdown] = useState([]);

  const [lancheSelecionado, setLancheSelecionado] = useState();
  const [precoSelecionado, setPrecoSelecionado] = useState("");
  const [ingredientesSelecionado, setIngredientesSelecionado] = useState();

  const db = getFirestore();

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const onSubmit = async (data) => {
    const docRef = await updateDoc(doc(db, "Lanche", data.id), {
      lanche: data.lanche,
      preco: data.preco,
      ingredientes: data.ingrediente,
      imagem: `${data.imagem}`,
    });
    fetchData();
    setLancheSelecionado("");
    setPrecoSelecionado();
    setIngredientesSelecionado("");
    setImage("");
  };

  const excluirLanche = async (data) => {
    const docRef = doc(db, "Lanche", data.id);

    await getDoc(docRef).then((doc) => {
      if (!doc.exists()) {
        console.log("Lanche nao encontrado");
      } else {
        deleteDoc(docRef).then();
      }
    });

    setTimeout(() => {
      setLancheSelecionado("");
      setPrecoSelecionado();
      setIngredientesSelecionado("");
      setImage("");
      fetchData();
    }, 250);
  };

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "Lanche"));
    const jsonData = {};
    const lanches = [];
    setLanchesDropdown(lanches);

    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      const docId = doc.id;
      jsonData[docId] = docData;
      const lanche = {
        label: docData.lanche,
        value: docId,
      };
      lanches.push(lanche);
    });
    setLanchesDropdown(lanches);
    setData(jsonData);
  };

  const changeItem = (item) => {
    const lanche = data[item.value];

    setValue("lanche", lanche.lanche);
    setValue("preco", lanche.preco);
    setValue("ingrediente", lanche.ingredientes);
    setValue("id", item.value);
    setValue("imagem", lanche.imagem);

    setLancheSelecionado(lanche.lanche);
    setPrecoSelecionado(lanche.preco);
    setIngredientesSelecionado(lanche.ingredientes);
    setImage(lanche.imagem);
  };

  const TextField = ({ error, label, ...inputProps }) => (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, !!error && styles.borderError]}
        {...inputProps}
      />
      {!!error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const img = `data:image/jpeg;base64,${result.assets[0].base64}`;

      setImage(result.assets[0].uri);
      setValue("imagem", img);
    }
  };

  useEffect(() => {
    register("lanche");
    register("preco");
    register("ingrediente");
  }, [register]);

  return (
    <View style={styles.mainContainer}>
      <NavBar navigation={navigation} nome="Gerenciar" />
      <View style={{ alignItems: "center", marginTop: 7 }}>
        <ScrollView style={{ padding: 15 }}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={lanchesDropdown}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Selecione um lanche"
            onChange={(item) => {
              changeItem(item);
            }}
          />

          <Pressable style={styles.button_imagem} onPress={pickImage}>
            <Text style={styles.btn_text_imagem}>Selecione Uma Imagem</Text>
          </Pressable>

          <View style={{ alignItems: "center" }}>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            )}
          </View>
          <TextField
            label={"Lanche"}
            error={errors.lanche}
            placeholder={"Digite o nome do lanche"}
            placeholderTextColor="white"
            onChangeText={(text) => setValue("lanche", text)}
            value={lancheSelecionado}
          />
          <TextField
            label={"Preço"}
            error={errors.preco}
            placeholder={"Digite o preço do lanche"}
            placeholderTextColor="white"
            onChangeText={(text) => setValue("preco", text)}
            keyboardType="numeric"
            defaultValue={precoSelecionado}
          />
          <TextField
            label={"Ingredientes"}
            error={errors.ingrediente}
            placeholder={"Digite os ingredientes do lanche"}
            placeholderTextColor="white"
            onChangeText={(text) => setValue("ingrediente", text)}
            value={ingredientesSelecionado}
          />
          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button_cadastrar, styles.button_editar]}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.btn_text_imagem}>Editar</Text>
            </Pressable>
            <Pressable
              style={[styles.button_cadastrar, styles.button_excluir]}
              onPress={handleSubmit(excluirLanche)}
            >
              <Text style={styles.btn_text_imagem}>Excluir</Text>
            </Pressable>
          </View>
        </ScrollView>
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
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "white",
  },
  input: {
    height: 50,
    width: 350,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: "white",
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  button_imagem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#55597d",
    width: 350,
    marginBottom: 15,
  },
  button_cadastrar: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    width: 165,
    marginTop: 15,
  },
  button_editar: {
    backgroundColor: "#006b3b",
  },
  button_excluir: {
    backgroundColor: "#b30000",
  },
  btn_text_imagem: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  placeholderStyle: {
    fontSize: 14,
    color: "white",
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "white",
  },
  dropdown: {
    height: 50,
    width: 350,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
