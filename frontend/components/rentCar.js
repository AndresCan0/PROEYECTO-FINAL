import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    StyleSheet,
    Text,
    View,
    Picker,
} from "react-native";
import axios from "axios";
import { TextInput, Avatar, Button, IconButton } from "react-native-paper";
import {car_style} from  "../assets/css/car_Styles";



const url = "http://192.168.10.12:4000/api";

export default function rentCar({navigation}) {


    return(
        <View style={car_style.container}>

            <View style={car_style.login_container}>
                <Text style={car_style.title}>Renta Autos </Text>

                <View style={car_style.input_container}>

                        

                </View>
            </View> 
        </View>   

    )
}