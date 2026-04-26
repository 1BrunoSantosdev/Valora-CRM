import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { motion } from "framer-motion";

import {
  getClients,
  deleteClient,
} from "../services/clientService";

export default function Clients() {
  const navigate = useNavigate();
  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) navigate("/login");
    else loadClients();
  }, []);

  async function loadClients() {
    const data = await getClients();
    setClients(data);
  }

  async function handleDelete(id: string) {
    if (!confirm("Deseja excluir?")) return;

    await deleteClient(id);
    loadClients();
  }

  function getStatusStyle(status: string) {
    switch (status) {
      case "lead":
        return "bg-gray-700 text-gray-300";
      case "negociando":
        return "bg-yellow-900 text-yellow-400";
      case "fechado":
        return "bg-green-900 text-green-400";
      case "perdido":
        return "bg-red-900 text-red-400";
      default:
        return "bg-gray-700 text-gray-300";
    }
  }

  return (
    <MainLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-valora-accent">
            Clientes
          </h2>
          <p className="text-sm text-valora-muted">
            Gerencie seus clientes
          </p>
        </div>

        {/* TABELA */}
        <div className="bg-valora-card border border-valora-border rounded-xl overflow-hidden">

          <table className="w-full text-sm">

            <thead className="border-b border-valora-border text-valora-muted">
              <tr>
                <th className="p-4">Nome</th>
                <th className="p-4">Email</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>

            <tbody>
              {clients.map((client) => (
                <tr
                  key={client.id}
                  className="border-b border-valora-border hover:bg-[#141414] transition"
                >
                  <td className="p-4">{client.name}</td>

                  <td className="p-4 text-valora-muted">
                    {client.email || "—"}
                  </td>

                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusStyle(client.status)}`}>
                      {client.status || "lead"}
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(client.id)}
                      className="text-red-400 hover:text-red-600"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}

              {clients.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-valora-muted">
                    Nenhum cliente encontrado
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

      </motion.div>
    </MainLayout>
  );
}