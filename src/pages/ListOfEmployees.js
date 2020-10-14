import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Dimensions, TouchableOpacity, View, TextInput, Keyboard, FlatList, Text } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import api from '../services/api'

import SetaEsquerda from '../assets/Icons/SetaEsquerda.svg'

export default function ListOfEmployees() {
    const navigation = useNavigation()
    const [search, setSearch] = useState()
    // const [people, setPeople] = useState([]);
    const [listEmployeer, setList] = useState([])
    const dispatch = useDispatch()
    const redux = useSelector(state => state)

    function selected(item){
        dispatch({type: "SELECTED", userSelected: item.id, userSelectedName: item.name})
        navigation.goBack()
    }

    async function setValidate() {
        const response = await api.post('/api/getEmployeers', {})
            .then(res => {
                if (res.data.status) {
                    return {
                        status: res.data.status,
                        Employeer: res.data.employeers,
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
        const response = await setValidate()
        if (response.status) {
            setList(response.Employeer)
        }
        else
            Alert.alert("Verifique os dados informados e tente novamente")
    }

    useFocusEffect(
        useCallback(() => {
            click()
        }, [])
    )

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <SetaEsquerda
                        width={DEVICE_WIDTH * .07}
                        height={DEVICE_WIDTH * .07}
                    />
                </TouchableOpacity>
                <View style={styles.search}>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor='#AEADB3'
                        placeholder='Buscar Funcionário '
                        keyboardType="default"
                        autoCorrect={false}
                        autoCapitalize="words"
                        value={search}
                        onChangeText={(value) => setSearch(value)}
                        onSubmitEditing={() => Keyboard.dismiss()}
                    />
                    <View></View>
                </View>
            </View>
            <View style={styles.line} />
            <View style={styles.list}>
                <FlatList
                    keyExtractor={(item) => item.id.toString()}
                    data={listEmployeer}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => selected(item)}>
                            <Text style={styles.Txtname}>{item.name}</Text>
                            <View style={styles.line1} />
                        </TouchableOpacity>
                    )}
                />
            </View>
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
        alignItems: 'center',
    },
    header: {
        alignItems: "center",
        marginTop: DEVICE_HEIGHT * .07,
        marginBottom: DEVICE_HEIGHT * .02,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 15,
        width: DEVICE_WIDTH,
    },
    search: {
        height: DEVICE_HEIGHT * .04,
        width: DEVICE_WIDTH * .8,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: '#FFFF',
        borderWidth: 1,
        borderRadius: 30,
        flexDirection: 'row',
    },
    input: {
        color: '#AEADB3',
        letterSpacing: .2,
        fontSize: RFPercentage(1.5),
        paddingLeft: DEVICE_WIDTH * .05,
        width: DEVICE_WIDTH,
        fontFamily: 'Montserrat-SemiBold',
        letterSpacing: .2,
    },
    Txtname: {
        color: '#AEADB3',
        letterSpacing: .2,
        fontSize: RFPercentage(2),
        fontFamily: 'Montserrat-SemiBold',
        marginTop: DEVICE_HEIGHT * .02,
    },
    list: {
        width: DEVICE_WIDTH * .9,
        marginTop: DEVICE_HEIGHT * .03,

    },
    line1: {
        backgroundColor: '#7400CA',
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT * .002,
        marginTop: DEVICE_HEIGHT * .02
    },
    line: {
        backgroundColor: '#AEADB3',
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT * .002,
        marginTop: DEVICE_HEIGHT * .02
    },
})