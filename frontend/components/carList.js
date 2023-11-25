import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Pressable,
    ScrollView 
} from "react-native";
import axios from "axios";
import { TextInput, Avatar, Button, IconButton } from "react-native-paper";
import {list_style} from  "../assets/css/list_styles";
import { useNavigation } from '@react-navigation/native';

const url = "http://192.168.10.10:3000/api";

export default function carList(){
    const navigation = useNavigation(); 


    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
      } = useForm({
        defaultValues: {
          
          brand: "",
          dailyvalue:"",
          status:"",
          
        },
      });

      const [dataCars, setDataCars] = useState([]);
      const [message, setMessage] = useState("");
      const [isError, setIsError] = useState(false);


      const List = async () => {
        try {
            const response = await axios.get(`${url}/cars`);
    
            // Assuming the server response has a 'cars' property
            const carsData = response.data.cars;
            
            console.log(carsData)
            setDataCars(carsData);
            setIsError(false);
        } catch (error) {
            console.log("Error fetching data:", error);
            setMessage("Error fetching car data");
            setIsError(true);
        }
    };    
      useEffect(()=>{
        List()
      },[])
      
      return(
        <View style={list_style.container}>
                <View style={list_style.button_container}> 
        
              

                    <Button
                        style={list_style.button}
                        textColor="#ffffff"
                        onPress={() => navigation.navigate('RentCar')}
                    >
                        Volver
                    </Button>
                </View>


                    <ScrollView contentContainerStyle={list_style.scrollview_container}>

                        {dataCars.length > 0 ? (

                            dataCars.map((car, index) => (

                            <View key={index} style={list_style.list_container}>

                                <Text style={list_style.list_text}>Placa vehiculo: {car.plateNumber}</Text>
                                <Text style={list_style.list_text}>Marca vehiculo: {car.brand}</Text>
                                <Text style={{...list_style.list_text, color: 'green'  }}>
                                    Estado: Disponible
                                </Text>

                            </View>

                        ))

                        ) : (

                        <Text style={list_style.list_text}>No hay automóviles registrados</Text>

                        )}

                    </ScrollView>

                


        </View>


      )
}