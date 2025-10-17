import { LinearGradient } from "expo-linear-gradient";
import React from "react";

export default function RetroBackground({
  children,
}: React.PropsWithChildren<unknown>) {
  return (
    <LinearGradient
      colors={["#120318", "#350b40", "#002f4b"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1"
    >
      {children}
    </LinearGradient>
  );
}
