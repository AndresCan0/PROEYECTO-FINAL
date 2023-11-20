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

const url = "http://172.16.60.103:4000/api/login"
  
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
            role:""

        },
    });
    const [dataUsers, setDataUsers] = useState([]);
    const [id, setId] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);



    const getUsers = async () => {
        try {
          const response = await axios.get(url);
          console.log(response);
          if (!response.data.error) {
            setDataUsers(response.data);
          }
          else {
            console.log("No hay usuarios para mostrar");
          }
        } catch (error) {
          console.log(error);
        }
      };

      const signIn = async () => {
        try {
          const loggedUser = await axios.post(`${url}`, {username, password});
          
          if (loggedUser.data.rol === "usuario") {
            navigation.navigate('rentcar');
          } else if (loggedUser.data.rol === "admin") {
            navigation.navigate('adminScreen'); 
          }
        } catch (error) {
          if (error.response && error.response.status === 400) {
            
            console.error('Error 400: Nombre de usuario y/o contraseña incorrectos');
          
          } else {
           
            console.error('Error durante el inicio de sesión:', error.message);

          }
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
