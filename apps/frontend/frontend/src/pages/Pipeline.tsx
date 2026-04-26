import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import {
  getClients,
  updateClientStatus,
  createClient,
} from "../services/clientService";

import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

export default function Pipeline() {
  const navigate = useNavigate();
  const [clients, setClients] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    else loadClients();
  }, []);

  async function loadClients() {
    const data = await getClients();
    setClients(data);
  }

  async function handleCreate() {
    if (!name) {
      toast.error("Nome obrigatório");
      return;
    }

    await createClient({ name, email: email || undefined });

    toast.success("Cliente criado");

    setName("");
    setEmail("");
    setOpen(false);
    loadClients();
  }

  async function onDragEnd(result: any) {
    if (!result.destination) return;

    await updateClientStatus(
      result.draggableId,
      result.destination.droppableId
    );

    loadClients();
  }

  function getClientsByStatus(status: string) {
    return clients.filter((c) => (c.status || "lead") === status);
  }

  const columns = [
    { title: "Leads", status: "lead" },
    { title: "Negociando", status: "negociando" },
    { title: "Fechados", status: "fechado" },
    { title: "Perdidos", status: "perdido" },
  ];

  return (
    <MainLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-valora-accent">
            Pipeline
          </h2>
          <p className="text-sm text-valora-muted mt-1">
            Gerencie seu funil de vendas
          </p>
        </div>

        {/* BOTÃO */}
        <div className="flex justify-end mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            className="bg-valora-primary text-white px-4 py-2 rounded-lg text-sm"
          >
            + Novo Cliente
          </motion.button>
        </div>

        {/* PIPELINE */}
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-6 overflow-x-auto">

            {columns.map((col) => (
              <Droppable droppableId={col.status} key={col.status}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-[#141414] border border-valora-border p-4 rounded-2xl w-72 min-h-[400px]"
                  >

                    <div className="flex justify-between mb-4">
                      <h3>{col.title}</h3>
                      <span className="text-xs text-valora-muted">
                        {getClientsByStatus(col.status).length}
                      </span>
                    </div>

                   {getClientsByStatus(col.status).map((client, index) => (
                        <Draggable key={client.id} draggableId={client.id} index={index}>
                             {(provided) => (
                                <motion.div
                                 ref={provided.innerRef}
                                 {...(provided.draggableProps as any)}
                                 {...(provided.dragHandleProps as any)}
                                whileHover={{ scale: 1.03 }}
                                className="bg-valora-card border border-valora-border p-4 rounded-xl mb-3 cursor-pointer"
                              >
                            <p className="font-medium">{client.name}</p>
                            <p className="text-xs text-valora-muted">
                              {client.email || "Sem email"}
                            </p>
                          </motion.div>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}

          </div>
        </DragDropContext>

        {/* MODAL */}
        {open && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-valora-card border border-valora-border p-6 rounded-xl w-96"
            >

              <h2 className="mb-4 text-valora-accent">
                Novo Cliente
              </h2>

              <input
                placeholder="Nome"
                className="w-full mb-2 p-2 bg-black border border-valora-border rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                placeholder="Email"
                className="w-full mb-4 p-2 bg-black border border-valora-border rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="flex justify-end gap-2">
                <button onClick={() => setOpen(false)}>
                  Cancelar
                </button>

                <button
                  onClick={handleCreate}
                  className="bg-valora-primary text-white px-4 py-2 rounded"
                >
                  Criar
                </button>
              </div>

            </motion.div>
          </div>
        )}

      </motion.div>
    </MainLayout>
  );
}