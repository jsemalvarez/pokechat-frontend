import { types } from "../../types/types";


export const chatReducer = ( state, action ) => {

    switch (action.type) {

        case types.usuariosCargados:
            return{
                ...state,
                usuarios: action.payload
            }
        
        case types.activarChat:

            //chatActivo es el id del usuario con el que estoy hablando
            if( state.chatActivo === action.payload) return state

            return{
                ...state,
                chatActivo: action.payload,
                mensajes: []
            } 

        case types.nuevoMensaje:

            /**
             * SI me llega un mesanje de la persona con la que estoy hablando
             * lo cargo en el arreglo de mensajes, si me llega mensajes de otro usuario
             * solo retorno el state
             * 
             * tambien cargo los mensajes que mando yo para poder mostrarlos,
             * sino solo podria mostrar los mensajes de que me habla
             */
            if( state.chatActivo === action.payload.de || state.chatActivo === action.payload.para){
                return{
                    ...state,
                    mensajes:[ ...state.mensajes, action.payload ]
                }
            }else{
                return state
            }

        case types.cargarMensajes:
            return{
                ...state,
                mensajes: action.payload
            }

        case types.logout:
            return {
                uid:'',
                chatActivo:null,
                usuarios:[], 
                mensajes:[] 
            }
    
        default:
            return state;
    }
}