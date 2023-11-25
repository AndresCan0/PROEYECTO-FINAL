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

export default function rentCar({ navigation }) {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      platenumber: "seleccione una placa",
      initialdate: new Date(),
      finaldate: new Date(),
      rentnumber: "",
    },
  });



  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [DataCars,setDataCars] = useState("")






  const handlePicker  = async () => {
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
  


const saveRent = async (data) => {
  try {
    
    const formattedinitialDate = format(data.initialdate, 'dd/MM/yyyy');
    const formattedFinalDate = format(data.finaldate, 'dd/MM/yyyy');
    const platenumber = (data.platenumber);
    const rentnumber = (data.rentnumber)
    console.log(data)
    // Realize any client-side validation if necessary
    const response = await axios.post(`${url}/rent`, {
      platenumber: platenumber,
      initialdate:formattedinitialDate ,
      finaldate: formattedFinalDate,
      rentnumber: rentnumber
    });

    // Assuming your backend sends a success message in the response
    console.log(response)
    setMessage(response.data.mensaje);
    setIsError(false);

    // Reset the form after successfully submitting it
    reset();
  } catch (error) {
    console.error(error);

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      setMessage(error.response.data.error);
    } else if (error.request) {
      // The request was made but no response was received
      setMessage("No se recibió respuesta del servidor");
    } else {
      // Something happened in setting up the request that triggered an Error
      setMessage("Error al procesar la solicitud");
    }

    setIsError(true);
  }
};
  

  const handleGoToCarList = () => {
    // Aquí deberías redirigir a la vista de lista de carros
    navigation.navigate('carList');
  };

  const handleLogout = () => {
    // Aquí deberías redirigir a la vista de Login
    navigation.navigate('Login');
  };

  useEffect(()=>{
    handlePicker();
  },[])

  return (
    <View style={car_style.container}>
      <View style={car_style.form_container}>
        <Text style={car_style.title}>Rent Car</Text>

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
      {DataCars.length > 0 ? (
        DataCars.map(item => (
          <Picker.Item key={item.platenumber} value={item.platenumber} label={item.platenumber} />
        ))
      ) : (
        <Picker.Item key={0} value={""} label={"No hay carros disponibles"} />
      )}
    </Picker>
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
        dateFormat="dd/MM/yyyy"  // Configura el formato directamente aquí
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
        dateFormat="dd/MM/yyyy"  // Configura el formato directamente aquí
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