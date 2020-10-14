import React from 'react'
import { StyleSheet, Dimensions, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { useNavigation } from '@react-navigation/native'


export default function PageAdd() {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <View style={styles.button}>
                <Text style={styles.text}>Adicionar</Text>
                <TouchableOpacity style={styles.buttonInput} onPress={() => navigation.navigate('AddEmployee')}>
                    <Text style={styles.textButton}>Funcionario</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonInput} onPress={() => navigation.navigate('AddEquipment')}>
                    <Text style={styles.textButton}>Equipamento</Text>
                </TouchableOpacity>
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
        backgroundColor: '#1E1E1E'
    },
    text: {
        fontSize: RFPercentage(2.2),
        color: '#FFFFFF',
        textAlign: 'center',
        marginVertical: DEVICE_HEIGHT * .045,
        fontFamily: 'Montserrat-Medium',
    },
    button: {
        borderRadius: 20,
        width: DEVICE_WIDTH * .8,
        height: DEVICE_HEIGHT * .35,
        backgroundColor: '#7400CA',
        marginTop: DEVICE_HEIGHT * .25,
        alignSelf: 'center',
    },
    buttonInput: {
        height: DEVICE_HEIGHT * .06,
        width: DEVICE_WIDTH * .7,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#232323',
        borderRadius: 40,
        marginTop: DEVICE_HEIGHT * .025,
    },
    textButton: {
        fontSize: RFPercentage(2.4),
        color: '#FFFFFF',
        letterSpacing: .2, 
        fontFamily: 'Montserrat-Light'
        
    },
})