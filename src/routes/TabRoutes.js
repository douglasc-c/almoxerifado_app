import * as React from 'react'
import { Image, Dimensions, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import ComputerPurple from '../assets/Icons/ComputerPurple.svg'
import ComputerWhite from '../assets/Icons/ComputerWhite.svg'
import Add from '../assets/Icons/Add.svg'
import UserWhite from '../assets/Icons/UserWhite.svg'
import UserPurple from '../assets/Icons/UserPurple.svg'

import Home from '../pages/Home'
import PageAdd from '../pages/PageAdd'
import Equipment from '../pages/Equipment'
import AddEmployee from '../pages/AddEmployee'
import AddEquipment from '../pages/AddEquipment'
import ChangeEmployee from '../pages/ChangeEmployee'
import ChangeEquipment from '../pages/ChangeEquipment'
import ListOfEmployees from '../pages/ListOfEmployees'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="ChangeEmployee" component={ChangeEmployee} options={{ headerShown: false }} />
            <Stack.Screen name="ChangeEquipment" component={ChangeEquipment} options={{ headerShown: false }} />
            <Stack.Screen name="ListOfEmployees" component={ListOfEmployees} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}
function AddStack() {
    return (
        <Stack.Navigator >
            <Stack.Screen name="PageAdd" component={PageAdd} options={{ headerShown: false }} />
            <Stack.Screen name="AddEmployee" component={AddEmployee} options={{ headerShown: false }} />
            <Stack.Screen name="AddEquipment" component={AddEquipment} options={{ headerShown: false }} />
            <Stack.Screen name="ListOfEmployees" component={ListOfEmployees} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}
function ComputerStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Equipment" component={Equipment} options={{ headerShown: false }} />
            <Stack.Screen name="ChangeEquipment" component={ChangeEquipment} options={{ headerShown: false }} />
            <Stack.Screen name="ListOfEmployees" component={ListOfEmployees} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}
export default function App() {

    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: '#232323',
                inactiveTintColor: '#232323',
                style: {
                    backgroundColor: '#232323',
                    height: DEVICE_HEIGHT * .1,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    paddingTop: DEVICE_HEIGHT * .02,
                    position: "absolute",
                }
            }}>
            <Tab.Screen name="Home" component={HomeStack}
                options={{
                    tabBarIcon: ({ focused }) => (focused ?
                        <UserPurple
                            width={DEVICE_WIDTH * .12}
                            height={DEVICE_WIDTH * .12}
                        />
                        : <UserWhite
                            width={DEVICE_WIDTH * .12}
                            height={DEVICE_WIDTH * .12}
                        />)

                }} />
            <Tab.Screen name="Add" component={AddStack}
                options={{
                    tabBarIcon: ({ focused }) => (focused ?
                        <Add
                            width={DEVICE_WIDTH * .18}
                            height={DEVICE_WIDTH * .18}
                            style={styles.button}
                        />
                        : <Add
                            width={DEVICE_WIDTH * .18}
                            height={DEVICE_WIDTH * .18}
                            style={styles.button}
                        />)
                }} />
            <Tab.Screen name="Computer" component={ComputerStack}
                options={{
                    tabBarIcon: ({ focused }) => (focused ?
                        <ComputerPurple
                            width={DEVICE_WIDTH * .08}
                            height={DEVICE_WIDTH * .08}
                        />
                        :
                        <ComputerWhite
                            width={DEVICE_WIDTH * .08}
                            height={DEVICE_WIDTH * .08}
                        />)
                }} />

        </Tab.Navigator>
    );
}

const DEVICE_WIDTH = Dimensions.get('window').width
const DEVICE_HEIGHT = Dimensions.get('window').height

const styles = StyleSheet.create({
    button: {
        marginTop: - DEVICE_HEIGHT * .05,
    }

})