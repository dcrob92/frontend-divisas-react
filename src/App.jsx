import { useEffect, useState, useCallback } from "react";
import { getDivisas, createDivisa, deleteDivisa } from "./services/divisaService";
import "./styles.css";

function App() {
  const [editing, setEditing] = useState(null);
  const [divisas, setDivisas] = useState([]);
  const [search, setSearch] = useState("");

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

  const filteredDivisas = divisas.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.code.toLowerCase().includes(search.toLowerCase())
  );

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

  const handleCancel = () => {
    setEditing(null);
    setForm({ name: "", code: "", exchangeRate: "" });
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

    <form className="form" onSubmit={handleSubmit}>
      <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} />
      <input name="code" placeholder="Código" value={form.code} onChange={handleChange} />
      <input name="exchangeRate" placeholder="Valor" value={form.exchangeRate} onChange={handleChange} />

      <button>{editing ? "Actualizar" : "Crear"}</button>
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

const styles = {
  page: {
    fontFamily: "Arial",
    background: "#f5f7fb",
    minHeight: "100vh",
    padding: "30px"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },

  search: {
    padding: "10px",
    width: "250px",
    borderRadius: "8px",
    border: "1px solid #ccc"
  },

  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px"
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    flex: 1
  },

  button: {
    padding: "10px 15px",
    background: "#2ecc71",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px"
  },

  card: {
    background: "white",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },

  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px"
  },

  edit: {
    background: "#3498db",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  delete: {
    background: "#e74c3c",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer"
  }

};

export default App;