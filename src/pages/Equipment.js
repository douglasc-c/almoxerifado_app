import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Dimensions, Text, View, ScrollView } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import api from '../services/api'

import ButtonEquipment from '../components/ButtonEquipment'

export default function Equipment() {
    const navigation = useNavigation()
    const [listEquipment, setList] = useState([])
    const [listUser, setListUser] = useState([])

    function navi(item) {
        navigation.navigate('ChangeEquipment', { item: item })
    }

    async function setValidate() {
        const response = await api.post('/api/getEquipaments', {})
            .then(res => {
                if (res.data.status) {
                    return {
                        status: res.data.status,
                        equipament: res.data.equipaments,
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
            setList(response.equipament)
            setListUser(response.user)
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
            <View style={styles.button}>
                <Text style={styles.title}>Equipamentos adicionados</Text>
            </View>
            <View style={{ height: DEVICE_HEIGHT * .8 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        listEquipment.map((item, key) => (
                            <ButtonEquipment
                                key={key}
                                model={item.model}
                                status={item.status}
                                access_password={item.access_password}
                                name={item.name}
                                navi={navi}
                                item={item}
                            />
                        ))
                    }
                </ScrollView>
                <View style={{height: DEVICE_HEIGHT * .04}}></View>
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
    button: {
        borderBottomLeftRadius: 45,
        borderBottomRightRadius: 45,
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT * .12,
        backgroundColor: '#232323',
    },
    title: {
        fontSize: RFPercentage(2.2),
        color: '#FFFFFF',
        marginTop: DEVICE_HEIGHT * .06,
        textAlign: 'center',
        fontFamily: 'Montserrat-Medium',
    },
    button2: {
        borderRadius: 20,
        width: DEVICE_WIDTH * .9,
        height: DEVICE_HEIGHT * .17,
        backgroundColor: '#232323',
        marginTop: DEVICE_HEIGHT * .02,
        alignSelf: 'center',
    },
    name: {
        fontSize: RFPercentage(2.2),
        color: '#FFFFFF',
        marginBottom: DEVICE_HEIGHT * .015,
        marginTop: DEVICE_HEIGHT * .02,
        fontFamily: 'Montserrat-SemiBold',
    },
    textButton: {
        width: DEVICE_WIDTH * .75,
        alignSelf: 'center'
    },
    information: {
        fontSize: RFPercentage(1.5),
        color: '#FFFFFF',
        textAlign: 'center',
        alignSelf: 'flex-start',
        marginVertical: DEVICE_HEIGHT * .01,
        fontFamily: 'Montserrat-Regular',
    },
    information2: {
        fontSize: RFPercentage(1.5),
        color: '#FFFFFF',
        textAlign: 'center',
        alignSelf: 'flex-start',
        marginBottom: DEVICE_HEIGHT * .015,
        fontFamily: 'Montserrat-Regular',
    },
    information3: {
        fontSize: RFPercentage(1.5),
        color: '#FFFFFF',
        textAlign: 'center',
        alignSelf: 'flex-start',
        fontFamily: 'Montserrat-Regular',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: DEVICE_WIDTH * .77,
    },
})