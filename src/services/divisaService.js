const API_URL = "http://localhost:8080/api/currencies";

export const getDivisas = async () => {
  const res = await fetch(API_URL);
  return await res.json();
};

export const createDivisa = async (divisa) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(divisa)
  });
  return await res.json();
};

export const deleteDivisa = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
};