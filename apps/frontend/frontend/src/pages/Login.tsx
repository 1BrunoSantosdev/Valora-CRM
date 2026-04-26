import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: any) {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Preencha todos os campos");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      toast.success("Login realizado");
      navigate("/");
    } catch (err) {
      toast.error("Credenciais inválidas");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-valora-bg">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-valora-card border border-valora-border p-8 rounded-xl w-96"
      >

        <h2 className="text-2xl text-valora-accent mb-6 text-center">
          Valora CRM
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-black border border-valora-border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            className="w-full p-3 bg-black border border-valora-border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full bg-valora-primary text-white py-3 rounded-lg"
          >
            {loading ? "Entrando..." : "Entrar"}
          </motion.button>

        </form>
        <p className="text-sm text-valora-muted mt-4 text-center">
            Não tem conta?{" "}
        <span onClick={() => navigate("/register")}
      className="text-valora-accent cursor-pointer"
        >
             Criar conta
        </span>
    </p>
      </motion.div>
    </div>
  );
}