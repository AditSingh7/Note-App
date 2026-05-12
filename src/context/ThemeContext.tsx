import React, { createContext, useContext, useState } from "react";

export interface Note {
  id: string;
  title: string;
  preview: string;
  date: string;
}

interface ThemeContextType {
  themeOverride: string | null;
  setThemeOverride: (theme: string | null) => void;
  notes: Note[];
  addNote: (note: Note) => void;
  updateNote: (id: string, note: Note) => void;
  deleteNote: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const initialNotes: Note[] = [
  {
    id: "1",
    title: "Meeting Notes",
    preview: "Discuss app UI improvements and deadlines.",
    date: "12 May 2026",
  },
  {
    id: "2",
    title: "Shopping List",
    preview: "Milk, Bread, Coffee, Fruits",
    date: "10 May 2026",
  },
  {
    id: "3",
    title: "Ideas",
    preview: "Build a modern notes app using React Native.",
    date: "8 May 2026",
  },
];

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [themeOverride, setThemeOverride] = useState<string | null>(null);
  const [notes, setNotes] = useState<Note[]>(initialNotes);

  const addNote = (note: Note) => {
    setNotes((prevNotes) => [note, ...prevNotes]);
  };

  const updateNote = (id: string, updatedNote: Note) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? updatedNote : note)),
    );
  };

  const deleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  return (
    <ThemeContext.Provider
      value={{
        themeOverride,
        setThemeOverride,
        notes,
        addNote,
        updateNote,
        deleteNote,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
