import MisscookIcon from '../assets/MisscookOff.png';
import '../styles/login.css';
import React from 'react'
import { Link } from "react-router-dom";
import { TbSend2 } from "react-icons/tb";

export function Register() {
  return (
    <div className='login-body'>
      <div className="return-botton">
        <Link to="/login">
            <TbSend2 size="2rem" className="return-icon" />
        </Link>
      </div>
      <div className='login-content'>
        <div> <img className='login-icon' src={MisscookIcon} alt="Misscook-icon" /></div>
        <div className='login-title '>REGISTRATE</div> 
        <div>
          <form action="">
                <input type="text"  placeholder='Ingresa tu nombre' className='login-input-box'
              />
              <br />
              <input type="text" placeholder='Ingresa tu email' className='login-input-box'
              />
              <br />

              <input type="password"  placeholder='Ingresa tu contraseña' className='login-input-box'
              />
              <br />
              <input type="password"  placeholder='Confirma tu contraseña' className='login-input-box'
              />
              <br />

              <button className='login-button' type='submit' >Registrar</button>
          </form>
          </div> 
      </div>
    </div>
  )
}
