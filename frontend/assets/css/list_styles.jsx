
import { StyleSheet } from "react-native";

const list_style = StyleSheet.create ({

    // ------------------- ( Contenedor de toda la página )

    container: {
        backgroundColor: '#f3f9fc',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    // ------------------- ( Contenedor del botón y estilo del botón )

    button_container: {
        width: '240px',
        margin: '5px',
        marginTop: '25px',
        padding: '5px',
    },

    button: {
        margin: '5px',
        borderRadius: '7px',
        backgroundColor: '#ff6961',
    },

    // -------------------  ( Contenedor del scrollview 'cuando se registran muchos automoviles' )

    scrollview_container: {
        width: '250px',
        height: 'auto',
        margin: '5px',
        marginTop: '5px',
        marginBottom: '10px',
        padding: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '5px',
    },

    // ------------------- ( Contenedor de cada dato de los registros )

    list_container: {
        width: '200px',
        margin: '5px',
        padding: '5px',
        alignItems: 'start',
        justifyContent: 'center',
        border: '2px solid #ff6961',
    },

    // ------------------- ( Estilos de los textos de los registros )

    list_text: {
        margin: '5px',
        fontFamily: 'Cursive',
    },

    // -------------------

});

export {list_style};
