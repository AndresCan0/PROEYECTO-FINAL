
import { StyleSheet } from "react-native";

const LoginStyles = StyleSheet.create ({

    
    // ------------------- ( Contenedor de toda la página )

    container: {
        
        backgroundColor: '#f3f9fc',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
    },

     // ------------------- ( Titulo del formualario )

     title: {

       
        margin: '20px',
        padding: '5px',
        fontSize: '16px',
        fontFamily: 'Fira Code',
        fontWeight: '600',
        textAlign: 'center'
    },

    // ------------------- ( Contenedor del login )

    login_container: {
        backgroundColor: '#f3f9fc',
        margin: '10px',
        padding: '40px',
        width: '100%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: 10
    },

    // ------------------- ( Contenedor del input, estilos de los inputs y textos de los inputs )

    input_container: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '7px',
        flex: 1,
      },

    input: {
        margin: 10,
        padding: 5,
        fontFamily: 'Tahoma',
        backgroundColor: 'white',
        color:'black',
        border: '1px solid #ff6961',
        borderRadius: '5px',
        
      },

    input_text: {
      marginLeft: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'start',
      fontFamily: 'Cursive',
      fontWeight: '600',
        
    },

    // ------------------- ( Contenedor del input de contraseña y icono para ver contraseña )

    input_password: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',

      },

    input_icon: {
        top: '5px',
        marginLeft: '3px'
       
    },

    // ------------------- ( Contenedor de los botones y estilos de los botones )

    button: {
          margin: '5px',
          borderRadius: '7px',
          backgroundColor: '#ff6961', 
          justifyContent: 'center',
      },
      

      button_container: {
        width: '100%', 
        margin: '5px',
        padding: '5px',
        justifyContent: 'center',
        alignItems: 'center', 
      },
      

    

    // ------------------- ( Estilos de los mensajes de alerta )

    message: {
        margin: '10px',
        padding: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '600',
    },
    message_error: {
      color:'red',
      margin: '10px',
      padding: '5px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '600',
  },
  message_success: {
      color:'green',
      margin: '10px',
      padding: '5px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '600',
  }

    // -------------------

});

export {LoginStyles};