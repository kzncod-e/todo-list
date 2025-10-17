/* eslint-disable prettier/prettier */
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Status = "todo" | "inprogress" | "completed";

export type Todo = {
  id: number;
  title: string;
  description?: string;
  createdAt: string;
  status: Status;
};

const STORAGE_KEY = "todos";

type ContextShape = {
  todos: Todo[];
  addTodo: (t: Omit<Todo, "id" | "createdAt">) => void;
  updateTodo: (id: number, patch: Partial<Omit<Todo, "id" | "createdAt">>) => void;
  deleteTodo: (id: number) => void;
};

const TodosContext = createContext<ContextShape | undefined>(undefined);

export const TodosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setTodos(JSON.parse(raw));
      } catch (e) {
        console.warn("Failed to load todos", e);
      }
    };
    load();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (t: Omit<Todo, "id" | "createdAt">) => {
    const newTodo: Todo = {
      id: Date.now(),
      title: t.title,
      description: t.description || "",
      createdAt: new Date().toISOString(),
      status: t.status || "todo",
    };
    setTodos((s) => [...s, newTodo]);
  };

  const updateTodo = (id: number, patch: Partial<Omit<Todo, "id" | "createdAt">>) => {
    setTodos((s) => s.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  };

  const deleteTodo = (id: number) => setTodos((s) => s.filter((t) => t.id !== id));

  return (
    <TodosContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  const ctx = useContext(TodosContext);
  if (!ctx) throw new Error("useTodos must be used within TodosProvider");
  return ctx;
};

export default TodosContext;
