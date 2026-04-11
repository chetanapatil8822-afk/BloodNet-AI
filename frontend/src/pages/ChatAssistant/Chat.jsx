import { useState } from "react";
import axios from "axios";

function Chat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = { type: "user", text: message };
    setChat((prev) => [...prev, userMsg]);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        message
      });

      const aiMsg = {
        type: "ai",
        text: res.data.aiReply,
        donors: res.data.donors
      };

      setChat((prev) => [...prev, aiMsg]);
      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.container}>
      
      {/* Header */}
      <div style={styles.header}>
        🩸 Blood Help Assistant
      </div>

      {/* Chat Box */}
      <div style={styles.chatBox}>
        {chat.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: msg.type === "user" ? "flex-end" : "flex-start",
              background:
                msg.type === "user" ? "#2563eb" : "#e5e7eb",
              color: msg.type === "user" ? "#fff" : "#000"
            }}
          >
            <div>{msg.text}</div>

            {/* Donors */}
            {msg.donors && msg.donors.length > 0 && (
              <div style={styles.donorBox}>
                <b>Available Donors:</b>
                {msg.donors.map((d, i) => (
                  <div key={i} style={styles.donorItem}>
                    {d.name} • {d.bloodGroup} • {d.city}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={styles.inputBox}>
        <input
          style={styles.input}
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button style={styles.button} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    background: "#f9fafb",
    fontFamily: "Arial"
  },

  header: {
    padding: "15px",
    fontSize: "20px",
    fontWeight: "bold",
    background: "#111827",
    color: "#fff",
    textAlign: "center"
  },

  chatBox: {
    flex: 1,
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    overflowY: "auto"
  },

  message: {
    maxWidth: "60%",
    padding: "12px",
    borderRadius: "12px"
  },

  donorBox: {
    marginTop: "10px",
    fontSize: "14px"
  },

  donorItem: {
    padding: "5px 0"
  },

  inputBox: {
    display: "flex",
    padding: "10px",
    borderTop: "1px solid #ddd",
    background: "#fff"
  },

  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none"
  },

  button: {
    marginLeft: "10px",
    padding: "10px 15px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  }
};