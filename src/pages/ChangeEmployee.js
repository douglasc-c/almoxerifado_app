import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Dimensions, Text, View, TextInput, Keyboard, Modal, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import api from '../services/api'
import { useSelector } from 'react-redux'

import ArrowLeft from '../assets/Icons/arrowLeft.svg'
import Check from '../assets/Icons/Check.svg'
import Editar from '../assets/Icons/Editar.svg'

import EmployeerEquipment from '../components/EmployeerEquipment'

export default function ChangeEmployee({ route }) {
    const { item } = route.params
    const navigation = useNavigation()
    const [name, setName] = useState(item.name)
    const [identification_number, setIn] = useState(item.identification_number)
    const [document_number, setDn] = useState(item.document_number)
    const [email, setEmail] = useState(item.email)
    const [address, setAddress] = useState(item.address)
    const [phone, setPhone] = useState(item.phone)
    const [funcao, setFuncao] = useState(item.function)
    const [modalVisible, setModalVisible] = useState(false)
    const [show, setShow] = useState()
    const [listEquipment, setEquipment] = useState([])
    const redux = useSelector(state => state)


    function navi(item) {
        navigation.navigate('ChangeEquipment', { item: item })
    }

    function mask(input, type) {
        let value = input
        switch (type) {
            case "cpf":
                value = value.replace(/\D/g, "")
                value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
                setCpf(value)
                break
            case "number":
                value = value.replace(/\D/g, "")
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1)$2-$3")
                setNumber(value)
                break
            default:
                console.log("error type switch")
                break
        }
    }


    async function Edit() {
        const response = await api.post('/api/getEmployeer',
            {
                id: item.id,
            })
            .then(res => {
                if (res.data.status) {
                    return {
                        status: res.data.status,
                        employeer: res.data.employeer,
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

    async function save() {
        const response = await api.post('/api/editEmployeer',
            {
                token: redux.token,
                id: item.id,
                name: name,
                identification_number: identification_number,
                document_number: document_number,
                email: email,
                address: address,
                phone: phone,
                function: funcao,
            })
            .then(res => {
                if (res.data.status) {
                    setModalVisible(!modalVisible)
                    return {
                        status: res.data.status,
                        employeer: res.data.employeer,
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
        const response = await Edit()
        if (response.status) {
            setEquipment(response.equipament)
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
        <>
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.titleModal}>Membro alterado com sucesso</Text>
                            <Check
                                width={DEVICE_WIDTH * .25}
                                height={DEVICE_WIDTH * .25}
                            />
                            <TouchableOpacity style={styles.buttonModal} onPress={() => { setModalVisible(!modalVisible), navigation.navigate('Home') }}>
                                <Text style={styles.textButtonModal}>ir para o inicio</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
            <View style={styles.container}>
                <View style={styles.button}>
                    <View style={styles.row}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <ArrowLeft
                                width={DEVICE_WIDTH * .07}
                                height={DEVICE_WIDTH * .07}
                            />
                        </TouchableOpacity>
                        <Text style={styles.title}>Alterar Funcionário</Text>
                        <TouchableOpacity onPress={() => setShow(!show)}>
                            <Editar
                                width={DEVICE_WIDTH * .055}
                                height={DEVICE_WIDTH * .055}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.buttonInput}>
                            <TextInput
                                style={styles.input}
                                placeholderTextColor='#AEADB3'
                                placeholder='Nome completo'
                                keyboardType="default"
                                autoCorrect={false}
                                autoCapitalize="words"
                                value={name}
                                onChangeText={(value) => setName(value)}
                                onSubmitEditing={() => Keyboard.dismiss()}
                                editable={show ? true : false}
                            />
                        </View>

                        <View style={styles.buttonInput2}>
                            <TextInput
                                style={styles.input}
                                placeholderTextColor='#AEADB3'
                                placeholder='RG'
                                keyboardType="default"
                                autoCorrect={false}
                                autoCapitalize="words"
                                value={identification_number}
                                onChangeText={(value) => setIn(value)}
                                onSubmitEditing={() => Keyboard.dismiss()}
                                editable={show ? true : false}
                            />
                        </View>
                        <View style={styles.buttonInput2}>
                            <TextInput
                                style={styles.input}
                                placeholderTextColor='#AEADB3'
                                placeholder='CPF'
                                keyboardType="default"
                                autoCorrect={false}
                                autoCapitalize="words"
                                value={document_number}
                                onChangeText={(value) => setDn(value)}
                                onSubmitEditing={() => Keyboard.dismiss()}
                                editable={show ? true : false}
                            />
                        </View>
                        <View style={styles.buttonInput2}>
                            <TextInput
                                placeholder='Email'
                                style={styles.input}
                                keyboardType="default"
                                autoCorrect={false}
                                autoCapitalize="none"
                                placeholderTextColor='#AEADB3'
                                value={email}
                                maxLength={14}
                                blurOnSubmit={false}
                                onChangeText={(value) => setEmail(value)}
                                editable={show ? true : false}
                            />
                        </View>
                        <View style={styles.buttonInput2}>
                            <TextInput
                                placeholder='Endereço'
                                style={styles.input}
                                keyboardType="number-pad"
                                autoCorrect={false}
                                autoCapitalize="none"
                                placeholderTextColor='#AEADB3'
                                value={address}
                                blurOnSubmit={false}
                                maxLength={14}
                                onChangeText={(value) => setAddress(value)}
                                editable={show ? true : false}
                            />
                        </View>
                        <View style={styles.buttonInput2}>
                            <TextInput
                                placeholder='Telefone'
                                style={styles.input}
                                keyboardType="number-pad"
                                autoCorrect={false}
                                autoCapitalize="none"
                                placeholderTextColor='#AEADB3'
                                value={phone}
                                blurOnSubmit={false}
                                maxLength={14}
                                onChangeText={(value) => setPhone(value)}
                                editable={show ? true : false}
                            />
                        </View>
                        <View style={styles.buttonInput2}>
                            <TextInput
                                placeholder='Função'
                                style={styles.input}
                                keyboardType="number-pad"
                                autoCorrect={false}
                                autoCapitalize="none"
                                placeholderTextColor='#AEADB3'
                                value={funcao}
                                blurOnSubmit={false}
                                maxLength={14}
                                onChangeText={(value) => setFuncao(value)}
                                editable={show ? true : false}
                            />
                        </View>
                        <View>
                            {
                                listEquipment.map((item, key) => (
                                    <EmployeerEquipment
                                        key={key}
                                        navi={navi}
                                        item={item}
                                    />
                                ))
                            }
                        </View>

                        <TouchableOpacity style={styles.advanceButton} onPress={() => save()} >
                            <Text style={styles.text2}>salvar alteração</Text>
                        </TouchableOpacity>

                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
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
        alignItems: 'center',
    },
    button: {
        borderBottomLeftRadius: 45,
        borderBottomRightRadius: 45,
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT * .12,
        backgroundColor: '#232323',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: DEVICE_WIDTH * .9,
        alignItems: 'center',
        marginTop: DEVICE_HEIGHT * .06,
        alignSelf: 'center',
    },
    title: {
        fontSize: RFPercentage(2.2),
        color: '#FFFFFF',
        fontFamily: 'Montserrat-Medium',
    },
    buttonInput: {
        height: DEVICE_HEIGHT * .06,
        width: DEVICE_WIDTH * .9,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#232323',
        borderRadius: 40,
        flexDirection: 'row',
        marginTop: DEVICE_HEIGHT * .03,
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
        width: DEVICE_WIDTH,
        fontFamily: 'Montserrat-SemiBold',
        letterSpacing: .2,
    },
    advanceButton: {
        height: DEVICE_HEIGHT * .06,
        width: DEVICE_WIDTH * .8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#7400CA',
        borderRadius: 40,
        marginTop: DEVICE_HEIGHT * .04,
        marginBottom: DEVICE_HEIGHT * .4,
        alignSelf: 'center',
    },
    text2: {
        fontSize: RFPercentage(2.2),
        color: '#FFFFFF',
        fontFamily: 'Montserrat-Light',
        letterSpacing: .2,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#0005'
    },
    modalView: {
        width: DEVICE_WIDTH * .9,
        height: DEVICE_HEIGHT * .45,
        backgroundColor: "#1E1E1E",
        borderRadius: 50,
        alignItems: "center",
        justifyContent: 'center',
        shadowColor: "#1E1E1E",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    titleModal: {
        color: '#fff',
        fontSize: RFPercentage(2.4),
        width: DEVICE_WIDTH * .5,
        textAlign: 'center',
        marginTop: DEVICE_HEIGHT * .02,
        marginBottom: DEVICE_HEIGHT * .04,
        fontFamily: 'Montserrat-Medium'
    },
    buttonModal: {
        width: DEVICE_WIDTH * .7,
        height: DEVICE_HEIGHT * .07,
        backgroundColor: '#2C2A2B',
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        marginTop: DEVICE_HEIGHT * .06,
        marginBottom: DEVICE_HEIGHT * .04,
    },
    textButtonModal: {
        color: "#FFFFFF",
        fontSize: RFPercentage(2.4),
        fontFamily: 'Montserrat-Light',
        letterSpacing: .2,
    },
})