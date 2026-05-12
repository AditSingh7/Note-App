# 📝 Note App

A modern Notes Application built using React Native, Expo Router, and TypeScript.

This app provides a clean and responsive UI for managing notes with support for dark mode, searching, responsive layouts, and interactive note editing.

---

# ✨ Features

## 📋 Notes Listing Screen

* Displays notes using `FlatList`
* Modern card-based UI
* Interactive press animations
* Empty search state handling

## 🔍 Search Functionality

* Real-time note filtering
* Search by note title or content preview

## 🌙 Dark / Light Mode

* Automatic system theme detection
* Manual theme toggle support
* Dynamic UI color adaptation

## 📝 Note Editor Screen

* Create and edit notes
* Responsive input fields
* Title character counter
* Focus state styling
* Keyboard avoiding behavior

## ⚠️ Validation & Navigation

* Save validation for empty fields
* Unsaved changes warning dialog
* Back navigation using Expo Router

## 📱 Responsive Design

* Mobile and tablet layout support
* Dynamic spacing using screen dimensions

---

# 🛠️ Tech Stack

* React Native
* Expo
* Expo Router
* TypeScript
* React Hooks
* StyleSheet API

---

# 📂 Project Structure

```bash id="0ec3ur"
Note-App/
│
├── app/
│   ├── index.tsx
│   ├── editor.tsx
│   └── _layout.tsx
│
├── assets/
│   └── images/
│
├── components/
├── package.json
└── README.md
```

---

# ⚙️ Installation

Clone the repository:

```bash id="ib43x4"
git clone https://github.com/AditSingh7/Note-App.git
```

Move into the project folder:

```bash id="jg2uxs"
cd Note-App
```

Install dependencies:

```bash id="q3m8ph"
npm install
```

Start the Expo development server:

```bash id="u78l8u"
npx expo start
```

---

# 📱 Running the App

Run the application using:

* Android Emulator
* iOS Simulator
* Expo Go

---

# 🌙 Theme Support

The app supports:

* Automatic system theme detection using:

```tsx id="mpqm6v"
useColorScheme()
```

* Manual dark/light mode toggling

---

# 📸 Screens

* Home Screen
* Notes List
* Search UI
* Note Editor
* Dark Mode Interface

---

# 🚀 Future Improvements

* Local database storage
* Cloud sync
* User authentication
* Categories & tags
* Rich text formatting
* Pin notes feature
* Delete & edit notes
* Animations and transitions

---

# 👨‍💻 Author

Adit Singh

GitHub: https://github.com/AditSingh7

---

# 📄 License

This project is developed for learning and educational purposes.
