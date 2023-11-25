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
import {LoginStyles} from  "../assets/css/login_Styles";


const url = "http://192.168.10.10:3000/api";


export default function ForgotPass({navigation}) {

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
      } = useForm({
        defaultValues: {
          username: "",
          reservedword: "",
          newPassword:""
        },
      });
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);




   


    const forgotPassword = async (data) => {
      try {
        console.log(data)
        const response = await axios.post(`${url}/forgotpassword`, data);
        console.log(response)
  
        if (response.data.message === 'Contraseña actualizada correctamente') {
          setMessage(response.data.message);
          setIsError(false);
        } else {
        
          setMessage(response.data.message);
          setIsError(true);
        }
      } catch (error) {
        console.error(error);
        // Mostrar un mensaje de error genérico
        setMessage("Hubo un error al procesar la solicitud");
        setIsError(true);
      }
    };

      return(

        <View style={LoginStyles.container}>

            <View style={LoginStyles.login_container}>
                <Text style={LoginStyles.title}>Reiniciar Contraseña </Text>

                <View style={LoginStyles.input_container}>
                        <Controller
                        control={control}
                        rules={{
                        required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                        label="Username"
                        style={LoginStyles.input}
                        onChangeText={onChange}
                        value={value}
                        onBlur={onBlur}
                        
                        />
                    )}
                    name="username"
                    />
                    {errors.username?.type == "required" && (
                    <Text style={{ color: "red" }}>Usuario es obligatorio</Text>
                    )}
                         <Controller
                             control={control}

                              render={({ field: { onChange, onBlur, value } }) => (
                                    

                               <TextInput
                                    label="Palabra reservada" 
                                    style={[LoginStyles.input]}
                                    onChangeText={onChange}
                                    value={value}
                                    onBlur={onBlur}
                                    />  
                                    )}
                            name="reservedword"
                         />
                        {errors.reservedword?.type == "required" && (
            <Text style={{ color: "red" }}>Ingrese su palabra reservada</Text>
            )}


                      <Controller
                             control={control}
                              render={({ field: { onChange, onBlur, value } }) => (
                                    

                                    <TextInput
                                    label="Nueva Contraseña" 
                                    style={[LoginStyles.input]}
                                    onChangeText={onChange}
                                    value={value}
                                    onBlur={onBlur}
                                    secureTextEntry={!showPassword}
                                    icon={showPassword ? 'car-door' : 'car-door-lock'}
                                    onPress={() => setShowPassword(!showPassword)}
                                    />  
                                    )}
                                    name="newPassword"
                         />
                        {errors.newPassword?.type == "required" && (
                        <Text style={{ color: "red" }}>Contraseña es obligatorio</Text>
                        )}


            <View style={LoginStyles.button_container}>
                <Button
                style={LoginStyles.button}
                textColor="black"
                onPress={handleSubmit(forgotPassword)}
                >
                    Actualizar Contraseña
                </Button>
                <Button
                    style={LoginStyles.button}
                    textColor="black"
                    onPress={() => navigation.navigate('Login')} 
                    >
                    Volver
                </Button>
                {message && (
              <Text style={{ color: isError ? "red" : "green", marginTop: 10 }}>
              {message}
            </Text>
            )}

            </View>
                </View>

            </View>
        </View>
      )

}