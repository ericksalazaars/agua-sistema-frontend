import { useEffect, useState } from "react";
import api from "../api";

export default function VisitasPage() {
  const [clientes, setClientes] = useState([]);
  const [visitas, setVisitas] = useState([]);
  const [form, setForm] = useState({ clienteId: "", fardos: 0, botellones: 0, nota: "" });
  const [totalDia, setTotalDia] = useState(0);

  async function cargar() {
    const rClientes = await api.get("/clientes");
    setClientes(rClientes.data);

    const rVisitas = await api.get("/visitas");
    setVisitas(rVisitas.data.visitas);
    setTotalDia(rVisitas.data.totalDia);
  }

  async function agregar(e) {
    e.preventDefault();
    await api.post("/visitas", form);
    setForm({ clienteId: "", fardos: 0, botellones: 0, nota: "" });
    cargar();
  }

  async function eliminar(id) {
    await api.delete(`/visitas/${id}`);
    cargar();
  }

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div>
      <h1>Visitas (Total día: Lps {totalDia})</h1>
      <form onSubmit={agregar}>
        <select value={form.clienteId} onChange={e => setForm({ ...form, clienteId: e.target.value })}>
          <option value="">Seleccione cliente</option>
          {clientes.map(c => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>

        <input placeholder="Fardos" type="number" value={form.fardos} onChange={e => setForm({ ...form, fardos: e.target.value })} />
        <input placeholder="Botellones" type="number" value={form.botellones} onChange={e => setForm({ ...form, botellones: e.target.value })} />
        <input placeholder="Nota" value={form.nota} onChange={e => setForm({ ...form, nota: e.target.value })} />
        <button>Agregar visita</button>
      </form>

      {visitas.map(v => (
        <div key={v.id}>
          Cliente #{v.clienteId} — Subtotal: {v.subtotal}
          <button onClick={() => eliminar(v.id)}>X</button>
        </div>
      ))}
    </div>
  );
}