import { useEffect, useState } from "react";
import api from "../api";


export default function ClientesPage() {
const [clientes, setClientes] = useState([]);
const [form, setForm] = useState({ nombre: "", telefono: "", direccion: "", precioFardo: 0, precioBotellon: 0 });


async function cargar() {
const r = await api.get("/clientes");
setClientes(r.data);
}


async function agregar(e) {
e.preventDefault();
await api.post("/clientes", form);
setForm({ nombre: "", telefono: "", direccion: "", precioFardo: 0, precioBotellon: 0 });
cargar();
}


async function eliminar(id) {
await api.delete(`/clientes/${id}`);
cargar();
}


useEffect(() => {
cargar();
}, []);


return (
<div>
<h1>Clientes</h1>
<form onSubmit={agregar}>
<input placeholder="Nombre" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} />
<input placeholder="Teléfono" value={form.telefono} onChange={e => setForm({ ...form, telefono: e.target.value })} />
<input placeholder="Dirección" value={form.direccion} onChange={e => setForm({ ...form, direccion: e.target.value })} />
<input placeholder="Precio Fardo" type="number" value={form.precioFardo} onChange={e => setForm({ ...form, precioFardo: e.target.value })} />
<input placeholder="Precio Botellón" type="number" value={form.precioBotellon} onChange={e => setForm({ ...form, precioBotellon: e.target.value })} />
<button>Agregar</button>
</form>


{clientes.map(c => (
<div key={c.id}>
{c.nombre} — Lps {c.precioFardo} / {c.precioBotellon}
<button onClick={() => eliminar(c.id)}>X</button>
</div>
))}
</div>
);
}