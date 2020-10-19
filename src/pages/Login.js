import React, { useState } from 'react'
import { StyleSheet, Dimensions, Text, View, Image, TextInput, Keyboard, TouchableOpacity, Alert } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { useNavigation } from '@react-navigation/native'
import api from '../services/api'
import { useDispatch, useSelector } from 'react-redux'

import LogoIntergalaxy from '../assets/Imagens/LogoIntergalaxy.png'
import User from '../assets/Icons/User.svg'
import Lock from '../assets/Icons/Lock.svg'

export default function Login() {
    const navigation = useNavigation()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const dispatch = useDispatch()
    const redux = useSelector(state => state)

    async function onLogin() {
        const response = await api.post('/api/login', { email: email, password: password })
            .then(res => {
                if (res.data.status) {
                    return {
                        status: res.data.status,
                        name: res.data.user.name,
                        email: res.data.user.email,
                        token: res.data.user.token
                    }
                } else {
                    return {
                        status: res.data.status,
                        text: res.data.message
                    }
                }
            })
        return response
    }

    async function click() {
        const response = await onLogin()
        if (response.status) {
            dispatch({ type: "SET_USER", name: response.name, email: response.email, token: response.token})
            navigation.navigate('Tabs')
        }

        else
            Alert.alert("Verifique os dados informados e tente novamente")
    }

    return (
        <View style={styles.container}>
            <View style={styles.button}>
                <Image
                    source={LogoIntergalaxy}
                    style={styles.img}
                />
            </View>
            <Text style={styles.text}>Seja bem-vindo</Text>
            <View style={styles.buttonInput}>
                <TextInput
                    style={styles.input}
                    placeholderTextColor='#AEADB3'
                    placeholder='e-mail'
                    keyboardType="email-address"
                    autoCorrect={false}
                    autoCapitalize="none"
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                    onSubmitEditing={() => Keyboard.dismiss()}
                />
                <User
                    width={DEVICE_WIDTH * .05}
                    height={DEVICE_HEIGHT * .05}
                />
            </View>
            <View style={styles.buttonInput2}>
                <TextInput
                    style={styles.input}
                    placeholder='senha'
                    secureTextEntry
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholderTextColor='#AEADB3'
                    value={password}
                    blurOnSubmit={false}
                    onChangeText={(value) => setPassword(value)}
                    onSubmitEditing={() => Keyboard.dismiss()}
                />
                <Lock
                    width={DEVICE_WIDTH * .05}
                    height={DEVICE_HEIGHT * .05}
                />
            </View>

            <TouchableOpacity style={styles.advanceButton} onPress={() => click()}>
                <Text style={styles.text2}>entrar</Text>
            </TouchableOpacity>

        </View>
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
    button: {
        borderBottomLeftRadius: 45,
        borderBottomRightRadius: 45,
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT * .20,
        backgroundColor: '#232323',
    },
    img: {
        width: DEVICE_WIDTH * .7,
        height: DEVICE_HEIGHT * .1,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: DEVICE_HEIGHT * .06,
    },
    text: {
        fontSize: RFPercentage(2.2),
        color: '#FFFFFF',
        marginTop: DEVICE_HEIGHT * .08,
        fontFamily: 'Montserrat-SemiBold'
    },
    buttonInput: {
        height: DEVICE_HEIGHT * .06,
        width: DEVICE_WIDTH * .9,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#232323',
        borderRadius: 40,
        flexDirection: 'row',
        marginTop: DEVICE_HEIGHT * .08,
    },
    buttonInput2: {
        height: DEVICE_HEIGHT * .06,
        width: DEVICE_WIDTH * .9,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#232323',
        borderRadius: 40,
        flexDirection: 'row',
        marginTop: DEVICE_HEIGHT * .02,
    },
    input: {
        color: '#AEADB3',
        letterSpacing: .2,
        fontSize: RFPercentage(1.5),
        paddingLeft: DEVICE_WIDTH * .05,
        width: DEVICE_WIDTH * .8,
        fontFamily: 'Montserrat-SemiBold',
        letterSpacing: .2,
    },
    advanceButton: {
        height: DEVICE_HEIGHT * .06,
        width: DEVICE_WIDTH * .7,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#7400CA',
        borderRadius: 40,
        marginTop: DEVICE_HEIGHT * .04,
    },
    text2: {
        fontSize: RFPercentage(2.4),
        color: '#FFFFFF',
        fontFamily: 'Montserrat-Light',
        letterSpacing: .2,
    },
})