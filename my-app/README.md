# 🎓 Course Management System - Frontend

A high-performance, real-time frontend for a Course Management System built with the latest React and Next.js features.

## 🚀 Tech Stack

- **Core**: [Next.js 16 (Canary)](https://nextjs.org/) & [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) & [React Hook Form](https://react-hook-form.com/)
- **UI Components**: 
  - [Radix UI](https://www.radix-ui.com/) (Primitives)
  - [Lucide React](https://lucide.dev/) (Icons)
  - [Vaul](https://vaul.emilkowal.ski/) (Drawers)
  - [Sonner](https://sonner.emilkowal.ski/) (Toasts)
- **Interactions**: 
  - [@dnd-kit](https://dndkit.com/) (Drag & Drop)
  - [TanStack Table v8](https://tanstack.com/table/v8) (Data Grids)
- **Real-time**: [Socket.io](https://socket.io/)
- **Data Visualization**: [Recharts](https://recharts.org/)

## 🧠 Core Complexity

### 1. Advanced UX Patterns (Drag & Drop Tables)
The system implements complex row reordering within data tables using `@dnd-kit` integrated with `TanStack Table`. This allows users to intuitively organize students and projects while maintaining state synchronization across the UI.

### 2. Real-time Synchronization
Built-in WebSocket support via `Socket.io` ensures that multi-user interactions are synchronized instantly. Whether it's project updates or student assignments, the UI reflects changes in real-time without manual refreshes.

### 3. Modern Data Flow (React 19 + Server Actions)
Leverages React 19's `useActionState` and Next.js Server Actions for a seamless, low-latency form submission experience. This approach simplifies state management for complex multi-step forms (like the Project Initialization flow) while providing robust error handling and loading states.

### 4. Modular Component Architecture
Highly modularized structure using atomic design principles. Components like the `DataTable` and `MultiStepForm` are built to be reusable, type-safe (TypeScript + Zod), and accessible (Radix UI).

## 🛠️ Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
