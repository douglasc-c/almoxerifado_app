import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Dimensions, Text, View, TextInput, Keyboard, KeyboardAvoidingView, ScrollView, TouchableOpacity, Modal, Alert } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import RNPickerSelect from 'react-native-picker-select'
import api from '../services/api'
import { useSelector } from 'react-redux'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import ArrowRigth from '../assets/Icons/ArrowRigth.svg'


import SetaEsquerda from '../assets/Icons/SetaEsquerda.svg'
import Check from '../assets/Icons/Check.svg'
import Editar from '../assets/Icons/Editar.svg'

export default function PageEquipment({ route, navigation }) {
    const { item } = route.params
    const [brand, setBrand] = useState(item.brand)
    const [model, setModel] = useState(item.model)
    const [serial_number, setSnumber] = useState(item.serial_number)
    const [accessories, setAccessories] = useState(item.accessories)
    const [access_password, setApassword] = useState(item.access_password)
    const [icloud_email, setIcemail] = useState(item.icloud_email)
    const [icloud_password, setIcpassword] = useState(item.icloud_password)
    const [status, setStatus] = useState(item.status.toString())
    const [description, setDescription] = useState(item.description)
    const [idEmploy, setIdemployeer] = useState(item.employeer_id.toString())
    const [modalVisible, setModalVisible] = useState(false)
    const [show, setShow] = useState(false)
    const redux = useSelector(state => state)
    const [selected, setSelected] = useState(true)


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
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1).$2-$3")
                setNumber(value)
                break
            default:
                console.log("error type switch")
                break
        }
    }

    async function Edit() {
        const response = await api.post('/api/editEquipament',
            {
                id: item.id,
                token: redux.token.toString(),
                brand: brand,
                model: model,
                serial_number: serial_number,
                accessories: accessories,
                access_password: access_password,
                icloud_email: icloud_email,
                icloud_password: icloud_password,
                status: status,
                description: description,
                employeer_id: idEmploy,
            })
            .then(res => {
                if (res.data.status) {
                    return {
                        status: res.data.status,
                        equipament: res.data.equipament,
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
            setModalVisible(!modalVisible)

        }
        else
            Alert.alert("Verifique os dados informados e tente novamente")
    }

    useFocusEffect(
        useCallback(() => {
            if (redux.userSelected != '') {
                setSelected(false)
            }
        }, [redux.userSelected])
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
                            <Text style={styles.titleModal}>Equipamento alterado com sucesso</Text>
                            <Check
                                width={DEVICE_WIDTH * .25}
                                height={DEVICE_WIDTH * .25}
                            />
                            <TouchableOpacity style={styles.buttonModal} onPress={() => { setModalVisible(!modalVisible), navigation.goBack() }}>
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
                            <SetaEsquerda
                                width={DEVICE_WIDTH * .07}
                                height={DEVICE_WIDTH * .07}
                            />
                        </TouchableOpacity>
                        <Text style={styles.title}>Alterar Equipamentos</Text>
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
                                placeholder='Marca'
                                keyboardType="default"
                                autoCorrect={false}
                                autoCapitalize="words"
                                value={brand}
                                onChangeText={(value) => setBrand(value)}
                                onSubmitEditing={() => Keyboard.dismiss()}
                                editable={show ? true : false}
                            />
                        </View>

                        <View style={styles.buttonInput2}>
                            <TextInput
                                style={styles.input}
                                placeholderTextColor='#AEADB3'
                                placeholder='Modelo'
                                keyboardType="default"
                                autoCorrect={false}
                                autoCapitalize="words"
                                value={model}
                                onChangeText={(value) => setModel(value)}
                                onSubmitEditing={() => Keyboard.dismiss()}
                                editable={show ? true : false}
                            />
                        </View>
                        <View style={styles.buttonInput2}>
                            <TextInput
                                style={styles.input}
                                placeholderTextColor='#AEADB3'
                                placeholder='Número de serie'
                                keyboardType="default"
                                autoCorrect={false}
                                autoCapitalize="words"
                                value={serial_number}
                                onChangeText={(value) => setSnumber(value)}
                                onSubmitEditing={() => Keyboard.dismiss()}
                                editable={show ? true : false}
                            />
                        </View>
                        <View style={styles.buttonInput2}>
                            <TextInput
                                placeholder='Acessórios'
                                style={styles.input}
                                keyboardType="default"
                                autoCorrect={false}
                                autoCapitalize="none"
                                placeholderTextColor='#AEADB3'
                                value={accessories}
                                blurOnSubmit={false}
                                onChangeText={(value) => setAccessories(value)}
                                editable={show ? true : false}
                            />
                        </View>
                        <View style={styles.buttonInput2}>
                            <TextInput
                                placeholder='Senha de acesso'
                                style={styles.input}
                                autoCorrect={false}
                                autoCapitalize="none"
                                placeholderTextColor='#AEADB3'
                                value={access_password}
                                blurOnSubmit={false}
                                onChangeText={(value) => setApassword(value)}
                                editable={show ? true : false}
                            />
                        </View>
                        <View style={styles.buttonInput2}>
                            <TextInput
                                placeholder='Email iCloud'
                                style={styles.input}
                                keyboardType="default"
                                autoCorrect={false}
                                autoCapitalize="none"
                                placeholderTextColor='#AEADB3'
                                value={icloud_email}
                                blurOnSubmit={false}
                                onChangeText={(value) => setIcemail(value)}
                                editable={show ? true : false}
                            />
                        </View>
                        <View style={styles.buttonInput2}>
                            <TextInput
                                placeholder='Senha do icloud'
                                style={styles.input}
                                keyboardType="default"
                                autoCorrect={false}
                                autoCapitalize="none"
                                placeholderTextColor='#AEADB3'
                                value={icloud_password}
                                blurOnSubmit={false}
                                onChangeText={(value) => setIcpassword(value)}
                                editable={show ? true : false}
                            />
                        </View>
                        <View style={styles.buttonInput2}>
                            <TextInput
                                placeholder='Status'
                                style={styles.input}
                                keyboardType="default"
                                autoCorrect={false}
                                autoCapitalize="none"
                                placeholderTextColor='#AEADB3'
                                value={status}
                                blurOnSubmit={false}
                                onChangeText={(value) => setStatus(value)}
                                editable={show ? true : false}
                            />
                        </View>
                        <View style={styles.buttonInput2}>
                            <TextInput
                                placeholder='Descrição'
                                style={styles.input}
                                keyboardType="default"
                                autoCorrect={false}
                                autoCapitalize="none"
                                placeholderTextColor='#AEADB3'
                                value={description}
                                blurOnSubmit={false}
                                onChangeText={(value) => setDescription(value)}
                                editable={show ? true : false}
                            />
                        </View>
                        {selected ?
                            <TouchableOpacity style={styles.buttonInput2} onPress={() => navigation.navigate('ListOfEmployees')}>
                                <Text style={styles.Txtinput}>Funcionario</Text>
                                <ArrowRigth
                                    width={DEVICE_WIDTH * .065}
                                    height={DEVICE_WIDTH * .065}
                                />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.buttonInput2} onPress={() => navigation.navigate('ListOfEmployees')}>
                                <Text>NAME: {redux.userSelectedName} - id - {redux.userSelected}</Text>
                            </TouchableOpacity>
                        }

                        <TouchableOpacity style={styles.advanceButton} onPress={() => click()}>
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
        marginTop: DEVICE_HEIGHT * .04,
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
    input2: {
        color: '#AEADB3',
        letterSpacing: .2,
        fontSize: RFPercentage(1.5),
        paddingLeft: DEVICE_WIDTH * .05,
        width: DEVICE_WIDTH * .84,
        marginTop: DEVICE_HEIGHT * .02,
        fontFamily: 'Montserrat-SemiBold',
        letterSpacing: .2,
    },
    advanceButton: {
        height: DEVICE_HEIGHT * .06,
        width: DEVICE_WIDTH * .8,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#7400CA',
        borderRadius: 40,
        marginTop: DEVICE_HEIGHT * .04,
        marginBottom: DEVICE_HEIGHT * .3,
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
        fontSize: RFPercentage(2.5),
        width: DEVICE_WIDTH * .6,
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
        color: "#fff",
        fontSize: RFPercentage(2.4),
        fontFamily: 'Montserrat-Light',
        letterSpacing: .2,
    },
    icon: {
        marginTop: DEVICE_HEIGHT * .008,

    },
})