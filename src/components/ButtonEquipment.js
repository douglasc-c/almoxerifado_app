import React from 'react'
import { StyleSheet, Dimensions, Text, View, TouchableOpacity } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { useNavigation } from '@react-navigation/native'

export default function ButtonEquipment(props) {
    const navigation = useNavigation()

    return (
        <TouchableOpacity onPress={() => props.navi(props.item)}>
            <View style={styles.container}>
                <View style={styles.button2}>
                    <View style={styles.textButton}>
                        <Text style={styles.model}><Text style={styles.info}>Modelo: </Text> {`${props.item.brand} - ${props.item.model}`}</Text>
                        <Text style={styles.information}><Text style={styles.info}>Status: </Text> {props.status == 1 ? "Ativo" : "Inativo"}</Text>
                        <Text style={styles.information}><Text style={styles.info}>Acesso: </Text>{props.access_password}</Text>
                        <Text style={styles.information}><Text style={styles.info}>Funcionária: </Text>{props.item.employeer.name}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const DEVICE_WIDTH = Dimensions.get('window').width
const DEVICE_HEIGHT = Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        width: DEVICE_WIDTH,
    },
    button2: {
        borderRadius: 20,
        width: DEVICE_WIDTH * .9,
        height: DEVICE_HEIGHT * .17,
        backgroundColor: '#232323',
        marginTop: DEVICE_HEIGHT * .02,
        alignSelf: 'center',
    },
    model: {
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
    information: {
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
    info: {
        fontSize: RFPercentage(1.5),
        color: '#FFFFFF',
        // textAlign: 'center',
        // alignSelf: 'flex-start',
        marginBottom: DEVICE_HEIGHT * .015,
        fontFamily: 'Montserrat-SemiBold',
    }
})