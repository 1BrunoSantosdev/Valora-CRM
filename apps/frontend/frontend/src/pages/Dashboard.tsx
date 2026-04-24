import DashboardLayout from "../layouts/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Visão geral</h1>

      {/* CARDS */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow">Leads: 10</div>
        <div className="bg-white p-4 rounded shadow">Negociando: 5</div>
        <div className="bg-white p-4 rounded shadow">Fechados: 3</div>
        <div className="bg-white p-4 rounded shadow">Perdidos: 1</div>
      </div>
    </DashboardLayout>
  );
}