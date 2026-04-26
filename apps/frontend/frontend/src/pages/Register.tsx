import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: any) {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Preencha todos os campos");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:3000/auth/register", {
        name,
        email,
        password,
      });

      toast.success("Conta criada com sucesso 🚀");

      navigate("/login");
    } catch (err: any) {
      toast.error("Erro ao cadastrar");
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
          Criar Conta
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            placeholder="Nome"
            className="w-full p-3 bg-black border border-valora-border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            disabled={loading}
            className="w-full bg-valora-primary text-white py-3 rounded-lg"
          >
            {loading ? "Criando..." : "Criar conta"}
          </motion.button>

        </form>

        {/* LINK LOGIN */}
        <p className="text-sm text-valora-muted mt-4 text-center">
          Já tem conta?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-valora-accent cursor-pointer"
          >
            Entrar
          </span>
        </p>

      </motion.div>
    </div>
  );
}