import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TextInput, ScrollView, Pressable } from 'react-native';
import NavBar from './NavBar';

export default function Carrinho({ route, navigation }) {
  const carrinhoItens = route.params.carrinhoItens;

  const [cep, setCep] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');

  const handleSaveAddress = () => {
    console.log('CEP: '+cep+'; CIDADE: '+city+'; RUA: '+street+'; houseNumber: '+houseNumber)
  };

  const budgetCalculator = () => {
    let total = 0;
    carrinhoItens.forEach((item) => {
      total += Number(item.preco);
    });
    return total;
  };

  return (
    <View style={styles.bg_black}>
      <NavBar navigation={navigation} nome="Carrinho" />
      <Text style={styles.titulo}>Endereço:</Text>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={cep}
          onChangeText={setCep}
          placeholder="CEP"
        />
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={setCity}
          placeholder="Cidade"
        />
        <TextInput
          style={styles.input}
          value={street}
          onChangeText={setStreet}
          placeholder="Rua"
        />
        <TextInput
          style={styles.input}
          value={houseNumber}
          onChangeText={setHouseNumber}
          placeholder="n° casa"
        />
        <Pressable
          style={[styles.button, {backgroundColor: '#FFD818'}]}
          onPress={handleSaveAddress}
        >
            <Text style={[styles.btn_text_imagem, {color: 'black'}]}>Salva Endereço</Text>
        </Pressable>
      </View>
      {carrinhoItens && carrinhoItens.length > 0 ? (
        <FlatList
          data={carrinhoItens}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.view}>
              <Text style={styles.text}>{item.quantidade}x</Text>
              <Text style={styles.text}>{item.lanche}</Text>
              <Text style={styles.text}>Preço: R$ {item.preco}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.text}>Nenhum item no carrinho</Text>
      )}
      <View style={styles.viewPagamento}>
        <Text style={styles.text}>Total: R$ {budgetCalculator()},00</Text>
      </View>
      <View style={styles.buttonView}>
        <Pressable
          style={[styles.button, {backgroundColor: 'blue'}]}
          onPress={() => { navigation.goBack() }}        
        >
          <Text style={styles.btn_text_imagem}>continuar Comprando</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => { alert('Obrigado pela compra!!!!!!'); navigation.navigate('Cardapio') }}
         >
            <Text style={styles.btn_text_imagem}>Finalizar</Text>
        </Pressable>
     </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    marginBottom: 15,
    padding: 15,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-around',
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
  text: {
    color: "white",
    fontSize: 20
  },
  titulo: {
    color: "white",
    fontSize: 30,
    alignSelf: 'center',
    marginTop: 25
  },
  viewPagamento: {
    marginBottom: 15,
    padding: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: "#091014",

  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#006b3b",
    marginTop: 15,
  },
  container: {
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 10,
    fontSize: 16,
    width: 120,
    backgroundColor: 'grey',
  },
  btn_text_imagem: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  buttonView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    minWidth: '100%',
  }
});
