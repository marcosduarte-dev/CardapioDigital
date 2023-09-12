import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ImagePicker from "expo-image-picker";
import * as yup from "yup";
import NavBar from "./NavBar";

export default function CadastroLanches({ navigation }) {
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

  const onSubmit = (data) => {
    const postData = {
      lanche: data.lanche,
      preco: data.preco,
      ingredientes: data.ingrediente,
      imagem: `data:image/jpeg;base64,${data.imagem}`,
    };

    fetch(
      "https://cardapiodigital-4f53e-default-rtdb.firebaseio.com/Lanches/.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      }
    )
      .then((response) => response.json())
      .then((responseData) => {
        console.log("Lanche Cadastrado com Sucesso!:", responseData);
        reset();
        setImage(null);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
      setImage(result.assets[0].uri);
      setValue("imagem", result.assets[0].base64);
    }
  };

  useEffect(() => {
    register("lanche");
    register("preco");
    register("ingrediente");
  }, [register]);

  return (
    <View style={styles.mainContainer}>
      <NavBar navigation={navigation} />
      <View style={{ alignItems: "center", marginTop: 15 }}>
        <ScrollView style={{ padding: 15 }}>
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
          />
          <TextField
            label={"Preço"}
            error={errors.preco}
            placeholder={"Digite o preço do lanche"}
            placeholderTextColor="white"
            onChangeText={(text) => setValue("preco", text)}
            keyboardType="numeric"
          />
          <TextField
            label={"Ingredientes"}
            error={errors.ingrediente}
            placeholder={"Digite os ingredientes do lanche"}
            placeholderTextColor="white"
            onChangeText={(text) => setValue("ingrediente", text)}
          />
          <Pressable
            style={styles.button_cadastrar}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.btn_text_imagem}>Cadastrar</Text>
          </Pressable>
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
    backgroundColor: "#006b3b",
    width: 350,
    marginTop: 15,
  },
  btn_text_imagem: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
