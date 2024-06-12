import {Text, View, StyleSheet} from "react-native";
import React, {useEffect, useState} from "react";
import { Image } from 'expo-image';
const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
export default function Home(){

    return <View>
        <Image
            alt='гвоно'
            style={styles.image}
            source='https://cosas.pe/wp-content/uploads/2021/10/xNtgrNEsMXvmRQQtcFuJdbXOjmP-1.jpg'
            placeholder={{ blurhash }}
            contentFit="contain"
            transition={200}
        />

    </View>
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 60,
        height:60,
    },
});
