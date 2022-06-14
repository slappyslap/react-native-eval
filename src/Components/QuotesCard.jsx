import {Image, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {MaterialCommunityIcons} from "@expo/vector-icons";

const QuotesCard = ({item, navigation, updateFunction}) => {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const jsonValue = AsyncStorage.getItem('@favList').then((data) => {
            data = data ? JSON.parse(data) : [];

            if (data.some(e => e.image === item.image && e.name === item.name && e.quote === item.quote)) {
                setIsFavorite(true)
            }
        })
    }, [])

    const toggleFavorite = async (item) => {
        const jsonValue = await AsyncStorage.getItem('@favList')
        let array = jsonValue != null ? JSON.parse(jsonValue) : [];

        if(array.some(e => e.image === item.image && e.name === item.name && e.quote === item.quote)) {
            array = array.filter(e => {
                return !(e.image === item.image && e.name === item.name && e.quote === item.quote);
            })
        } else {
            array.push(item);
        }

        await AsyncStorage.setItem('@favList', JSON.stringify(array))
        setIsFavorite(!isFavorite)

        if(updateFunction){
            updateFunction();
        }
    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate({name: 'findByName', params: {search: item.character}})}>
            <View style={styles.textContainer}>
                <Text style={styles.quote}>{item.quote}</Text>
                <Text style={styles.name}>{item.character}</Text>

                <TouchableOpacity style={{flex: 4/12}} onPress={() => {toggleFavorite(item).then()}}>
                    <MaterialCommunityIcons size={40} color={isFavorite ? "#F00" : "#000" } name="heart-outline"/>
                </TouchableOpacity>
            </View>
            <View style={styles.imgContainer}>
                {item?.image ? <Image source={{uri: item.image}} style={styles.img}/> : <View />}
            </View>
        </TouchableOpacity>
    )
}

export default QuotesCard;

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        backgroundColor: '#FFF',
        color: "#000",
        marginTop: 10,
        flexDirection: "row"
    },
    imgContainer: {
        flex: 1/3,
    },
    img: {
        flex: 1,
        resizeMode: "contain",
    },
    textContainer: {
        padding: 20,
        flex: 2/3,
    },
    quote: {
        color: "#000",
    },
    name: {
        paddingTop: 20,
        color: "#69acc3"
    }
});