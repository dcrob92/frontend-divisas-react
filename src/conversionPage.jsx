import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { convertCurrency } from "./services/conversionService";
import "./styles.css";

const CURRENCIES = ["USD", "COP", "EUR", "BRL", "MXN", "GBP", "ARS", "CLP", "PEN", "CAD"];

const validateConversion = ({ amount, targetCurrencies }) => {
  const parsedAmount = Number(amount);

  if (!amount || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
    return "Ingresa un monto válido mayor a cero";
  }

  if (targetCurrencies.length === 0) {
    return "Selecciona al menos una moneda destino";
  }

  return null;
};

export default function ConversionPage() {
  const navigate = useNavigate();
  const [sourceCurrency, setSourceCurrency] = useState("USD");
  const [amount, setAmount] = useState("");
  const [targetCurrencies, setTargetCurrencies] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheckbox = (currency) => {
    setTargetCurrencies((prev) =>
      prev.includes(currency)
        ? prev.filter((code) => code !== currency)
        : [...prev, currency],
    );
  };

  const handleConvert = async (e) => {
    e.preventDefault();

    const validationError = validateConversion({ amount, targetCurrencies });

    if (validationError) {
      setError(validationError);
      setResult(null);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await convertCurrency({
        amount: Number(amount),
        sourceCurrency,
        targetCurrencies,
      });
      setResult(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const availableTargets = CURRENCIES.filter(
    (currency) => currency !== sourceCurrency,
  );

  return (
    <div className="container">
      <div className="header">
        <h1>💱 Conversor de Divisas</h1>

        <button
          type="button"
          className="btn-primary"
          onClick={() => navigate("/")}
        >
          Volver a divisas
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      <form className="form" onSubmit={handleConvert}>
        <select
          value={sourceCurrency}
          onChange={(e) => {
            const newSource = e.target.value;
            setSourceCurrency(newSource);
            setTargetCurrencies((prev) =>
              prev.filter((code) => code !== newSource),
            );
          }}
        >
          {CURRENCIES.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>

        <input
          type="number"
          min="0.01"
          step="0.01"
          placeholder="Cantidad"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Convirtiendo..." : "Convertir"}
        </button>
      </form>

      <section className="targets-section">
        <h3 className="section-title">Monedas destino</h3>

        <div className="grid">
          {availableTargets.map((currency) => (
            <div key={currency} className="card">
              <label className="currency-option">
                <input
                  type="checkbox"
                  checked={targetCurrencies.includes(currency)}
                  onChange={() => handleCheckbox(currency)}
                />
                <span>{currency}</span>
              </label>
            </div>
          ))}
        </div>
      </section>

      {result && (
        <section className="results-section">
          <div className="success">
            Monto original: {result.amount} {result.sourceCurrency}
          </div>

          <div className="grid results-grid">
            {Object.entries(result.conversions).map(([currency, value]) => (
              <div key={currency} className="card">
                <h3>{currency}</h3>
                <p>{value}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
