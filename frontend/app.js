import React, {useState} from 'react';
import { Text, View } from 'react-native';
import Login from  './components/Login';
import CreateAcc from './components/CreateAcc';
import ForgotPass from './components/ForgotPass';
import Car from './components/Car'
import RentCar from './components/rentCar'
import carList from './components/carList'
import AdminScreen from './components/AdminScreen'
import returnCar from './components/returnCar'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

const stack = createNativeStackNavigator();

export default function App(){

    return(
        <NavigationContainer>

            <stack.Navigator
                initialRouteName='returnCar'
            >
                <stack.Screen name="CreateAcc" component={CreateAcc}/>
                <stack.Screen name="Login" component={Login}/>
                <stack.Screen name="ForgotPass" component={ForgotPass}/>
                <stack.Screen name="Car" component={Car}/>
                <stack.Screen name="RentCar" component={RentCar}/>
                <stack.Screen name="carList" component={carList}/>
                <stack.Screen name="AdminScreen" component={AdminScreen}/>
                <stack.Screen name="returnCar" component={returnCar}/>


            </stack.Navigator>              
            

        </NavigationContainer>
    )
}