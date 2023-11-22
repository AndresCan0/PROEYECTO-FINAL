import React, {useState} from 'react';
import { Text, View } from 'react-native';
import Login from  './components/Login';
import CreateAcc from './components/CreateAcc';
import ForgotPass from './components/ForgotPass';
import Car from './components/Car'
import rentCar from './components/rentCar'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

const stack = createNativeStackNavigator();

export default function App(){

    return(
        <NavigationContainer>

            <stack.Navigator
                initialRouteName='Car'
            >
                <stack.Screen name="CreateAcc" component={CreateAcc}/>
                <stack.Screen name="Login" component={Login}/>
                <stack.Screen name="ForgotPass" component={ForgotPass}/>
                <stack.Screen name="Car" component={Car}/>
                <stack.Screen name="rentCar" component={rentCar}/>
            </stack.Navigator>              

        </NavigationContainer>
    )
}