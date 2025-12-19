import { useState, useEffect } from "react";
import { API_URL } from "../constants/todos";
import {
  sortedSaveTodos,
  createNewTodo,
  updateTodoData,
  toggleTodoCompletion,
} from "../helpers/todoHelpers.js";
import { loadFromLocalStorage } from "../helpers/storage.js";
import { saveToLocalStorage } from "../helpers/storage.js";
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../api/todoApi.js";
import { useTodoActions } from "./useTodoActions.js";

export const useTodoManagement = () => {
  const [todos, setTodos] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [isDeletingCompleted, setIsDeletingCompleted] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      const savedTodos = sortedSaveTodos(loadFromLocalStorage());

      setTodos(savedTodos);

      try {
        const serverTodos = await fetchTodos();
        const sortedServerTodos = sortedSaveTodos(serverTodos);
        setTodos(sortedServerTodos);
        saveToLocalStorage(sortedServerTodos);
      } catch (error) {
        console.error("Ошибка загрузки данных", error);
      }
    };
    loadInitialData();
  }, []);

  const actions = useTodoActions({
    todos,
    setTodos,
    createNewTodo,
    createTodo,
    saveToLocalStorage,
    updateTodoData,
    updateTodo,
    toggleTodoCompletion,
    deleteTodo,
    setIsDeletingCompleted,
  });

  return {
    todos,
    deletingId,
    setDeletingId,
    isDeletingCompleted,
    setIsDeletingCompleted,
    ...actions,
  };
};
