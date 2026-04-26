import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { motion, AnimatePresence } from "framer-motion";
import { getClients } from "../services/clientService";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

type Metrics = {
  total: number;
  fechados: number;
  conversao: number;
};

export default function Dashboard() {
  const navigate = useNavigate();

  const [pipelineData, setPipelineData] = useState<any[]>([]);
  const [growthData, setGrowthData] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<Metrics>({
    total: 0,
    fechados: 0,
    conversao: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    loadData();


    const interval = setInterval(() => {
      loadData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  async function loadData() {
    try {
      const clients = await getClients();

      const counts: any = {
        lead: 0,
        negociando: 0,
        fechado: 0,
        perdido: 0,
      };

      clients.forEach((c: any) => {
        const status = c.status || "lead";
        counts[status]++;
      });

      setPipelineData([
        { name: "Leads", value: counts.lead },
        { name: "Negociando", value: counts.negociando },
        { name: "Fechados", value: counts.fechado },
        { name: "Perdidos", value: counts.perdido },
      ]);

      const total = clients.length;
      const fechados = counts.fechado;
      const conversao = total
        ? Number(((fechados / total) * 100).toFixed(1))
        : 0;

      setMetrics({ total, fechados, conversao });

      const now = new Date().toLocaleTimeString();

      setGrowthData((prev) => {
        const updated = [
            ...prev,
       {
          name: now,
          value: fechados,
      },
        ];

        return updated.slice(-8); 
        });

      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) {
    return (
      <MainLayout>
        <div className="animate-pulse space-y-6">

          <div className="h-6 bg-valora-card rounded w-1/3"></div>

          <div className="grid grid-cols-3 gap-6">
            <div className="h-24 bg-valora-card rounded"></div>
            <div className="h-24 bg-valora-card rounded"></div>
            <div className="h-24 bg-valora-card rounded"></div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="h-[350px] bg-valora-card rounded"></div>
            <div className="h-[350px] bg-valora-card rounded"></div>
          </div>

        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >

        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-valora-accent">
            Dashboard
          </h2>
          <p className="text-sm text-valora-muted">
            Visão geral do desempenho do CRM
          </p>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-3 gap-6 mb-6">

          <KpiCard title="Total" value={metrics.total} />

          <KpiCard
            title="Fechados"
            value={metrics.fechados}
            highlight="text-green-400"
          />

          <KpiCard
            title="Conversão"
            value={`${metrics.conversao}%`}
            highlight="text-valora-accent"
          />

        </div>

        {/* GRÁFICOS */}
        <div className="grid grid-cols-2 gap-6">

          {/* PIPELINE */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-valora-card border border-valora-border p-6 rounded-xl h-[350px]"
          >
            <h3 className="mb-4 text-sm">Pipeline</h3>

            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipelineData}>
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Bar
                  dataKey="value"
                  fill="#7A1C1C"
                  radius={[6, 6, 0, 0]}
                  animationDuration={800}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* CRESCIMENTO */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-valora-card border border-valora-border p-6 rounded-xl h-[350px]"
          >
            <h3 className="mb-4 text-sm">Crescimento</h3>

            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData}>
                <CartesianGrid stroke="#222" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#C9A75D"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

        </div>

      </motion.div>
    </MainLayout>
  );
}

/* ============================
        KPI COMPONENT
============================ */
function KpiCard({
  title,
  value,
  highlight,
}: {
  title: string;
  value: any;
  highlight?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-valora-card border border-valora-border p-6 rounded-xl"
    >
      <p className="text-sm text-valora-muted">{title}</p>

      <AnimatePresence mode="wait">
        <motion.h3
          key={value}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className={`text-2xl font-semibold ${highlight || ""}`}
        >
          {value}
        </motion.h3>
      </AnimatePresence>
    </motion.div>
  );
}