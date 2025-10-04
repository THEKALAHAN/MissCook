import React, { useState, useRef, useEffect } from "react";
import MisscookIcon from "../assets/MisscookOff.png";
import Sidebar from "../components/sidebar";
import "../styles/dashboard.css";
import { TbSend2 } from "react-icons/tb";

export function Chat() {
  const [messages, setMessages] = useState([]); 
  const [input, setInput] = useState("");
  const chatBoxRef = useRef(null); 

  // Estado que controla si el logo debe ser pequeño/minimizado
  const isLogoMinimized = messages.length > 0; 

  // Auto-Scroll al final del chat
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    
    const currentInput = input.trim();
    if (!currentInput) return;

    // 1. Añadir mensaje de usuario y limpiar input
    setInput("");
    const userMessage = { role: "user", content: currentInput };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // 2. Llamada al Backend
    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentInput }),
      });

      const data = await res.json();

      // 3. Añadir respuesta de la IA
      const replyContent = data.reply || "Error: sin respuesta del servidor";
      const assistantMessage = { role: "assistant", content: replyContent };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);

    } catch (err) {
      console.error("Error al conectar:", err);
      // 4. Manejo de error de conexión
      const errorMessage = { role: "assistant", content: "❌ Error al conectar con el servidor. Inténtalo más tarde." };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  return (
    <div className="dashboard-body">
      {/* Barra Lateral */}
      <div className="sidebar"> 
        <Sidebar />
      </div>

      {/* Contenido Principal del Dashboard */}
      <div className="dashboard-content">
        <div className="dashboard-info">
          
          {/* Logo/Icono de Miss Cook (CLAVE: Aplicamos la clase condicional) */}
          <div className="dashboard-content-icon">
            <img
              src={MisscookIcon}
              className={`dashboard-icon ${isLogoMinimized ? 'dashboard-icon-minimized' : ''}`}
              alt="Miss Cook Icon"
            />
            {/* Mensaje de bienvenida visible solo si NO hay mensajes */}
            {!isLogoMinimized && (
              <div className="welcome-message">
                <h1>Miss Cook</h1>
                <p>¡Hola! ¿En qué puedo ayudarte hoy?</p>
              </div>
            )}
          </div>

          {/* Área del Chat */}
          <div className="dashboard-chat">
            
            {/* Historial de Mensajes con Scroll */}
            <div className="chat-box" ref={chatBoxRef}> 
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`message-bubble ${msg.role === "user" ? "message-user" : "message-ai"}`}
                >
                  {msg.content}
                </div>
              ))}
            </div>

            {/* Formulario de Entrada (Fijo en la parte inferior) */}
            <form className="chat-form" onSubmit={sendMessage}>
              <input
                className="chat-input"
                type="text"
                placeholder="Descríbenos tus ideas"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button className="chat-button" type="submit">
                <TbSend2 />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}