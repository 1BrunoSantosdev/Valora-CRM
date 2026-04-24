export default function DashboardLayout({ children }: any) {
  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h1 className="text-xl font-bold mb-6">Valora CRM</h1>

        <nav className="flex flex-col gap-2">
          <button className="text-left p-2 hover:bg-gray-100 rounded">
            Dashboard
          </button>
          <button className="text-left p-2 hover:bg-gray-100 rounded">
            Clientes
          </button>
        </nav>
      </aside>

      {/* CONTEÚDO */}
      <div className="flex-1 flex flex-col">
        
        {/* HEADER */}
        <header className="bg-white p-4 shadow flex justify-between">
          <span className="font-medium">Dashboard</span>
          <button className="text-sm">Sair</button>
        </header>

        {/* PAGE */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}