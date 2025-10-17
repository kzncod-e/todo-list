# RetroTasksr — Todo app (Retro UI)

This is a small Todo app built with Expo + Expo Router and NativeWind (Tailwind for React Native). It uses a retro / 80s aesthetic and stores todos locally with AsyncStorage.

## Features
- Create todos with Title, Description and Status (To Do, In Progress, Completed)
- Auto-generated Created At timestamp for each todo
- Edit and delete todos with a modal UI
- Three bottom tabs: To Do, In Progress, Completed
- Local persistence using `@react-native-async-storage/async-storage`
- Retro look using Tailwind (NativeWind) with neon/glow text and gradients

## Project structure (important files)
- `src/app` — Expo Router routes
	- `(tabs)/index.tsx` — bottom tabs layout
	- `(tabs)/todo.tsx`, `inprogress.tsx`, `completed.tsx` — screens for each status
- `src/components` — UI components (Header, RetroBackground, TaskItem, TodoModal, TodoScreen)
- `src/state/TodosContext.tsx` — shared Todos context with AsyncStorage persistence
- `assets/fonts` — PressStart2P font used for retro UI

## Dependencies
- Expo (managed workflow)
- `expo-router`
- `nativewind` / `tailwindcss`
- `@react-native-async-storage/async-storage`
- `lucide-react-native` (icons)
- `expo-linear-gradient`, `expo-font`

## How to run (Windows)
1. Open a terminal in the project folder.

PowerShell (may require using cmd if npm scripts are blocked by ExecutionPolicy):

```powershell
cd "c:\Users\User\Documents\belajar pemograman\projek  mandiri\todo-mobile\my-app"
# Install dependencies once
npm install
# Start the dev server (Expo)
npm run start
```

If PowerShell blocks npm.ps1, use cmd.exe instead:

```cmd
cd /d c:\Users\User\Documents\belajar pemograman\projek  mandiri\todo-mobile\my-app
npm install
npm run start
```

2. Open the Expo DevTools in the browser and run on a simulator or physical device (Android/iOS).

## Linting & TypeScript
- Lint: `npm run lint` (auto-fix with `npm run lint -- --fix`)
- Type check: `npx tsc --noEmit`

## Troubleshooting
- If PowerShell complains about running scripts (ExecutionPolicy), open cmd.exe or adjust the policy: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser` (run as admin).
- If the bottom tabs don't appear, ensure you restarted the dev server after code changes. The app redirects to `/todo` which mounts the tabs layout.

## Next improvements (optional)
- Polish retro styles and keyboard behavior in modal
- Add search / filter / sorting
- Add export/import (JSON backup)

If you'd like, I can run lint/type checks and fix any remaining issues, or add a floating Add button to the tab bar. Tell me which next step you want.
