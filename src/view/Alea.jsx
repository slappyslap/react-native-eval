import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, View, TextInput, SafeAreaView, FlatList} from 'react-native';
import {useEffect, useState} from "react";
import TheSimsonApi from "../service/TheSimsonApi";
import QuotesCard from "../Components/QuotesCard";

export default function Alea({navigation}) {

    const [items, setItems] = useState([]);

    const load = (_number = 10) => {
        TheSimsonApi.getRandomQuotes(_number).then((data) => {
            setItems([...items, ...data]);
        })
    }
    useEffect(() => {
        load();
    }, [])

    return (
        <View style={styles.container}>
            <FlatList data={items}
                      keyExtractor={(item, index) => Math.random().toString() }
                      onEndReached={() => load(10)}
                      renderItem={({item, index}) => {
                          return (<QuotesCard item={item} navigation={navigation}/>)
                      }}>
            </FlatList>
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
});
