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

const url = "http://192.168.10.12:4000/api"
  
export default function Login({navigation}) {
    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
      } = useForm({
        defaultValues: {
            username: "",
            password: "",
            

        },
    });
    const [dataUsers, setDataUsers] = useState([]);
    const [id, setId] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const signIn = async (data) => {
      try {
          const response = await axios.post(`${url}/login`, {
              username: data.username,
              password: data.password,
          });
  
          if (response.data.message.includes('exitoso')) {
              // Aquí puedes manejar el éxito del inicio de sesión, por ejemplo, redirigir a otra pantalla.
              console.log(response.data.message);
                console.log(response.data.role)

                // Verificar el rol del primer usuario (asumo que el rol está en la propiedad 'role').
                if (response.data.role === 'usuario') {
                    // Redirigir a la pantalla 'Car' si el rol es 'administrador'.
                    navigation.navigate('rentCar');
                } else if(response.data.role === 'administrador'){
                    // Redirigir a la pantalla 'RentCar' si el rol es 'usuario'.
                    navigation.navigate('Car');
                }
            
          } else {
              // Aquí puedes manejar el caso en el que el inicio de sesión no fue exitoso.
              console.log(response.data.message);
          }
      } catch (error) {
          // Aquí puedes manejar errores de la solicitud, como problemas de red.
          console.error(error);
      }
  };
  

      

      return(

        <View style={LoginStyles.container}>

            <View style={LoginStyles.login_container}>
                <Text style={LoginStyles.title}>Login </Text>

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
                                    label="Password" 
                                    style={[LoginStyles.input]}
                                    onChangeText={onChange}
                                    value={value}
                                    onBlur={onBlur}
                                    secureTextEntry={!showPassword}
                                    icon={showPassword ? 'car-door' : 'car-door-lock'}
                                    onPress={() => setShowPassword(!showPassword)}
                                    />  
                                    )}
                                    name="password"
                         />
                    {errors.password?.type == "required" && (
                         <Text style={{ color: "red" }}>Contraseña es obligatoria</Text>
                    )}


            <View style={LoginStyles.button_container}>
                <Button
                style={LoginStyles.button}
                textColor="black"
                onPress={handleSubmit(signIn)}
                >
                    Iniciar Sesion
                </Button>
                <Button
                style={LoginStyles.button}
                textColor="black"
                onPress={() => navigation.navigate('CreateAcc')}
                >
                    ¡Crea una Cuenta!
                </Button>
                <Button
                    style={LoginStyles.button}
                    textColor="black"
                    onPress={() => navigation.navigate('ForgotPass')} 
                    >
                    ¿Olvido su constraseña?
                </Button>

            </View>
                </View>

            </View>
        </View>



      )
}
