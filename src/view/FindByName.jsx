import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, View, TextInput, SafeAreaView, FlatList} from 'react-native';
import {useEffect, useState} from "react";
import TheSimsonApi from "../service/TheSimsonApi";
import QuotesCard from "../Components/QuotesCard";

export default function FindByName({navigation, route}) {

    const [items, setItems] = useState([]);
    const [name, setName] = useState("");

    useEffect(() => {
        setName(route.params.search)

        if(route.params.search !== 0) {
            load(route.params.search, false)
        }
    },[route.params?.search])

    const load = (_text, append = true) => {
        TheSimsonApi.getRandomQuotesByName(_text).then((data) => {
            if(append){
                setItems([...items,...data]);
            } else {
                setItems([...data]);
            }
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.dataContainer}>
                {items.length !== 0 ?
                    <FlatList data={items}
                              keyExtractor={(item, index) => Math.random().toString() }
                              onEndReached={() => load(name)}
                              renderItem={({item, index}) => {
                                  return (<QuotesCard item={item} navigation={navigation}/>)
                              }}>
                    </FlatList>
                    :
                    <Text style={styles.info}>Veuillez effectuer une recherche</Text>
                }
            </View>

            <SafeAreaView style={styles.btnContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => {setName(text)}}
                    value={name}
                    placeholder="Nom"
                    placeholderTextColor="#FFF"
                />
                <Button
                    onPress={() => {load(name)}}
                    title="Recherche"
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
    info: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "center",
        marginTop: 50,
    },
    dataContainer: {
        flex: 1,
    },
    btnContainer: {
        height: 30,
        flexDirection: "row",
        marginTop: 20,
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
        width: 200,
    },
});
