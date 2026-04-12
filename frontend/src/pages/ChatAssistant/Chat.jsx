import { useState, useRef, useEffect } from "react";
import axios from "axios";

function Chat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const chatEndRef = useRef(null);

  // Auto scroll to bottom whenever chat updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = { type: "user", text: message };
    setChat((prev) => [...prev, userMsg]);
    setMessage(""); // Clear input immediately for better UX

    try {
      const res = await axios.post("http://localhost:5000/chat", {
        message
      });

      const aiMsg = {
        type: "ai",
        text: res.data.aiReply,
        donors: res.data.donors
      };

      setChat((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error("Chat Error:", err);
      const errorMsg = { type: "ai", text: "I'm having trouble connecting. Please try again." };
      setChat((prev) => [...prev, errorMsg]);
    }
  };

  return (
    <div style={styles.container}>
      {/* Professional Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logoBadge}>🩸</div>
          <div>
            <h1 style={styles.title}>BloodNet AI</h1>
            <div style={styles.statusIndicator}>
              <span style={styles.dot}></span> Online Assistant
            </div>
          </div>
        </div>
      </header>

      {/* Chat Area - Scrollable */}
      <div style={styles.chatBox}>
        {chat.length === 0 && (
          <div style={styles.welcomeContainer}>
            <div style={styles.welcomeIcon}>🏥</div>
            <h2 style={styles.welcomeTitle}>How can I help you today?</h2>
            <p style={styles.welcomeText}>
              I can help you find donors, check blood compatibility, or locate the nearest blood bank.
            </p>
            <div style={styles.suggestionGrid}>
              {["Need O+ blood in Mumbai", "Find B- donors nearby"].map((hint, i) => (
                <button key={i} onClick={() => setMessage(hint)} style={styles.hintButton}>
                  {hint}
                </button>
              ))}
            </div>
          </div>
        )}

        {chat.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.messageWrapper,
              justifyContent: msg.type === "user" ? "flex-end" : "flex-start"
            }}
          >
            <div
              style={{
                ...styles.message,
                backgroundColor: msg.type === "user" ? "#D32F2F" : "#FFFFFF",
                color: msg.type === "user" ? "#FFFFFF" : "#2C3E50",
                borderRadius: msg.type === "user" ? "18px 18px 2px 18px" : "18px 18px 18px 2px",
                boxShadow: msg.type === "user" ? "0 4px 12px rgba(211,47,47,0.2)" : "0 4px 12px rgba(0,0,0,0.05)"
              }}
            >
              <div style={styles.messageText}>{msg.text}</div>

              {/* Enhanced Donor Cards */}
              {msg.donors && msg.donors.length > 0 && (
                <div style={styles.donorContainer}>
                  <div style={styles.donorHeader}>Found {msg.donors.length} Verified Donors</div>
                  {msg.donors.map((d, i) => (
                    <div key={i} style={styles.donorCard}>
                      <div style={styles.donorAvatar}>{d.bloodGroup}</div>
                      <div style={styles.donorInfo}>
                        <div style={styles.donorName}>{d.name}</div>
                        <div style={styles.donorLoc}>{d.city} • Verified</div>
                      </div>
                      <button style={styles.contactBtn}>Contact</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Modern Floating Input Section */}
      <div style={styles.inputWrapper}>
        <div style={styles.inputContainer}>
          <input
            style={styles.input}
            type="text"
            placeholder="Type your emergency request..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button style={styles.sendButton} onClick={sendMessage}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
        <p style={styles.footerNote}>BloodNet AI provides real-time donor matching</p>
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
    backgroundColor: "#F8F9FB", // Professional off-white/grey
    fontFamily: "'Inter', -apple-system, sans-serif"
  },

  header: {
    background: "#FFFFFF",
    padding: "12px 24px",
    borderBottom: "1px solid #EAECEF",
    boxShadow: "0 2px 4px rgba(0,0,0,0.02)"
  },

  headerContent: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    maxWidth: "1000px",
    margin: "0 auto",
    width: "100%"
  },

  logoBadge: {
    fontSize: "24px",
    background: "#FFF5F5",
    width: "45px",
    height: "45px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "12px",
    border: "1px solid #FFE3E3"
  },

  title: {
    fontSize: "18px",
    margin: 0,
    fontWeight: "700",
    color: "#1A1C1E",
    letterSpacing: "-0.5px"
  },

  statusIndicator: {
    fontSize: "12px",
    color: "#64748B",
    display: "flex",
    alignItems: "center",
    gap: "5px"
  },

  dot: {
    width: "8px",
    height: "8px",
    backgroundColor: "#10B981",
    borderRadius: "50%",
    display: "inline-block"
  },

  chatBox: {
    flex: 1,
    overflowY: "auto",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    maxWidth: "1000px",
    margin: "0 auto",
    width: "100%"
  },

  welcomeContainer: {
    textAlign: "center",
    margin: "auto",
    maxWidth: "400px"
  },

  welcomeIcon: { fontSize: "40px", marginBottom: "10px" },
  welcomeTitle: { fontSize: "22px", color: "#1A1C1E", marginBottom: "10px" },
  welcomeText: { fontSize: "14px", color: "#64748B", lineHeight: "1.5" },

  suggestionGrid: {
    display: "flex",
    gap: "8px",
    justifyContent: "center",
    marginTop: "20px",
    flexWrap: "wrap"
  },

  hintButton: {
    padding: "8px 16px",
    borderRadius: "20px",
    border: "1px solid #E2E8F0",
    background: "#FFF",
    fontSize: "13px",
    cursor: "pointer",
    color: "#D32F2F",
    transition: "all 0.2s"
  },

  messageWrapper: { display: "flex", width: "100%" },

  message: {
    maxWidth: "75%",
    padding: "14px 18px",
    fontSize: "15px",
    lineHeight: "1.5",
    position: "relative"
  },

  messageText: { marginBottom: "4px" },

  donorContainer: {
    marginTop: "12px",
    borderTop: "1px solid rgba(0,0,0,0.05)",
    paddingTop: "10px"
  },

  donorHeader: {
    fontSize: "11px",
    textTransform: "uppercase",
    fontWeight: "700",
    marginBottom: "8px",
    color: "#94A3B8"
  },

  donorCard: {
    background: "#F1F5F9",
    borderRadius: "10px",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "8px"
  },

  donorAvatar: {
    background: "#D32F2F",
    color: "white",
    fontWeight: "bold",
    padding: "6px",
    borderRadius: "6px",
    fontSize: "12px",
    minWidth: "35px",
    textAlign: "center"
  },

  donorInfo: { flex: 1 },
  donorName: { fontSize: "14px", fontWeight: "600", color: "#1E293B" },
  donorLoc: { fontSize: "11px", color: "#64748B" },

  contactBtn: {
    background: "white",
    border: "1px solid #E2E8F0",
    padding: "5px 10px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer"
  },

  inputWrapper: {
    padding: "15px 20px 25px 20px",
    background: "#FFFFFF",
    borderTop: "2px solid #E1E4E8"
  },
  inputContainer: {
    maxWidth: "900px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#E8ECEF", // Darker gray background for the input box
    borderRadius: "12px", // Professional square-round mix
    padding: "8px 12px",
    border: "2px solid #CBD5E1", // Visible border
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
  },
  input: {
    flex: 1,
    border: "none",
    background: "transparent",
    outline: "none",
    fontSize: "16px", // Bigger font
    padding: "10px",
    color: "#0F172A", // Solid dark color for what you type
    fontWeight: "500",
    // Placeholder styling logic inside the component or via global CSS is better, 
    // but here the dark color ensures visibility.
  },

  sendButton: {
    background: "#D32F2F",
    color: "white",
    border: "none",
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "transform 0.2s"
  },

  footerNote: {
    textAlign: "center",
    fontSize: "11px",
    color: "#94A3B8",
    marginTop: "10px"
  }
};