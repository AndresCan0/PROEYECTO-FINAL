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



const url = "http://192.168.10.12:4000/api";

export default function CreateAcc({navigation}) {
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
          role: "usuario",
          reservedword:""
        },
      });
      const [dataUsers, setDataUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
   

    /* Spinner de roles */
    const [role, setRole] = useState("usuario");
    const roles = [
      {label: 'Administrador', value: 'administrador'},
      {label: 'Usuario', value: 'usuario'},
    ];




    const getUsers = async () => {
        try {
          const response = await axios.get(`${url}/accounts`);
          console.log(response);
          if (!response.data.error) {
            setDataUsers(response.data.users);
          }
          else {
            console.log(response.data.message);
          }
        } catch (error) {
          console.log(error);
        }
      };

      const onSave = async (data) => {
        console.log('Data enviada:', data);

        try {
          const resp = await axios.post(`${url}/register`,data);
          if (resp.data.errors) {
            // Manejar errores de validación
            setMessage(response.data.errors[0].msg); 
            setIsError(true);
      
          } else if (resp.data.message === 'El usuario ya existe, ingresa otro...') {
            // Usuario existe
            setMessage(resp.data.message);
            setIsError(true);
      
          } else {
            // Usuario creado correctamente
            getUsers();
            setMessage(resp.data.message); 
            setIsError(false);
          }
      
        } catch (error) {
          console.log(error);
        }
      };

      

      useEffect(()=>{
        getUsers()
      },[])
      return(
        <View style={LoginStyles.container}>
          <View style={LoginStyles.login_container}>

          <Text style={LoginStyles.title}>Crea tu cuenta </Text>

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
                rules={{
                required: true,
                }}
                render = {({field: { onChange, onBlur, value }}) => (
                <TextInput
                  label="Nombre"
                  style={LoginStyles.input}
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  
                />
                )}
                name="name"
              />
              {errors.name?.type == "required" && (
              <Text style={{ color: "red" }}>Nombres obligatorios</Text>
              )}

            <Controller
            control={control}

            render={({ field: {  onChange, onBlur, value } }) => (
            

            <TextInput
              label="Password" 
              style={[LoginStyles.input]}
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
            />  
            )}
            name="password"
            />
            {errors.password?.type == "required" && (
            <Text style={{ color: "red" }}>Contraseña es obligatoria</Text>
            )}

<Controller 
  control={control}
  name="role"

  render={({ field: { onChange, value } }) => (
    <Picker
      selectedValue={value}
      onValueChange={(itemValue) => {
        onChange(itemValue);
        setRole(itemValue);  
      }}
    >
      {roles.map(item => (
        <Picker.Item key={item.value} value={item.value} label={item.label} />
      ))}
    </Picker>
  )}
/>

            <Controller
              control={control}
              rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Palabra Reservada"
              style={LoginStyles.input}
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              
            />
            )}
            name="reservedword"
            />
            {errors.reservword?.type == "required" && (
            <Text style={{ color: "red" }}>Ingrese una palabra reservada</Text>
            )}

            <View style={LoginStyles.button_container}>
            <Button
            style={LoginStyles.button}
            textColor="black"
            onPress={handleSubmit(onSave)}
            >
            Crear cuenta
            </Button>
            <Button
            style={LoginStyles.button}
            textColor="black"
            onPress={() => navigation.navigate('Login')} 
            >
            Inicio de Sesión
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
