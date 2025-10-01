import React, { useState } from "react";
import MisscookIcon from "../assets/MisscookOff.png";
import Sidebar from "../components/sidebar";
import "../styles/dashboard.css";
import { TbSend2 } from "react-icons/tb";

export function Chat() {
  const [messages, setMessages] = useState([]); // historial de mensajes
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault(); // evita refrescar la página
    
    const currentInput = input.trim();
    if (!currentInput) return;

    // 1. Limpia el input en la UI inmediatamente.
    setInput("");

    // 2. Agrega el mensaje del usuario al historial de chat.
    //    Se usa la forma funcional para garantizar que se usa el estado más reciente.
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: currentInput },
    ]);

    try {
      // 3. Llama al backend con el mensaje que guardamos en 'currentInput'.
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentInput }),
      });

      const data = await res.json();

      // 4. Agrega la respuesta del asistente al historial.
      //    También se usa la forma funcional para seguridad.
      const assistantMessage = { role: "assistant", content: data.reply || "Error: sin respuesta" };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);

    } catch (err) {
      console.error("Error al conectar:", err);
      // 5. Agrega un mensaje de error si la llamada falla.
      const errorMessage = { role: "assistant", content: "❌ Error al conectar con el servidor" };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  return (
    <div className="dashboard-body">
      <div className="dashboard-sidebar">
        <Sidebar />
      </div>

      <div className="dashboard-content">
        <div className="dashboard-info">
          <div className="dashboard-content-icon">
            <img
              src={MisscookIcon}
              className="dashboard-icon"
              alt="Cooking Icon"
            />
          </div>

          {/* Caja de chat */}
          <div className="dashboard-chat">
            <div className="chat-box">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`message ${msg.role === "user" ? "user" : "assistant"}`}
                >
                  {msg.content}
                </div>
              ))}
            </div>

            {/* Formulario */}
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