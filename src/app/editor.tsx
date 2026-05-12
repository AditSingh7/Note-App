import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

const NoteEditor = () => {
  const systemTheme = useColorScheme();
  const { themeOverride, addNote, updateNote } = useTheme();
  const params = useLocalSearchParams();
  const theme = themeOverride || systemTheme;
  const isDark = theme === "dark";
  const { width } = useWindowDimensions();
  const isTablet = width > 768;

  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [titleFocused, setTitleFocused] = useState(false);
  const [contentFocused, setContentFocused] = useState(false);

  const isEditMode = !!params?.id;
  const headerTitle = isEditMode ? "Edit Note" : "New Note";

  useEffect(() => {
    if (isEditMode) {
      setNoteTitle(params?.title as string);
      setNoteContent(params?.content as string);
    }
  }, [isEditMode, params?.id]);

  const handleSave = () => {
    if (!noteTitle.trim()) {
      Alert.alert("Error", "Please enter a note title");
      return;
    }
    if (!noteContent.trim()) {
      Alert.alert("Error", "Please enter note content");
      return;
    }

    const today = new Date();
    const dateString = `${today.getDate()} ${today.toLocaleString("en-US", {
      month: "short",
    })} ${today.getFullYear()}`;

    if (isEditMode) {
      const updatedNote = {
        id: params?.id as string,
        title: noteTitle.trim(),
        preview: noteContent.trim().substring(0, 60) + "...",
        date: params?.date as string,
      };
      updateNote(params?.id as string, updatedNote);
      Alert.alert("Success", "Note updated successfully!");
    } else {
      const newNote = {
        id: Date.now().toString(),
        title: noteTitle.trim(),
        preview: noteContent.trim().substring(0, 60) + "...",
        date: dateString,
      };
      addNote(newNote);
      Alert.alert("Success", "Note saved successfully!");
    }

    setNoteTitle("");
    setNoteContent("");
    router.back();
  };

  const handleBack = () => {
    if (noteTitle.trim() || noteContent.trim()) {
      Alert.alert("Unsaved Changes", "Do you want to discard your changes?", [
        { text: "Keep Editing", onPress: () => {} },
        {
          text: "Discard",
          onPress: () => router.back(),
          style: "destructive",
        },
      ]);
    } else {
      router.back();
    }
  };

  const buttonGroupStyles = StyleSheet.compose(
    styles.buttonGroup,
    isTablet && styles.buttonGroupTablet,
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#0F172A" : "#FFFFFF" },
      ]}
    >
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#0F172A" : "#FFFFFF"}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        {/* Header with ImageBackground */}
        <ImageBackground
          source={require("../../assets/images/user.png")}
          style={styles.headerBackground}
          imageStyle={styles.headerImageStyle}
        >
          <View
            style={[
              styles.headerOverlay,
              {
                backgroundColor: isDark
                  ? "rgba(15, 23, 42, 0.9)"
                  : "rgba(255, 255, 255, 0.9)",
              },
            ]}
          >
            <View style={styles.headerContent}>
              <Pressable
                style={[
                  styles.headerButton,
                  styles.backButton,
                  { backgroundColor: isDark ? "#1E293B" : "#F1F5F9" },
                ]}
                onPress={handleBack}
              >
                <Text
                  style={[
                    styles.headerButtonText,
                    { color: isDark ? "#FFFFFF" : "#000000" },
                  ]}
                >
                  ←
                </Text>
              </Pressable>

              <Text
                style={[
                  styles.headerTitle,
                  { color: isDark ? "#FFFFFF" : "#000000" },
                ]}
              >
                {headerTitle}
              </Text>

              <Pressable
                style={[
                  styles.headerButton,
                  styles.saveButton,
                  { backgroundColor: "#3B82F6" },
                ]}
                onPress={handleSave}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </Pressable>
            </View>
          </View>
        </ImageBackground>

        {/* Input Fields */}
        <View
          style={[
            styles.inputContainer,
            {
              paddingHorizontal: isTablet ? 40 : 20,
              paddingTop: isTablet ? 32 : 24,
            },
          ]}
        >
          {/* Title Input */}
          <View style={styles.inputWrapper}>
            <Text
              style={[
                styles.inputLabel,
                { color: isDark ? "#CBD5E1" : "#475569" },
              ]}
            >
              Title
            </Text>
            <TextInput
              style={[
                styles.titleInput,
                {
                  backgroundColor: isDark ? "#1E293B" : "#F8FAFC",
                  color: isDark ? "#FFFFFF" : "#000000",
                  borderColor: titleFocused
                    ? "#3B82F6"
                    : isDark
                      ? "#334155"
                      : "#E2E8F0",
                },
              ]}
              placeholder="Enter note title..."
              placeholderTextColor={isDark ? "#64748B" : "#CBD5E1"}
              value={noteTitle}
              onChangeText={setNoteTitle}
              onFocus={() => setTitleFocused(true)}
              onBlur={() => setTitleFocused(false)}
              maxLength={100}
            />
            <Text
              style={[
                styles.charCount,
                { color: isDark ? "#64748B" : "#94A3B8" },
              ]}
            >
              {noteTitle.length}/100
            </Text>
          </View>

          {/* Content Input */}
          <View
            style={[
              styles.inputWrapper,
              { flex: 1, marginTop: isTablet ? 32 : 24 },
            ]}
          >
            <Text
              style={[
                styles.inputLabel,
                { color: isDark ? "#CBD5E1" : "#475569" },
              ]}
            >
              Content
            </Text>
            <TextInput
              style={[
                styles.contentInput,
                {
                  backgroundColor: isDark ? "#1E293B" : "#F8FAFC",
                  color: isDark ? "#FFFFFF" : "#000000",
                  borderColor: contentFocused
                    ? "#3B82F6"
                    : isDark
                      ? "#334155"
                      : "#E2E8F0",
                  flex: 1,
                },
              ]}
              placeholder="Start typing your note..."
              placeholderTextColor={isDark ? "#64748B" : "#CBD5E1"}
              value={noteContent}
              onChangeText={setNoteContent}
              onFocus={() => setContentFocused(true)}
              onBlur={() => setContentFocused(false)}
              multiline
              textAlignVertical="top"
            />
          </View>

          {/* Bottom Action Buttons */}
          <View
            style={[
              styles.buttonGroup,
              isTablet && styles.buttonGroupTablet,
              { marginTop: 24, marginBottom: isTablet ? 32 : 20 },
            ]}
          >
            <Pressable
              style={[
                styles.actionButton,
                styles.cancelButton,
                {
                  backgroundColor: isDark ? "#1E293B" : "#F1F5F9",
                  borderColor: isDark ? "#334155" : "#E2E8F0",
                },
              ]}
              onPress={handleBack}
            >
              <Text
                style={[
                  styles.actionButtonText,
                  { color: isDark ? "#94A3B8" : "#64748B" },
                ]}
              >
                Cancel
              </Text>
            </Pressable>

            <Pressable
              style={[styles.actionButton, styles.submitButton]}
              onPress={handleSave}
            >
              <Text style={styles.submitButtonText}>Save Note</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NoteEditor;

const styles = StyleSheet.create({
  baseStyles: {
    flex: 1,
  },
  container: {
    flex: 1,
  },

  headerBackground: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    minHeight: 100,
    justifyContent: "center",
  },

  headerImageStyle: {
    opacity: 0.15,
  },

  headerOverlay: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },

  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },

  backButton: {
    flex: 0,
  },

  saveButton: {
    flex: 0,
  },

  headerButtonText: {
    fontSize: 20,
    fontWeight: "600",
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    flex: 1,
    textAlign: "center",
  },

  inputContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },

  inputWrapper: {
    marginBottom: 8,
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  titleInput: {
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 18,
    fontWeight: "600",
    minHeight: 50,
  },

  contentInput: {
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    lineHeight: 24,
    minHeight: 200,
  },

  charCount: {
    fontSize: 12,
    marginTop: 6,
    textAlign: "right",
  },

  buttonGroup: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
  },

  buttonGroupTablet: {
    gap: 16,
  },

  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 48,
  },

  cancelButton: {
    borderWidth: 1.5,
  },

  actionButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },

  submitButton: {
    backgroundColor: "#3B82F6",
  },

  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
