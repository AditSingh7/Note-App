import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

const HomeScreen = () => {
  const systemTheme = useColorScheme();
  const { themeOverride, setThemeOverride, notes } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [focusedCardId, setFocusedCardId] = useState<string | null>(null);
  const theme = themeOverride || systemTheme;
  const isDark = theme === "dark";

  const toggleTheme = () => {
    setThemeOverride(isDark ? "light" : "dark");
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.preview.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#0F172A" : "#FFFFFF" },
      ]}
    >
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#0F172A" : "#FFFFFF"}
      />
      <View style={styles.header}>
        <Pressable style={styles.themeToggler} onPress={toggleTheme}>
          <Image
            source={require("../../assets/images/dark-mode.png")}
            style={styles.toggleImage}
          />
        </Pressable>
        <Text
          style={[styles.heading, { color: isDark ? "#FFFFFF" : "#000000" }]}
        >
          Your tasks
        </Text>
        <View style={styles.headerRightGroup}>
          <Pressable
            style={[
              styles.addButton,
              { backgroundColor: isDark ? "#1E293B" : "#F1F5F9" },
            ]}
            onPress={() => router.push("/editor")}
          >
            <Text
              style={[
                styles.addButtonText,
                { color: isDark ? "#3B82F6" : "#3B82F6" },
              ]}
            >
              +
            </Text>
          </Pressable>
          <Image
            source={require("../../assets/images/user.png")}
            style={styles.profileImage}
          />
        </View>
      </View>

      <View
        style={[
          styles.searchContainer,
          { backgroundColor: isDark ? "#1E293B" : "#F1F5F9" },
        ]}
      >
        <TextInput
          style={[
            styles.searchInput,
            {
              backgroundColor: isDark ? "#0F172A" : "#FFFFFF",
              color: isDark ? "#FFFFFF" : "#000000",
              borderColor: isDark ? "#334155" : "#E2E8F0",
            },
          ]}
          placeholder="Search notes..."
          placeholderTextColor={isDark ? "#94A3B8" : "#CBD5E1"}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          searchQuery ? (
            <View style={styles.emptyContainer}>
              <Text
                style={[
                  styles.emptyText,
                  { color: isDark ? "#94A3B8" : "#64748B" },
                ]}
              >
                No notes found
              </Text>
            </View>
          ) : null
        }
        renderItem={({ item }) => (
          <Pressable
            style={[
              styles.card,
              {
                backgroundColor: isDark ? "#1E293B" : "#E2E8F0",
              },
              focusedCardId === item.id && styles.cardFocused,
            ]}
            onPress={() =>
              router.push({
                pathname: "/editor",
                params: {
                  id: item.id,
                  title: item.title,
                  content: item.preview,
                  date: item.date,
                },
              })
            }
            onPressIn={() => setFocusedCardId(item.id)}
            onPressOut={() => setFocusedCardId(null)}
          >
            <Text
              style={[styles.title, { color: isDark ? "#FFFFFF" : "#000000" }]}
            >
              {item.title}
            </Text>

            <Text
              style={[
                styles.preview,
                { color: isDark ? "#CBD5E1" : "#475569" },
              ]}
            >
              {item.preview}
            </Text>

            <Text
              style={[styles.date, { color: isDark ? "#94A3B8" : "#64748B" }]}
            >
              {item.date}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  themeToggler: {
    padding: 8,
  },

  toggleImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: "700",
    flex: 1,
    textAlign: "center",
  },

  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },

  headerRightGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },

  addButtonText: {
    fontSize: 28,
    fontWeight: "600",
  },

  searchContainer: {
    paddingHorizontal: 0,
    paddingVertical: 16,
    marginBottom: 12,
    borderRadius: 12,
  },

  searchInput: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderRadius: 10,
    borderWidth: 1,
  },

  card: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },

  cardFocused: {
    shadowOpacity: 0.2,
    elevation: 6,
    transform: [{ scale: 1.02 }],
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },

  emptyText: {
    fontSize: 16,
    fontWeight: "500",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
  },

  preview: {
    fontSize: 16,
    lineHeight: 24,
  },

  date: {
    fontSize: 13,
    opacity: 0.6,
  },
});
