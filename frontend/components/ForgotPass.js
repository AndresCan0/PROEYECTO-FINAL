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


const url = "http://172.16.60.103:4000/api/forgotpassword"


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
          name: "",
          password: "",
          role: "",
          reservword:""
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
            console.log("No hay clientes para mostrar");
          }
        } catch (error) {
          console.log(error);
        }
      };


    const forgotPasword = async (data) => {
        try {
          const response = await axios.post(`${url}`, data);
          setMessage("Contraseña actualizada correctamente...");
          getUsers();
          setIsError(false)
        } catch (error) {
          console.log(error);
        }

    useEffect(()=>{
        getUsers()
    },[])
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
                                    label="Palabra reservada" 
                                    style={[LoginStyles.input]}
                                    onChangeText={onChange}
                                    value={value}
                                    onBlur={onBlur}
                                    secureTextEntry={!showPassword}
                                    icon={showPassword ? 'car-door' : 'car-door-lock'}
                                    onPress={() => setShowPassword(!showPassword)}
                                    />  
                                    )}
                            name="reservword"
                         />
                        {errors.reservword?.type == "required" && (
            <Text style={{ color: "red" }}>Ingrese una palabra reservada</Text>
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
                                    name="password"
                         />
                        {errors.username?.type == "required" && (
                        <Text style={{ color: "red" }}>Contraseña es obligatorio</Text>
                        )}


            <View style={LoginStyles.button_container}>
                <Button
                style={LoginStyles.button}
                textColor="black"
                onPress={handleSubmit(forgotPasword)}
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

            </View>
                </View>

            </View>
        </View>
      )

}