import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Dimensions, Text, View, ScrollView } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import api from '../services/api'
import { useDispatch, useSelector } from 'react-redux'

import Employeer from '../components/Employeer'

export default function Home() {
    const navigation = useNavigation()
    const [listEmployeer, setList] = useState([])
    const dispatch = useDispatch()
    const redux = useSelector(state => state)

    function navi(item) {
        navigation.navigate('ChangeEmployee', { item: item })
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
            <View style={styles.button}>
                <Text style={styles.title}>Funcionários adicionados</Text>
            </View>
            <View style={{height: DEVICE_HEIGHT * .8 }}>
                <ScrollView showsVerticalScrollIndicator={false} style={{  }}>
                    {
                        listEmployeer.map((item, key) => (
                            <Employeer
                                key={key}
                                name={item.name}
                                document_number={item.document_number}
                                email={item.email}
                                phone={item.phone}
                                function={item.function}
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

})