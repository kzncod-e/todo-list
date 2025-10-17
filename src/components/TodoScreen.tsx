/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
import React, { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useFonts } from "expo-font";
import RetroBackground from "@/components/RetroBackground";
import Header from "@/components/Header";
import TaskItem from "@/components/TaskItem";
import TodoModal from "@/components/TodoModal";
import { useTodos, Todo } from "@/state/TodosContext";
import * as SplashScreen from 'expo-splash-screen';
type Status = "todo" | "inprogress" | "completed";


export default function TodoScreen({ status }: { status: Status }) {
  const { todos, addTodo, updateTodo, deleteTodo } = useTodos();
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState<Todo | null>(null);
  const [fontsLoaded] = useFonts({
    PressStart2P: require("../../assets/fonts/PressStart2P-Regular.ttf"),
  });



 
  const filtered = todos.filter((t) => t.status === status);

 
  const openNew = () => {
    setEditing(null);
    setModalVisible(true);
  };

  const handleSave = (payload: { title: string; description?: string; status: Status }) => {
    if (editing) {
      updateTodo(editing.id, payload);
      setEditing(null);
    } else {
      addTodo(payload);
    }
    setModalVisible(false);
  };

  const handleEdit = (t: Todo) => {
    setEditing(t);
    setModalVisible(true);
  };
if (!fontsLoaded) {
  return (
    <View className="flex-1 justify-center items-center bg-black">
      <Text className="text-white">Loading...</Text>
    </View>
  );
}
  return (
    <RetroBackground>
      <Header />
      <View className="w-full p-4 flex-1">
        <View className="mb-4 flex-row justify-end">
          <TouchableOpacity onPress={openNew} className="bg-yellow-400 px-4 py-2 rounded-lg">
            <Text className="font-[PressStart2P] text-xs text-black">+ Add</Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          {filtered.map((t) => (
            <TaskItem key={t.id} task={t} onEdit={() => handleEdit(t)} onDelete={() => deleteTodo(t.id)} />
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
