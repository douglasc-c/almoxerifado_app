import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import StartPage from '../pages/StartPage'
import Login from '../pages/Login'
import Home from '../pages/Home'

import Tabs from './TabRoutes'

const Stack = createStackNavigator();

function App() {

    return (

        <NavigationContainer >
            <Stack.Navigator initialRouteName="StartPage">
                <Stack.Screen name="StartPage" component={StartPage} options={{ headerShown: false, gestureEnabled: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false, gestureEnabled: false }} />
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false, gestureEnabled: false }} />

                <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false, gestureEnabled: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default App;