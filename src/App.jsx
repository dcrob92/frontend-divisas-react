import { useEffect, useState, useCallback } from "react";
import { getDivisas, createDivisa, deleteDivisa } from "./services/divisaService";

function App() {
  const [divisas, setDivisas] = useState([]);

  const [form, setForm] = useState({
    name: "",
    code: "",
    exchangeRate: ""
  });

  const cargarDivisas = useCallback(async () => {
    const data = await getDivisas();
    console.log("DIVISAS BACKEND:", data);
    setDivisas(data);
  }, []);

  useEffect(() => {
    cargarDivisas();
  }, [cargarDivisas]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createDivisa(form);
    setForm({ name: "", code: "", exchangeRate: "" });
    cargarDivisas();
  };

  const handleDelete = async (id) => {
    await deleteDivisa(id);
    cargarDivisas();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>💱 Divisas</h1>

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="code"
          placeholder="Código"
          value={form.code}
          onChange={handleChange}
        />
        <input
          name="exchangeRate"
          placeholder="Valor"
          value={form.exchangeRate}
          onChange={handleChange}
        />
        <button type="submit">Crear</button>
      </form>

      <hr />

      {/* LISTA */}
      <ul>
        {divisas.map((d) => (
          <li key={d.id}>
            {d.name} - {d.code} - {d.exchangeRate}
            <button onClick={() => handleDelete(d.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;