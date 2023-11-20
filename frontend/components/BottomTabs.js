import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AdminScreen from "./AdminScreen";
import Car from "./Car";
import Login from "./Login";
import returnCar from "./returnCar"
import {MaterialIcons} from "@expo/vector-icons"

const Tab = createBottomTabNavigator();

export default function BottonTabs(){
    return(
        <Tab.Navigator
        initialRouteName='Login'
        screenOptions={{headerShown:false,
        tabBarActiveTintColor:"#ff6961",
        tabBarInactiveTintColor:"",
        tabBarActiveBackgroundColor:"gray"
        }}>
           
            <Tab.Screen name="Login" component={Login} options={{
                title:"Cerrar Sesion",
                tabBarStyle:{display:"none"}
            }}/>
            
            <Tab.Screen name="returnCar" component={returnCar} options={{
                title:"Devolver Auto"
            }}/>

            <Tab.Screen name="Car" component={Car} options={{
                title:"Carros"
            }}/>
            <Tab.Screen name="AdminScreen" component={AdminScreen} options={{
                title:"Vista de Admin",
                tabBarIcon:()=>(<MaterialIcons name="AdminScreen" size={40} color="pink"/>)
            }}/>

        </Tab.Navigator>
    )
}