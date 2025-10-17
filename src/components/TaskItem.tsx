/* eslint-disable prettier/prettier */
import { Text, View, TouchableOpacity } from "react-native";
import React from "react";

type Status = "todo" | "inprogress" | "completed";

type Todo = {
  id: number;
  title: string;
  description?: string;
  createdAt: string;
  status: Status;
};

export default function TaskItem({
  task,
  onEdit,
  onDelete,
}: {
  task: Todo;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const badgeColor =
    task.status === "todo"
      ? "bg-cyan-400"
      : task.status === "inprogress"
      ? "bg-yellow-400"
      : "bg-green-400";

  return (
    <View className={`border-2 rounded-lg p-4 mb-3 border-primary bg-white/3`}> 
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text className="text-white font-[PressStart2P] text-xs mb-2">{task.title}</Text>
          {task.description ? (
            <Text className="text-muted-foreground text-[11px] mb-2">{task.description}</Text>
          ) : null}
          <Text className="text-muted-foreground text-[.5rem] font-[PressStart2P]  text-[#FFD900]">{new Date(task.createdAt).toLocaleString()}</Text>
        </View>

        <View className="items-end mb-3 ml-3">
          <View className={`px-2 py-1 flex justify-center items-center rounded-full ${badgeColor} mb-2`}>
            <Text className="text-black text-[0.6rem] font-[PressStart2P]">
              {task.status === "todo" ? "To Do" : task.status === "inprogress" ? "In Progress" : "Completed"}
            </Text>
          </View>

          <View className="flex-row justify-between flex  gap-4">
            <TouchableOpacity onPress={onEdit} className=" flex justify-center items-center px-2 py-1 rounded bg-primary/20">
              <Text className="text-white text-[0.6rem] font-[PressStart2P]">Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete} className="px-2 flex justify-center items-center  py-2 rounded bg-red-500/80">
              <Text className="text-white text-[0.6rem] font-[PressStart2P] ">Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
