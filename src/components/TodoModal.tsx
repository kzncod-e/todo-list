/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type Status = "todo" | "inprogress" | "completed";

interface TodoModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (task: { title: string; description?: string; status: Status }) => void;
  initialData?: { title: string; description?: string; status: Status } | undefined;
}

const TodoModal: React.FC<TodoModalProps> = ({ visible, onClose, onSave, initialData }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>("todo");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setStatus(initialData.status || "todo");
    } else {
      setTitle("");
      setDescription("");
      setStatus("todo");
    }
  }, [initialData, visible]);

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({ title: title.trim(), description: description.trim(), status });
    // clear handled by parent via initialData/visible change, but reset here too
    setTitle("");
    setDescription("");
    setStatus("todo");
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View className="flex-1 justify-center items-center bg-black/70 px-4">
        <LinearGradient
          colors={["#1A002E", "#002D2D", "#2E004F"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="w-full rounded-2xl overflow-hidden border-2 border-primary p-5"
        >
          <Text className="text-primary text-xl font-[PressStart2P] text-center glow-text-primary mb-4">
            {initialData ? "✏️ Edit Task" : "✨ New Task"}
          </Text>

          {/* Input Title */}
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Enter task title..."
            placeholderTextColor="#aaa"
            className="border border-primary shadow-2xl rounded-lg text-[.6rem] px-3 py-2 text-white font-[PressStart2P] mb-3"
          />

          {/* Input Description */}
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Optional description..."
            placeholderTextColor="#aaa"
            multiline
            className="border border-primary shadow-2xl text-[.6rem] border-muted rounded-lg px-3 py-2 text-white font-[PressStart2P] mb-4 h-20"
          />

          {/* Status Toggle */}
          <View className="flex-row justify-between mb-6">
            <TouchableOpacity
              onPress={() => setStatus("todo")}
              className={`flex-1 mx-1 py-2 items-center flex justify-center rounded-lg border ${
                status === "todo" ? "border-secondary bg-secondary/20" : "border-muted"
              }`}
            >
              <Text className={`text-center font-[PressStart2P]  text-[.6rem] ${status === "todo" ? "text-secondary glow-text-secondary" : "text-muted-foreground"}`}>
                TO DO
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setStatus("inprogress")}
              className={`flex-1 mx-1 py-2 items-center flex justify-center rounded-lg border ${
                status === "inprogress" ? "border-yellow-400 bg-yellow-400/20" : "border-muted"
              }`}
            >
              <Text className={`text-center font-[PressStart2P] text-[.6rem] ${status === "inprogress" ? "text-yellow-400 glow-text-secondary" : "text-muted-foreground"}`}>
                IN PROGRESS
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setStatus("completed")}
              className={`flex-1 mx-1 py-2 flex justify-center rounded-lg border ${
                status === "completed" ? "border-accent bg-accent/20" : "border-muted"
              }`}
            >
              <Text className={`text-center font-[PressStart2P] text-[.6rem] ${status === "completed" ? "text-accent glow-text-accent" : "text-muted-foreground"}`}>
                COMPLETED
              </Text>
            </TouchableOpacity>
          </View>

          {/* Action Buttons */}
          <View className="flex-row justify-end gap-3">
            <TouchableOpacity onPress={onClose}>
              <Text className="text-muted-foreground font-retro">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave} className="rounded-lg overflow-hidden">
              <LinearGradient
                colors={["#FF4DD2", "#00FFFF"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="px-4 py-2"
              >
                <Text className="text-red-400    font-[PressStart2P] text-xs">Save</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
};

export default TodoModal;
