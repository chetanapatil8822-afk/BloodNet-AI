import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
  const role = localStorage.getItem("role");

  if (role === "admin") {
    navigate("/admin");
  } else if (role) {
    navigate("/donor-dashboard");
  }
}, []);

  const handleLogin = async () => {
  try {
    const res = await axios.post("http://localhost:5000/login", data);

    // ✅ Save user data
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);
    localStorage.setItem("name", res.data.name);

    // 🎯 Role-based redirect
    if (res.data.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/donor-dashboard");
    }

  } catch (err) {
    alert("Login failed");
  }
};

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back 👋</h2>

        <input
          style={styles.input}
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>

        {/* 👇 Signup option */}
        <p style={styles.text}>
          Don’t have an account?{" "}
          <span style={styles.link} onClick={() => navigate("/signup")}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    width: "300px",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#e63946",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  text: {
    marginTop: "15px",
  },
  link: {
    color: "#e63946",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Login;