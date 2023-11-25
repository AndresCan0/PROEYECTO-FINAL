import React from 'react';
import { View, Text } from 'react-native';
import {Button} from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import {IconButton } from "react-native-paper";
import { LoginStyles } from '../assets/css/login_Styles';

const AdminScreen = () => {
  const navigation = useNavigation();

  const goToCarScreen = () => {
    navigation.navigate('Car');
  };

  const goToReturnCarScreen = () => {
    navigation.navigate('returnCar');
  };

  return (
    <View style={LoginStyles.container}>
        
      <View style={LoginStyles.input_container}>
      <IconButton
                icon="arrow-left"
                color="#000"
                size={25}
                onPress={() => navigation.navigate('Login')} 
                style={LoginStyles.backButton}
            />
        <Text style={LoginStyles.title}>Menu Admin </Text>
        <View style={LoginStyles.button_container}>
                <Button
                style={LoginStyles.button}
                textColor="black"
                onPress={goToCarScreen}
                >
                    Ir a Car
                </Button>
                <Button
                style={LoginStyles.button}
                textColor="black"
                onPress={goToReturnCarScreen}
                >
                     Ir a ReturnCar
                </Button>
            </View>
      </View>
    </View>
  );
};

export default AdminScreen;
