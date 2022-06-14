import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, View, TextInput, SafeAreaView, FlatList} from 'react-native';
import {useEffect, useState} from "react";
import TheSimsonApi from "./src/service/TheSimsonApi";
import QuotesCard from "./src/Components/QuotesCard";

export default function App() {

  const [items, setItems] = useState([]);
  const [number, setNumber] = useState(1);

  const load = (_number = 1) => {
    setItems([])
    TheSimsonApi.getRandomQuotes(_number).then((data) => {
      setItems(data);
    })
  }
  useEffect(() => {
   load();
  }, [])

  return (
    <View style={styles.container}>
      <FlatList data={items}
                keyExtractor={(item, index) => Math.random().toString() }
                renderItem={({item, index}) => {
                  return (<QuotesCard img={item.image} name={item.character} quote={item.quote}/>)
                }}>
      </FlatList>
      <SafeAreaView style={styles.btnContainer}>
        <TextInput
            style={styles.input}
            onChangeText={(text) => {setNumber(text.replace(/[^0-9]/g, ''))}}
            value={number.toString()}
            keyboardType="numeric"
            placeholder="Nombre"
            placeholderTextColor="#FFF"
        />
        <Button
            onPress={() => {load(number)}}
            title="Reload"
            style={styles.button}
        />
      </SafeAreaView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282222',
    paddingVertical: 30,
    paddingBottom: 20,
    paddingHorizontal: 20
  },
  btnContainer: {
    height: 30,
    flexDirection: "row",
    marginTop: 40,
    justifyContent: "center"
  },
  button: {
    backgroundColor: "#3498db",
  },
  input: {
    borderWidth: 1,
    borderColor: "#3498db",
    color: "#FFF",
    paddingHorizontal: 10,
  },
});
