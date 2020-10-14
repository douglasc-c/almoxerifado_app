import React from 'react'
import { StyleSheet, Dimensions, Text, View, TouchableOpacity } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { useNavigation } from '@react-navigation/native'

export default function Employeer(props) {
    const navigation = useNavigation()

    return (
        <TouchableOpacity onPress={() => props.navi(props.item)}>
            <View style={styles.container}>
                <View style={styles.button2}>
                    <View style={styles.textButton}>
                        <Text style={styles.name}>{props.name}</Text>
                        <Text style={styles.information2}>{props.document_number}</Text>
                        <Text style={styles.information2}>{props.email}</Text>
                        <Text style={styles.information2}>{props.phone}</Text>
                        <Text style={styles.information2}>{props.function}</Text>
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
        height: DEVICE_HEIGHT * .20,
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