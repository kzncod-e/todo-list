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
import GlowText from "./GlowText";
import { ListTodo } from "lucide-react-native";

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
      <View className="w-full mt-[3rem] p-4 ">

        <View className="flex justify-center">
            <GlowText color="#00FFFF" size={24} glowColor="rgba(0,255,255,0.7)" className="text-[#00FFFF] text-2xl font-[PressStart2P] text-center glow-text mb-4">
                Your Tasks
            </GlowText>
            <GlowText color="#fFFFFF" size={10} glowColor="rgba(0,255,255,0.7)" className="text-[#fFFFFF] opacity-60 text-2xl font-[PressStart2P] text-center glow-text mb-4">
              Manage your tasks efficiently!
            </GlowText>
        </View>
        <View className="mb-11 flex-row justify-end">
          <TouchableOpacity onPress={openNew} className="bg-yellow-400 px-4 py-2 rounded-lg">
            <Text className="font-[PressStart2P] text-xs text-black">+ New Task</Text>
          </TouchableOpacity>
        </View>

        <ScrollView >
            {filtered.length === 0 ? (
              <View className="flex-1 flex justify-center items-center">
                <ListTodo size={30} color="#94a3b8" className="w-16 h-16 mx-auto mb-4 text-slate-400/50 opacity-50" />
            <GlowText color="#fFFFFF" size={7} glowColor="rgba(0,255,255,0.7)" className="text-[#fFFFFF] opacity-60 text-2xl font-[PressStart2P] text-center glow-text mb-4">
                  No tasks yet. Start adding some!
                </GlowText>
              </View>
            ) : (
              filtered.map((t) => (
                <TaskItem key={t.id} task={t} onEdit={() => handleEdit(t)} onDelete={() => deleteTodo(t.id)} />
              ))
            )}
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
