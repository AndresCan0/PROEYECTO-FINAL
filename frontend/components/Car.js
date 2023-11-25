//SOLO PARA ADMIN!
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Pressable,
    Picker 
} from "react-native";
import axios from "axios";
import { TextInput, Avatar, Button, IconButton } from "react-native-paper";
import {car_style} from  "../assets/css/car_Styles";
import { useNavigation } from '@react-navigation/native';

const url = "http://192.168.10.10:3000/api";

export default function Car() {
  const navigation = useNavigation();
    
    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
      } = useForm({
        defaultValues: {
          platenumber: "",
          brand: "",
          dailyvalue:"",
          status:"disponible",
          
        },
      });
    const [DataCars, setDataCars] = useState([]);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [plate, setPlate] = useState(1)
  

    /* Spinner de Estados */
    const [status, setStatus] = useState("disponible");
    const status_spinner = [
      {label: 'Disponible', value: 'disponible'},
      {label: 'No Disponible', value: 'no disponible'},
    ];





    const getCarsByPlatenumber = async (plate) => {
      
      try {
          const response = await axios.get(`${url}/cars/${plate}`);
          console.log(response.data.platenumber);
          
          if (!response.error) {
              setValue("platenumber", response.data.platenumber);
              setValue("brand", response.data.brand);
              setValue("dailyvalue", response.data.dailyvalue);
              setValue("status", response.data.status);
              setMessage("Carro encontrado");
          } else {
              console.log("No hay carros con placa: " + platenumber);
          }
      } catch (error) {
          console.log("Error fetching car data:", error);
          // Handle error (display message, etc.)
      }
  };
  
  
    
      const onSave = async (data) => {
        
        console.log(data)

        try{
          const resp = await axios.post(`${url}/cars`,data);
          if (resp.data.errors){
            setMessage(response.data.errors[0].msg); 
            setIsError(true);
          }else if (resp.data.message === 'La placa del auto ya exite, ingresa otro...') {
            // Usuario existe
            setMessage(resp.data.message);
            setIsError(true);
            reset()
      
          }else {
            // Usuario creado correctamente
         
            setMessage(resp.data.message); 
            setIsError(false);
            reset()
          }
        }
        catch (error){

          console.log(error);
          setMessage(resp.data.message)
          setIsError(true);
        }
        
      };
    
      const onUpdate = async (plate) => {
        try {
          console.log(plate)
          const response = await axios.put(`${url}/cars/${plate}`);
          setMessage("Carro actualizado correctamente...");
          setIsError(false)
        } catch (error) {
          console.log(error);
        }
      };
    
      const onDelete = async (plate) => {
        try {
          if (confirm("Está seguro de eliminar el Carro?")) {
            const response = await axios.delete(`${url}/cars/${plate}`);
            setMessage("Carro eliminado correctamente...");
            setIsError(false)

          }
    
        } catch (error) {
          console.log(error);
        }
      };

      
    return(
        <View style={car_style.container}>
            <IconButton
                icon="arrow-left"
                color="#000"
                size={25}
                onPress={() => navigation.navigate('AdminScreen')} 
            
            />
            <View style={car_style.form_container}>
            <Text style={car_style.title}>REGISTRAR VEHICULO</Text>
                <View style={car_style.input_container}> 
                <Controller
                control={control}
                rules={{
                required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Numero de Placa"
                  style={car_style.input}
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                
                />
              )}
              name="platenumber"
              />
              {errors.platenumber?.type == "required" && (
              <Text style={{ color: "red" }}>Numero de Placa es obligatoria</Text>
              )}

                    <Controller
                        control={control}
                        rules={{
                        required: true,
                        }}
                        render = {({field: { onChange, onBlur, value }}) => (
                        <TextInput 
                            label="Marca del Carro"
                            style={car_style.input}
                            onChangeText={onChange}
                            value={value}
                            onBlur={onBlur}
                        />
                        )}
                        name="brand"
                    />
                    {errors.brand?.type == "required" && (
                    <Text style={{ color: "red" }}>Marca obligatoria</Text>
                    )}

                    <Controller
                        control={control}
                        rules={{
                        required: true,
                        }}
                        render = {({field: { onChange, onBlur, value }}) => (
                        <TextInput 
                            label="Valor diario"
                            style={car_style.input}
                            onChangeText={onChange}
                            value={value}
                            onBlur={onBlur}
                        />
                        )}
                        name="dailyvalue"
                    />
                    {errors.brand?.type == "required" && (
                    <Text style={{ color: "red" }}>Valor diario obligatoria</Text>
                    )}


                    <Controller  
                        control={control}
                        render={({ field: { onChange, value } }) => (
                        <Picker
                            style={car_style.input}
                            selectedValue={value}
                            onValueChange={itemValue => {
                            onChange(itemValue)
                            setStatus(itemValue)  
                            }}  
                        >
                        {status_spinner.map(item => (
                        <Picker.Item key={item.value} label={item.label} value={item.value} /> 
                            ))}
                        </Picker>
                        )}
                        name="status"
                        />


                    <View style={car_style.button_container}>
                        <View style={car_style.row_button_container}>
                        <Button
                            style={car_style.button}
                            textColor="#ffffff"
                            onPress={handleSubmit(onSave)}
                        >
                            Guardar
                        </Button>
                        <Button
                            style={{...car_style.button}}
                            textColor="#ffffff"
                            onPress={() => getCarsByPlatenumber(plate)}
                        >
                            Buscar
                        </Button>
                        </View>

                        <View style={car_style.row_button_container}>
                        <Button
                            style={{...car_style.button}}
                            textColor="#ffffff"
                            onPress={handleSubmit(() => onUpdate(plate))}
                        >
                            Editar
                        </Button>
                        <Button
                            style={{...car_style.button}}
                            textColor="#ffffff"
                            onPress={() => onDelete(plate)}
                        >
                            Eliminar
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
        </View>

    )
}