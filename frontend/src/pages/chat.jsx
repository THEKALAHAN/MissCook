import React from "react";
import MisscookIcon from "../assets/MisscookOff.png";
import Sidebar from "../components/sidebar";
import "../styles/dashboard.css";
import { TbSend2 } from "react-icons/tb";

export function Chat() {
  return (
    <div className="dashboard-body">
      <div className="dashboard-sidebar">
        <Sidebar />
      </div>
      <div className="dashboard-content">
        <div className="dashboard-info">
          <div className="dashboard-content-icon">
            <img src={MisscookIcon} className="dashboard-icon" alt="Cooking Icon" />
          </div>
          <div className="dashboard-chat">
            <form className="chat-form">
              <input className="chat-input" type="text" placeholder="Descríbenos tus ideas" />
              <button className="chat-button" type="submit"><TbSend2/></button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
