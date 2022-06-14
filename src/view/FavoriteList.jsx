import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import QuotesCard from "../Components/QuotesCard";

export default function FavoriteList({navigation}) {

    const [items, setItems] = useState([])

    useEffect(() => {
        return navigation.addListener('focus', () => {
            updateFav();
        });
    }, [navigation])

    const updateFav = () => {
        AsyncStorage.getItem('@favList').then((data) => {
            return data ? JSON.parse(data) : [];
        }).then(data => {
            setItems(data);
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.dataContainer}>
                {items.length !== 0 ?
                    <FlatList data={items}
                              keyExtractor={(item, index) => Math.random().toString() }
                              renderItem={({item, index}) => {
                                  return (<QuotesCard item={item} navigation={navigation} updateFunction={updateFav}/>)
                              }}>
                    </FlatList>
                    :
                    <Text style={styles.info}>Aucun favoris</Text>
                }
            </View>
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
    input: {
        borderWidth: 1,
        borderColor: "#3498db",
        color: "#FFF",
        paddingHorizontal: 10,
        width: 200,
    },
});
