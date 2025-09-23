import MisscookIcon from '../assets/MisscookOff.png';
import '../styles/login.css';
import React from 'react'


export function Login() {
  return (
    <div className='login-content'>

        <div className="login-icon">
            <img src={MisscookIcon} className='welcome-icon' alt="Cooking Icon" />
        </div>
       <div>
         <form action="">
            <input type="text" placeholder='Ingresa tu email' className='login-input-box login-title'
            />
            <br />
            <input type="password"  placeholder='Ingresa tu contraseña' className='login-input-box login-title'
            />
            <br />
            <a className='login-links' href="">¿Es tu primera vez? Registrate</a>
            <a className='login-links' href="">¿Has olvidado tu contraseña?</a>

            <br />
            <br />
            <button type='submit' className='login-button' >Iniciar sesión</button>
        </form>
       </div>
       
    </div>
  )
}
