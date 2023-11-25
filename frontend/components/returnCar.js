import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Text,
  View,
  Picker,
} from "react-native";
import axios from "axios";
import {useRoute} from '@react-navigation/native'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import format from "date-fns/format";
import { TextInput, Button } from "react-native-paper";
import { car_style } from "../assets/css/car_Styles";

const url = "http://192.168.10.10:3000/api";

export default function returnCar({navigation}) {

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
      } = useForm({
        defaultValues: {
            returnnumber: "",
            rentnumber:"",
            returndate: new Date(),
        },
      });

      const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [DataRents,setDataRents] = useState("")
  const [DataCars,setDataCars] = useState("")


  const handlePickerRent  = async () => {
    try {
        const response = await axios.get(`${url}/rent`);

        
        const rentData = response.data.cars;
        
        console.log("rent Data:", rentData);
        setDataRents(rentData);
        setIsError(false);
    } catch (error) {
        console.log("Error fetching data:", error);
        setMessage("Error fetching car data");
        setIsError(true);
    }
};    

const handlePickerCar  = async () => {
    try {
        const response = await axios.get(`${url}/cars`);

        
        const carsData = response.data.cars;
        
        console.log("Cars Data:", carsData);
        setDataCars(carsData);
        setIsError(false);
    } catch (error) {
        console.log("Error fetching data:", error);
        setMessage("Error fetching car data");
        setIsError(true);
    }
};    


const ReturnRent = async () => {




};

const handleLogout = () => {
    // Aquí deberías redirigir a la vista de Login
    navigation.navigate('Login');
  };

  useEffect(()=>{
    handlePickerRent();
    handlePickerCar();
  },[])

return(


    <View style={car_style.container}>
        <View style={car_style.form_container}>

        <Text style={car_style.title}>Renturn Car</Text>
        <View style={car_style.input_container}>

        <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
                <Picker
                selectedValue={value}
                onValueChange={(itemValue) => {
                    onChange(itemValue);
                }}
                style={car_style.input}
                >
                {DataRents.length > 0 ? (
                    DataRents.map(item => (
                    <Picker.Item key={item.returnnumber} value={item.returnnumber} label={item.returnnumber} />
                    ))
                ) : (
                    <Picker.Item key={0} value={""} label={"No hay rentas disponibles"} />
                )}
                </Picker>
            )}
            name="returnnumber"
        />


        <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
                label="Placa"
                style={car_style.input}
                 aria-disabled
                editable={false}
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
            />
  )}
/>    
        </View>


        </View>
    </View>




)

}