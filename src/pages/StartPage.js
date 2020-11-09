import React, { useEffect } from 'react'
import { StyleSheet, Dimensions, Image, View, StatusBar } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { useNavigation } from '@react-navigation/native'

import LogoIntergalaxy from '../assets/Imagens/LogoIntergalaxy.png'

export default function StartPage() {
    const navigation = useNavigation()

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Login')
        }, 2000);
    }, [])

    return (
        <>
            <StatusBar barStyle={"light-content"} />
            {/* <TouchableOpacity onPress={() => navigation.navigate('Login')}> */}
                <View style={styles.container}>
                    <Image
                        source={LogoIntergalaxy}
                        style={styles.img}
                    />
                </View>
            {/* </TouchableOpacity> */}
        </>
    )
}

const DEVICE_WIDTH = Dimensions.get('window').width
const DEVICE_HEIGHT = Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT,
        backgroundColor: '#1E1E1E',
        alignItems: 'center'
    },
    img: {
        width: DEVICE_WIDTH * .8,
        height: DEVICE_HEIGHT * .1,
        marginTop: DEVICE_HEIGHT * .4,
        resizeMode: 'contain',
    },
})