/* eslint-disable prettier/prettier */
import { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RetroBackground from "@/components/RetroBackground";
import Header from "@/components/Header";
import TaskItem from "@/components/TaskItem";
import TodoModal from "@/components/TodoModal";
import { useFonts } from "expo-font";

type Status = "todo" | "inprogress" | "completed";

type Todo = {
  id: number;
  title: string;
  description?: string;
  createdAt: string; // ISO
  status: Status;
};

const STORAGE_KEY = "todos";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState<Todo | null>(null);
  const [activeTab, setActiveTab] = useState<Status>("todo");
  const [fontsLoaded] = useFonts({
    PressStart2P: require("../../assets/fonts/PressStart2P-Regular.ttf"),
  });

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

  const openNew = () => {
    setEditing(null);
    setModalVisible(true);
  };

  const handleSave = (payload: { title: string; description?: string; status: Status }) => {
    if (editing) {
      setTodos((s) => s.map((t) => (t.id === editing.id ? { ...t, ...payload } : t)));
      setEditing(null);
    } else {
      const newTodo: Todo = {
        id: Date.now(),
        title: payload.title,
        description: payload.description || "",
        createdAt: new Date().toISOString(),
        status: payload.status || "todo",
      };
      setTodos((s) => [...s, newTodo]);
    }
    setModalVisible(false);
  };

  const handleEdit = (todo: Todo) => {
    setEditing(todo);
    setModalVisible(true);
  };

  const handleDelete = (id: number) => {
    setTodos((s) => s.filter((t) => t.id !== id));
  };

  const filtered = useMemo(() => todos.filter((t) => t.status === activeTab), [todos, activeTab]);

  if (!fontsLoaded) return null;

  return (
    <RetroBackground>
      <Header />
      <View className="w-full p-4">
        {/* Tabs */}
        <View className="flex-row justify-between mb-4">
          {[
            { key: "todo", label: "To Do" },
            { key: "inprogress", label: "In Progress" },
            { key: "completed", label: "Completed" },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveTab(tab.key as Status)}
              className={`flex-1 mx-1 py-4 rounded-lg border-2 items-center ${
                activeTab === tab.key ? "border-yellow-400 bg-yellow-400/20" : "border-primary"
              }`}
            >
              <Text className="font-[PressStart2P] text-[0.6rem]   text-white">{tab.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="mb-4 flex-row justify-end">
          <TouchableOpacity onPress={openNew} className="bg-yellow-400 px-4 py-2 rounded-lg">
            <Text className="font-[PressStart2P] text-xs text-black">+ Add</Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          {filtered.map((t) => (
            <TaskItem key={t.id} task={t} onEdit={() => handleEdit(t)} onDelete={() => handleDelete(t.id)} />
          ))}
        </ScrollView>
      </View>

      <TodoModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setEditing(null);
        }}
        onSave={handleSave}
        initialData={editing || undefined}
      />
    </RetroBackground>
  );
}
