import React, { useContext } from 'react'
import { AuthContext } from '../auth/Auth'
import { ChatContext } from '../context/chat/ChatContex'
import { types } from '../types/types'

export const Searchbox = () => {

    const { auth, logout } = useContext( AuthContext )
    const { dispatch } = useContext( ChatContext )

    const handleLogout = () => {
        logout()
        dispatch({
            type: types.logout
        })
    }


    return (
        <>
            {/* <!-- Searchbox inicio --> */}
            <div className="headind_srch">
                <div className="recent_heading mt-2">
                    <h4>{ auth.name }</h4>
                </div>
                <div className="srch_bar">
                    <div className="stylish-input-group">
                        <button 
                            className="btn text-danger"
                            onClick={ handleLogout }
                        >
                            Salir
                        </button>
                    </div>
                </div>
            </div>
            {/* <!-- Searchbox Fin --> */}
            
        </>
    )
}
