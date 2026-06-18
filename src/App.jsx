import { useEffect, useState, useCallback } from "react";
import { getDivisas, createDivisa, deleteDivisa } from "./services/divisaService";

function App() {
  const [editing, setEditing] = useState(null);
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

  if (editing) {
    await fetch(`http://localhost:8080/api/currencies/${editing}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    setEditing(null);
  } else {
    await createDivisa(form);
  }

  setForm({ name: "", code: "", exchangeRate: "" });
  cargarDivisas();
};

  const handleDelete = async (id) => {
    await deleteDivisa(id);
    cargarDivisas();
  };

  const handleEdit = (divisa) => {
  setForm(divisa);
  setEditing(divisa.id);
};

return (
  <div style={styles.container}>
    <h1 style={styles.title}>💱 Gestión de Divisas</h1>

    {/* FORM */}
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        name="name"
        placeholder="Nombre"
        value={form.name}
        onChange={handleChange}
        style={styles.input}
      />
      <input
        name="code"
        placeholder="Código"
        value={form.code}
        onChange={handleChange}
        style={styles.input}
      />
      <input
        name="exchangeRate"
        placeholder="Valor"
        value={form.exchangeRate}
        onChange={handleChange}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        Crear
      </button>
    </form>

    {/* LISTA */}
    <div style={styles.grid}>
      {divisas.map((d) => (
        <div key={d.id} style={styles.card}>
          <h3>{d.name}</h3>
          <p><b>Código:</b> {d.code}</p>
          <p><b>Valor:</b> {d.exchangeRate}</p>

          <div style={styles.actions}>
            <button
              onClick={() => handleEdit(d)}
              style={styles.editBtn}
            >
              Editar
            </button>

            <button
              onClick={() => handleDelete(d.id)}
              style={styles.deleteBtn}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial",
    background: "#f4f6f8",
    minHeight: "100vh"
  },
  title: {
    textAlign: "center"
  },
  form: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    marginBottom: "20px"
  },
  input: {
    padding: "8px"
  },
  button: {
    padding: "8px 12px",
    background: "#2ecc71",
    color: "white",
    border: "none",
    cursor: "pointer"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px"
  },
  card: {
    background: "white",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px"
  },
  editBtn: {
    background: "#3498db",
    color: "white",
    border: "none",
    padding: "5px"
  },
  deleteBtn: {
    background: "#e74c3c",
    color: "white",
    border: "none",
    padding: "5px"
  }
};
export default App;