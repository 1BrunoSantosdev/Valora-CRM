export default function DashboardLayout({ children }: any) {
  return (
    <div className="flex h-screen bg-gray-50">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r p-6 flex flex-col">
        <h1 className="text-xl font-bold text-blue-600 mb-8">
          Valora CRM
        </h1>

        <nav className="flex flex-col gap-2">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition">
            Dashboard
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition">
            Clientes
          </button>
        </nav>

        <div className="mt-auto text-sm text-gray-400">
          © Valora
        </div>
      </aside>

      {/* CONTEÚDO */}
      <div className="flex-1 flex flex-col">
        
        {/* HEADER */}
        <header className="bg-white px-6 py-4 border-b flex justify-between items-center">
          <span className="font-semibold text-gray-700">
            Dashboard
          </span>

          <button className="text-sm text-red-500 hover:underline">
            Sair
          </button>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}