import { useNavigate, useLocation } from "react-router-dom";

export default function MainLayout({ children }: any) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="flex min-h-screen bg-valora-bg text-valora-text">

      <aside className="w-64 bg-valora-card border-r border-valora-border px-6 py-8 flex flex-col">

        <div className="mb-10 flex justify-center">
            <h1 className="text-2xl font-bold text-valora-primary">
              Valora CRM
            </h1>
        </div>

        <nav className="flex flex-col gap-3 text-sm">

          <button
            onClick={() => navigate("/")}
            className={isActive("/") ? "text-valora-accent" : "text-valora-muted"}
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/clients")}
            className={isActive("/clients") ? "text-valora-accent" : "text-valora-muted"}
          >
            Clientes
          </button>

          <button
            onClick={() => navigate("/pipeline")}
            className={isActive("/pipeline") ? "text-valora-accent" : "text-valora-muted"}
          >
            Pipeline
          </button>
          <div className="mt-auto pt-6 border-t border-valora-border">

            <button onClick={handleLogout}
            className="text-red-400 hover:text-red-600 text-sm"
        >
             Sair
            </button>

            </div>

        </nav>

      </aside>

      <main className="flex-1 px-10 py-8 max-w-[1400px] mx-auto w-full">
        {children}
      </main>

    </div>
  );
}