import {Image, StyleSheet, Text, View} from "react-native";

const QuotesCard = ({img, quote, name}) => {

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.quote}>{quote}</Text>
                <Text style={styles.name}>{name}</Text>
            </View>
            <View style={styles.imgContainer}>
                <Image source={{uri: img}} style={styles.img}/>
            </View>
        </View>
    )
}

export default QuotesCard;

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        backgroundColor: '#FFF',
        color: "#000",
        marginHorizontal: 20,
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
        color: "#69acc3"
    }
});