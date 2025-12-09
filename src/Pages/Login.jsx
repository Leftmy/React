import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loginText, setLoginText] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (login(loginText, password)) {
      navigate("/vertical");
    } else {
      setError("Невірний логін або пароль");
    }
  };

  return (
    <div className="card bg-base-100 p-6 shadow-lg flex flex-col gap-4">
      <h2 className="text-xl font-bold text-center">Вхід</h2>

      <input
        className="input input-bordered"
        placeholder="Логін"
        onChange={(e) => setLoginText(e.target.value)}
      />

      <input
        className="input input-bordered"
        placeholder="Пароль"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn btn-primary" onClick={handleLogin}>
        Увійти
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
