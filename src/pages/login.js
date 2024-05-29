import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./login.module.css";

function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Load email and keepLoggedIn state from local storage on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedKeepLoggedIn = localStorage.getItem("keepLoggedIn");

    if (savedEmail) {
      setEmail(savedEmail);
    }

    if (savedKeepLoggedIn) {
      setKeepLoggedIn(savedKeepLoggedIn === "true");
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://159.89.203.190:8001/auth/logIn",
        { email, password }
      );

      console.log(response.data);

      const data = await response.data;

      if (response.status == 200 || response.status == 204) {
        localStorage.setItem("token", data.token);
        console.log("fuck");

        // Save email and keepLoggedIn state to local storage if "Remember Me" is checked
        if (keepLoggedIn) {
          localStorage.setItem("email", email);
          localStorage.setItem("keepLoggedIn", keepLoggedIn);
        } else {
          localStorage.removeItem("email");
          localStorage.removeItem("keepLoggedIn");
        }

        location.href = "/";
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleForgotPassword = () => {
    console.log("Forgot password clicked");
  };

  return (
    <div className="container">
      <div className="box">
        <h1 style={{ color: "#2B3674", marginBottom: "10px" }}>Нэвтрэх</h1>
        <p style={{ marginBottom: "50px", color: "#A3AED0" }}>
          Та и-мейл болон нууц үгийг оруулан нэвтрэнэ үү!
        </p>
        <form onSubmit={handleSubmit}>
          <p style={{ color: "#4318FF" }}>И-Мейл хаяг*</p>
          <input
            type="text"
            placeholder="Abcd1234@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              marginBottom: "30px",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #E0E2E7",
              width: "25%",
            }}
          />
          <label label style={{ position: "relative" }}>
            <p style={{ color: "#4318FF" }}>Нууц үг*</p>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Min. 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                marginBottom: "5px",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #E0E2E7",
                width: "25%",
              }}
            />
            <div className="password-toggle" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </label>
          <div className="forgot-password">
            <button
              type="button"
              onClick={handleForgotPassword}
              style={{
                color: "#4318FF",
                background: "none",
                border: "none",
                cursor: "pointer",
                marginBottom: "30px",
              }}
            >
              Нууц үгээ мартсан уу?
            </button>
          </div>
          <label label style={{ position: "relative" }}>
            <input
              style={{
                marginBottom: "30px",
                color: "#2B3674",
                padding: "8px 20px",
              }}
              type="checkbox"
              checked={keepLoggedIn}
              onChange={(e) => setKeepLoggedIn(e.target.checked)}
            />
            Намайг сана
          </label>
          <button
            type="submit"
            style={{
              padding: "8px 20px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: "#2B3674",
              color: "#fff",
              display: "block",
              margin: "10px",
            }}
          >
            Нэвтрэх
          </button>
        </form>
      </div>
      <div className="secondbox">
        <label>
          <img src={"/image/us.svg"} width={100} height={100} />
        </label>
        <label>
          <p
            style={{
              textAlign: "center",
              color: "#B3B7FA",
              fontSize: "32px",
              margin: "130px",
            }}
          >
            BILLING SYSTEM
          </p>
        </label>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: space-between;
          margin: 30px;
        }
        .box {
          padding: 80px;
          border-radius: 8px;
          width: 48%;
        }
        .secondbox {
          padding: 40px;
          border-radius: 100px;
          width: 40%;
          background: linear-gradient(180deg, #868cff 0%, #4318ff 100%);
        }
        .container .box:first-child {
          margin-right: 20px;
        }
        .password-toggle {
          position: absolute;
          right: 10px;
          top: 96%;
          color: #a3aed0;
          transform: translateY(-50%);
          cursor: pointer;
        }
        .forgot-password {
          text-align: left;
          margin-bottom: 0;
        }
      `}</style>
    </div>
  );
}

export default LoginForm;
