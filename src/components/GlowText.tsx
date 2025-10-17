/* eslint-disable prettier/prettier */
import React, { useEffect, useRef } from "react";
import { Text, Animated } from "react-native";

interface GlowTextProps {
  children: React.ReactNode;
  className?: string; // untuk Tailwind classes
  color?: string;     // warna utama text
  glowColor?: string; // warna glow
  size?: number;      // font size
}

const AnimatedText = Animated.createAnimatedComponent(Text);

export default function GlowText({
  children,
  className,
  color = "#FF6BC1",
  glowColor = "rgba(255,107,193,0.7)",
  size = 24,
}: GlowTextProps) {
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const textShadowRadius = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 40], // bisa diubah sesuai efek glow
  });

  return (
    <AnimatedText
      className={className}
      style={{
        color,
        fontSize: size,
        textShadowColor: glowColor,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius,
      }}
    >
      {children}
    </AnimatedText>
  );
}
