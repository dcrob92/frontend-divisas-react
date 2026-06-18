import { useEffect, useState, useCallback } from "react";
import {
  getDivisas,
  createDivisa,
  deleteDivisa,
} from "./services/divisaService";

import "./styles.css";

function App() {
  const [editing, setEditing] = useState(null);
  const [divisas, setDivisas] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    name: "",
    code: "",
    exchangeRate: "",
  });

  const cargarDivisas = useCallback(async () => {
    const data = await getDivisas();
    setDivisas(data);
  }, []);

  useEffect(() => {
    cargarDivisas();
  }, [cargarDivisas]);

  const filteredDivisas = divisas.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.code.toLowerCase().includes(search.toLowerCase()),
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.name || !form.code || !form.exchangeRate) {
      showError("Todos los campos son obligatorios");
      return false;
    }

    if (isNaN(form.exchangeRate)) {
      showError("El valor debe ser numérico");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (editing) {
        await fetch(`http://localhost:8080/api/currencies/${editing}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        showMessage("Divisa actualizada correctamente");
        setEditing(null);
      } else {
        await createDivisa(form);
        showMessage("Divisa creada correctamente");
      }

      setForm({ name: "", code: "", exchangeRate: "" });
      cargarDivisas();
    } catch (err) {
      showError("Error al guardar la divisa");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDivisa(id);
      showMessage("Divisa eliminada correctamente");
      cargarDivisas();
    } catch (err) {
      showError("Error al eliminar la divisa");
    }
  };

  const handleEdit = (divisa) => {
    setForm(divisa);
    setEditing(divisa.id);
  };

  const handleCancel = () => {
    setEditing(null);
    setForm({ name: "", code: "", exchangeRate: "" });
  };

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(null), 3000);
  };

  const showError = (text) => {
    setError(text);
    setTimeout(() => setError(null), 3000);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>💱 Divisas</h1>

        <input
          className="search"
          placeholder="Buscar divisa..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {message && <div className="success">{message}</div>}
      {error && <div className="error">{error}</div>}

      <form className="form" onSubmit={handleSubmit}>
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

        <button>{editing ? "Actualizar" : "Crear"}</button>
        {editing && (
          <button type="button" onClick={handleCancel} className="cancel">
            Cancelar
          </button>
        )}
      </form>

      <div className="grid">
        {filteredDivisas.map((d) => (
          <div key={d.id} className="card">
            <h3>{d.name}</h3>
            <p>{d.code}</p>
            <p>{d.exchangeRate}</p>

            <div className="actions">
              <button className="edit" onClick={() => handleEdit(d)}>
                Editar
              </button>

              <button className="delete" onClick={() => handleDelete(d.id)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
