import React, { useContext, useEffect } from 'react';
import { createContext } from 'react';
import { useSocket } from '../hooks/useSocket'
import { AuthContext } from '../auth/Auth'
import { ChatContext } from './chat/ChatContex';
import { types } from '../types/types';
import { scrollToBottomAnimated } from '../helpers/scrollToBottom';

const baseURL =  process.env.REACT_APP_API_URL

export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {

    const { socket, online, conectarSocket, desconectarSocket } = useSocket( baseURL );
    const { auth } = useContext( AuthContext )
    const { dispatch } = useContext( ChatContext )

    useEffect( () => {
        if( auth.logged ){
            conectarSocket()
        }
    }, [ auth, conectarSocket ])

    useEffect( () => {
        if( !auth.logged ){
            desconectarSocket()
        }
    }, [ auth, desconectarSocket ])

    // Escuchar los cambios en los usuarios conectdos
    useEffect( () => {
      
        socket?.on('lista-usuarios', (usuarios) => {
            dispatch({
                type: types.usuariosCargados,
                payload: usuarios
            })
        })
    }, [socket, dispatch])


    // Escuchamos los mensajes personales de la sala  
    useEffect( () => {
      
        socket?.on('mensaje-personal', (mensaje) => {
            dispatch({
                type: types.nuevoMensaje,
                payload: mensaje
            })
            scrollToBottomAnimated('mensajes')
        })

    }, [socket, dispatch])
    
    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}