export const fetchDataActividades = async (url) => {
  const res = await fetch(url);
  const dataActividades = await res.json();
  return dataActividades.results;
};

export const addData = async () => {};

export const editData = async () => {};

export const deleteData = async () => {};
