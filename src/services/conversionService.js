const API_URL = "http://localhost:8080/api/conversions";

const parseErrorMessage = async (response) => {
  try {
    const error = await response.json();
    return error.message || "Error al convertir divisas";
  } catch {
    return "Error al convertir divisas";
  }
};

export const convertCurrency = async ({ amount, sourceCurrency, targetCurrencies }) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount, sourceCurrency, targetCurrencies }),
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  return response.json();
};
