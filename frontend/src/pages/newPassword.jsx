import MisscookIcon from '../assets/MisscookOff.png';
import '../styles/login.css';
import React from 'react'


export function NewPassword() {
  return (
    <div className='login-content'>

        <div><img className='login-icon' src={MisscookIcon} alt="Misscook-icon" /></div> 
        <div className='login-title '>Crea una nueva contraseña</div>
        <form action="">
            <input type="password" placeholder='Ingresa tu contraseña' className='login-input-box'
            />
            <br />

            <input type="password"  placeholder='Confirma tu contraseña' className='login-input-box'
            />
            <br />
            <button className='login-button' type='submit' >Enviar</button>
        </form>

        
    </div>
  )
}