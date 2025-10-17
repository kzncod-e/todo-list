# 🌟 RetroTasks — Retro Todo App

Hey! Ini **RetroTasksr**, todo app kecil tapi asik banget dengan vibe **80s retro / neon**.  
Dibangun pakai **Expo + Expo Router + NativeWind** (Tailwind untuk React Native), dan semua todo lo disimpen **lokal** pakai AsyncStorage.  

---

## ✨ Fitur Keren
- Buat todo dengan **Title, Description**, dan **Status** (To Do / In Progress / Completed)  
- **Created At** otomatis untuk tiap todo  
- Edit & hapus todo pakai **modal retro keren**  
- **3 bottom tabs** biar gampang liat todo sesuai status  
- Semua data tersimpan di **AsyncStorage**, jadi nggak ilang kalau keluar app  
- **Retro vibes**: neon glow, teks keren, dan gradient ala 80-an  

---

## 🗂 Struktur Project
- `src/app` — rute Expo Router  
  - `(tabs)/_layout.tsx` — layout bottom tabs  
  - `(tabs)/todo.tsx`, `inprogress.tsx`, `completed.tsx` — masing-masing status  
- `src/components` — komponen UI: Header, RetroBackground, TaskItem, TodoModal, TodoScreen  
- `src/state/TodosContext.tsx` — context untuk share todos + simpan ke AsyncStorage  
- `assets/fonts` — **PressStart2P**, font retro favorit  

---

## 📦 Dependensi
- **Expo (managed workflow)**  
- **expo-router**  
- **nativewind / tailwindcss**  
- **@react-native-async-storage/async-storage**  
- **lucide-react-native** (ikon keren)  
- **expo-linear-gradient & expo-font**  

---

## 🚀 Cara Jalanin (Windows)
```bash
# Clone repo
git clone https://github.com/kzncod-e/todo-list.git

# Install dependencies
npm install

# Start dev server
npx expo start
