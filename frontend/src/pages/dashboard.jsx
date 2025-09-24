import React from 'react';
import '../styles/welcome.css';
import '../styles/dashboard.css';
import MisscookIcon from '../assets/MisscookOff.png';


export function Dashboard() {

  return (
    <div >
      <div className="row">
        <nav className="col-2 min-vh-100 p-3 slidebar">
          <img src={MisscookIcon} className='dash-icon' alt="Cooking Icon" />
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <a href="#" className="nav-link text-white">
                Buscar
              </a>
            </li>
        
            <li className="nav-item mb-2">
              <a href="#" className="nav-link text-white">
                Perfil
              </a>
            </li>
          </ul>
        </nav>

        <main className="col-10 p-4 dashboard-content">
            <div>  <img src={MisscookIcon} className='dash-icon' alt="Cooking Icon" /></div>
           <div className="welcome-example">
            Por ejemplo; desayuno con huevos y tomate
        </div>
        </main>
      </div>
    </div>
  );
}