import MisscookIcon from '../assets/MisscookOff.png';
import '../styles/returnPassword.css';
import '../styles/login.css';
import React from 'react'


export function ReturnPassword() {
    return (
        <div className='login-content'>

           <div><img className='login-icon' src={MisscookIcon} alt="Misscook-icon" /></div> 
            
            <div className='return-title'>Recupera tu contraseña</div>
            <div className='login-title'>Para poder recuperar tu contraseña es necesario ingresar tu correo</div>

            <div>
                 <form  action="">
                <input  className='login-input-box' type="text" placeholder='Ingresa tu email'
                />

                <button className='login-button' type='submit' >Enviar</button>
            </form>

            </div>
            <br />
           
           <div className='login-title'>Copia el codigo de seguridad </div>
            <div>
                 <form  action="">
                <input type="number" placeholder='0000' className='return-input-box'
                />

                <button className='return-button' type='submit' >=</button>
            </form>

            </div>

        </div>
    )
}