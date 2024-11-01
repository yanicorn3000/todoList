import { useState, useEffect } from "react";
const apiUrl = "https://todo-api.coderslab.pl/api/";
const token = "47f4b24b-15ad-40e9-98f4-cb22a8c6909a";

export const apiRequest = async (pathname, options = {}) => {
  try {
    const request = await fetch(`${apiUrl}${pathname}`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      method: options.method,
      body: options.data ? JSON.stringify(options.data) : undefined,
    });

    const response = await request.json();
    if (response.error) {
      throw response.data.errors;
    }
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const useAPI = (pathname) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    getData();
  }, [pathname]);

  const getData = () => {
    setLoading(true);
    setError(undefined);

    apiRequest(pathname)
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(true);
        setError(err);
      });
  };

  return [data, { loading, error, refetch: getData }];
};

// /api/tasks	GET	Pobieranie zadań
export const useTasks = () => useAPI("tasks");

// /api/operations/:id	GET	Pobieranie pojedynczej operacji
export const useOperation = (id) => useAPI(`operations/${id}`);

// /api/tasks	POST	Dodawanie zadania do wykonania	{title: "", description: "", status: ""}
export const addNewTask = (task) => {
  return apiRequest("tasks", { method: "POST", data: task });
};

// /api/tasks/:id	DELETE	Usuwanie zadania
export const deleteTask = (task) => {
  return apiRequest(`tasks/${task.id}`, { method: "DELETE" });
};

// /api/tasks/:id	PUT	Aktualizowanie zadania do wykonania	{title: "", description: "", status: ""}
export const changeStatus = (task) => {
  return apiRequest(`tasks/${task.id}`, { method: "PUT", data: task });
};

// /api/tasks/:id/operations	GET	Pobieranie operacji przypisanych do zadania
export const useOperations = (id) => {
  return useAPI(`tasks/${id}/operations`);
};

// /api/tasks/:id/operations	POST	Dodawanie operacji do zadania	{description: "", timeSpent: 0}

export const addNewOperation = (taskId, newOperation) => {
  return apiRequest(`tasks/${taskId}/operations`, {
    method: "POST",
    data: newOperation,
  });
};

// /api/operations/:id	DELETE	Usuwanie operacji

export const deleteOperation = (operation) => {
  return apiRequest(`operations/${operation.id}`, { method: "DELETE" });
};

// /api/operations/:id	PUT	Aktualizowanie pojedynczej operacji	{description: "", timeSpent: 0}
export const addTimeSpent = (operation) => {
  return apiRequest(`operations/${operation.id}`, {
    method: "PUT",
    data: operation,
  });
};
