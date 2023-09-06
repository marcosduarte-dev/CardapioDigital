import { StyleSheet, Text, View, Image, TouchableOpacity, Button, TextInput } from "react-native";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as ImagePicker from 'expo-image-picker';
import * as yup from 'yup'

export default function CadastroLanches() {

  const fieldsValidationSchema = yup.object().shape({
    lanche: yup
    .string()
    .required('Esse campo não pode ser vazio'),
    preco: yup
    .string()
    .required('Esse campo não pode ser vazio'),
    ingrediente: yup
    .string()
    .required('Esse campo não pode ser vazio'),
  })

  const { register, setValue, reset, handleSubmit, formState:{ errors } } = useForm({ resolver: yupResolver(fieldsValidationSchema)})
  const [image, setImage] = useState(null);
  

  const onSubmit = (data) => {

      const postData = {
        lanche: data.lanche,
        preco: data.preco,
        ingredientes: data.ingrediente,
        imagem: `data:image/jpeg;base64,${data.imagem}`
      };
    
      fetch('https://cardapiodigital-4f53e-default-rtdb.firebaseio.com/Lanches/.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      })
        .then(response => response.json())
        .then(responseData => {
          console.log('Lanche Cadastrado com Sucesso!:', responseData);
          reset();
          setImage(null)
        })
        .catch(error => {
          console.error('Error:', error);
        });
  }

  const TextField = ({ error, label, ...inputProps }) => (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, !!error && styles.borderError]}
        {...inputProps}
      />
      {!!error && <Text style={styles.errorMessage}>{error.message}</Text>}
    </View>
  )

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
      setValue('imagem', result.assets[0].base64);
    }
  };

  useEffect(() => {
    register('lanche')
    register('preco')
    register('ingrediente')
  }, [register])

  return (
    <View style={styles.mainContainer}>
      <Button title="Selecione uma imagem" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <TextField
        label={'Lanche'}
        error={ errors.lanche }
        placeholder={'Digite o nome do lanche'}
        onChangeText={text => setValue('lanche', text)}
      />
      <TextField
        label={'Preco'}
        error={ errors.preco }
        placeholder={'Digite o preço do lanche'}
        onChangeText={text => setValue('preco', text)}
        keyboardType="numeric"
      />
      <TextField
        label={'Ingredientes'}
        error={ errors.ingrediente }
        placeholder={'Digite os ingredientes do lanche'}
        onChangeText={text => setValue('ingrediente', text)}
      />
      <Button onPress={handleSubmit(onSubmit)} title="Cadastrar" />
    </View>
  );
}

const styles = StyleSheet.create({
  
});
