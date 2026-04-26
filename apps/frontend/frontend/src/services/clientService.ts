import { api } from "./api";

export async function getMetrics() {
  const res = await api.get("/clients/metrics");
  return res.data;
}

export async function getClients() {
  const res = await api.get("/clients");
  return res.data;
}

export async function createClient(data: {
  name: string;
  email?: string;
  phone?: string;
}) {
  const res = await api.post("/clients", data);
  return res.data;
}

export async function deleteClient(id: string) {
  await api.delete(`/clients/${id}`);
}

export async function updateClientStatus(id: string, status: string) {
  const res = await api.patch(`/clients/${id}/status`, { status });
  return res.data;
}