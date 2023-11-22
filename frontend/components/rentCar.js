import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Text,
  View,
  Picker,
} from "react-native";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TextInput, Button } from "react-native-paper";
import { car_style } from "../assets/css/car_Styles";

const url = "http://192.168.10.12:4000/api";

export default function rentCar({ navigation }) {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      platenumber: "",
      initialdate: new Date(),
      finaldate: new Date(),
      rentnumber: "",
    },
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const saveRent = async (data) => {
    try {
      const { platenumber, initialdate, finaldate, rentnumber } = data;
  
      // Realiza cualquier validación del lado del cliente si es necesario
  
      const response = await axios.post(`${url}/rent`, {
        platenumber,
        initialdate,
        finaldate,
        rentnumber,
      });
  
      // Suponiendo que tu backend envía un mensaje de éxito en la respuesta
      setMessage(response.data.mensaje);
      setIsError(false);
  
      // Reinicia el formulario después de enviarlo con éxito
      reset();
    } catch (error) {
      console.error(error);
      setMessage("Hubo un error al procesar la solicitud");
      setIsError(true);
    }
  };
  

  const handleGoToCarList = () => {
    // Aquí deberías redirigir a la vista de lista de carros
    navigation.navigate('CarList');
  };

  const handleLogout = () => {
    // Aquí deberías redirigir a la vista de Login
    navigation.navigate('Login');
  };

  return (
    <View style={car_style.container}>
      <View style={car_style.form_container}>
        <Text style={car_style.title}>Rent Car</Text>

        <View style={car_style.input_container}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Plate Number"
                style={car_style.input}
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
              />
            )}
            name="platenumber"
          />
          <View style={car_style.datePickerContainer}>
            <Text style={car_style.input_text}>Initial Date</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <DatePicker
                  selected={value}
                  onChange={(date) => onChange(date)}
                  dateFormat="dd/MM/yyyy"
                  withPortal
                  portalId="root-portal"
                  minDate={new Date()} 
                  style={car_style.datePicker}
                />
              )}
              name="initialdate"
            />
          </View>

          <View style={car_style.datePickerContainer}>
            <Text style={car_style.input_text}>Final Date</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <DatePicker
                  selected={value}
                  onChange={(date) => onChange(date)}
                  dateFormat="dd/MM/yyyy"
                  withPortal
                  portalId="root-portal"
                  minDate={new Date()} 
                  style={car_style.datePicker}
                />
              )}
              name="finaldate"
            />
          </View>

  <Controller
    control={control}
    render={({ field: { onChange, onBlur, value } }) => (
      <TextInput
        label="Rent Number"
        style={car_style.input}
        onChangeText={onChange}
        value={value}
        onBlur={onBlur}
      />
    )}
    name="rentnumber"
  />

          
          <Button
            style={car_style.button}
            onPress={handleSubmit(saveRent)}
          >
            Guardar Renta
          </Button>
          <View style={car_style.row_button_container}>
          <Button
            style={car_style.button}
            onPress={handleGoToCarList}
          >
            Ir a Lista de Carros
          </Button>
          <Button
            style={car_style.button}
            onPress={handleLogout}
          >
            Cerrar Sesión
          </Button>
          
        </View>
        {message && (
          <Text style={isError ? car_style.message_error : car_style.message_success}>
            {message}
          </Text>
        )}
        </View>

        

        
      </View>
    </View>
  );
}
