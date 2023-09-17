import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import NavBar from './NavBar';

export default function Carrinho({route, navigation}) {
  const carrinhoItens = route.params.carrinhoItens;

  const calcularPrecoTotal = () => {
    let total = 0;
    carrinhoItens.forEach((item) => {
      total += item.preco;
    });
    return total;
  };
  return (
    <View style={styles.bg_black}>
      <NavBar nome="Carrinho"></NavBar>
      <View>
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
      </View>
      <View style={styles.viewPagamento}>
        <Text style={styles.text}>Total a Pagar: R${calcularPrecoTotal()}</Text>
      </View>
      <View style={styles.button}>
        <Button title='continuar' 
          onPress={()=>{
            navigation.goBack()
          }}
        />
        <Button title='finalizar'
          onPress={()=>{
            alert('Obrigado pela compra!!!!!!')
            navigation.navigate('Cardapio')
          }}
        />
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
    padding: 20
  },
  viewPagamento:{
    marginBottom: 15,
    padding: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems:'start',
    backgroundColor: "#091014",
    
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    minWidth: '100%'
  }
});

