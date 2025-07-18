# YoloTask

YoloTask is a modern, cross-platform mobile application built with [Expo](https://expo.dev) and [React Native](https://reactnative.dev). The project leverages file-based routing, custom theming, and a clean, modular architecture to provide a robust foundation for scalable app development.

## Features

- **Expo Router** for file-based navigation
- **Custom Theming** with light/dark mode support
- **Reusable UI Components**
- **TypeScript** for type safety
- **Pre-configured ESLint** for code quality
- **Easy Project Reset** script for rapid prototyping

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Mohd-Fazal-khan/YoloTask.git
   cd YoloTask
   ```

2. **Install dependencies:**

   ```sh
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**

   ```sh
   npx expo start
   ```

   Follow the on-screen instructions to run the app on an emulator, simulator, or physical device.

## Project Structure

```
YoloTask/
  app/                # App screens and navigation
    tabs/             # Tab-based screens
  assets/             # Fonts and images
  constants/          # App-wide constants (e.g., colors)
  hooks/              # Custom React hooks
  scripts/            # Utility scripts (e.g., reset-project.js)
  .expo/              # Expo-generated files
  .vscode/            # VSCode settings
  ...
```

## Scripts

- `npm start` — Start the Expo development server
- `npm run android` — Run the app on Android
- `npm run ios` — Run the app on iOS
- `npm run web` — Run the app in the browser
- `npm run lint` — Lint the codebase
- `npm run reset-project` — Reset the project to a blank state

## Theming

The app supports both light and dark themes. Theme colors are defined in [`constants/Colors.ts`](constants/Colors.ts), and the current theme is determined using custom hooks in [`hooks/`](hooks/).

## Contributing

Contributions are welcome! Please open issues and submit pull requests for any improvements or bug fixes.

## License

This project is licensed under the MIT License.

---

**Made by Mohd Fazal Khan**
