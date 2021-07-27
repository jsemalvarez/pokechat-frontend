import React, { useContext, useState } from 'react'
import { AuthContext } from '../auth/Auth'
import { SocketContext } from '../context/SocketContext'
import { ChatContext } from '../context/chat/ChatContex'

export const SendMessage = () => {

    const [mensaje, setMensaje] = useState('')
    const { socket } = useContext( SocketContext )
    const { auth } = useContext( AuthContext )
    const { chatState } = useContext( ChatContext )

    const onChange = ( { target } ) => {
        setMensaje( target.value )
    }

    const onSubmit = ( e ) => {
        e.preventDefault()

        if( mensaje.length === 0 ){ return }

        setMensaje('')

        //TODO: emitir un eventode sockets para enviar el mensaje
        socket.emit('mensaje-personal',{
            de: auth.uid,
            para: chatState.chatActivo,
            mensaje
        })

        //TODO: hacer el dispatch del mensaje
    }

    return (
        <form onSubmit={ onSubmit }>
            
            {/* <!-- Enviar mensaje Inicio --> */}
            <div className="type_msg row">
                <div className="input_msg_write col-sm-9">
                    <input 
                        type="text" 
                        className="write_msg" 
                        placeholder="Mensaje..." 
                        value={ mensaje }
                        onChange={ onChange }
                    />
                </div>
                <div className="col-sm-3 text-center">
                    <button className="msg_send_btn mt-3" type="submit">
                        enviar
                    </button>
                </div>
            </div>
            {/* <!-- Enviar mensaje Fin --> */}
        </form>
    )
}
