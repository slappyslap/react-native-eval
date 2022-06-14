import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from "react";
import TheSimsonApi from "./src/service/TheSimsonApi";
import QuotesCard from "./src/Components/QuotesCard";

export default function App() {

  const [item, setItem] = useState(null);

  const reload = () => {
    setItem(null)
    TheSimsonApi.getRandomQuotes().then((data) => {
      setItem(data);
    })
  }

  useEffect(() => {
   reload();
  }, [])

  return (
    <View style={styles.container}>
      {item ? <QuotesCard img={item.image} name={item.character} quote={item.quote}/> : <QuotesCard img="" name="" quote="Chargement ..."/>}
      <View style={styles.btnContainer}>
        <Button
            onPress={reload}
            title="Reload"
            style={styles.button}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282222',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    marginTop: 30,
  }
});
