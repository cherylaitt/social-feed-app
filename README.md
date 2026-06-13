# Welcome to Social Feed App 👋

A modern, high-performance React Native social feed application built with Expo. This project demonstrates advanced UI/UX patterns, including dynamic layout switching (Standard vs. Creator-First), fluid gesture-based interactions, and a clean, scalable architecture.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start -c
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## 🏗️ Architectural Choices

### Component Pattern: Strategy Pattern ("Smart Wrapper, Dumb UI")

- The application separates data fetching and business logic from the visual presentation.
- By using a "Smart Wrapper" to handle the data and passing it down to "Dumb UI" components, the visual components stay strictly focused on their specific layout.
- This makes them significantly easier to style, test, and debug.

## 📦 Libraries & Tech Stack

### Core Architecture

- Expo Router: File-based routing for seamless navigation and deep linking.
- NativeWind: Tailwind CSS for React Native, providing utility-first styling and easy theming.

### State & Data Management

- Zustand (Global State): Used for global flags (like toggling feed layouts). It is lightweight, fast, requires zero boilerplate, and prevents unnecessary re-renders—crucial when swapping heavy UI components.

- TanStack Query (Data Fetching): Handles API requests, caching, and provides built-in loading/error states for rendering UI skeletons.

### UI & Gestures

#### @gorhom/bottom-sheet (For Comments section in Creator-first mode)

- Why: It is the industry standard for bottom sheets, offering true 60fps fluid gestures, deep customization, and internal scrolling support.
- Alternatives considered:
  - react-native-modal: Too simple, lacks true swipeable gestures.
  - Expo Router (formSheet): Navigates to a new screen rather than overlaying the current one.
- Verdict: @gorhom/bottom-sheet was chosen to demonstrate professional, high-quality UI skills akin to top-tier apps like Instagram or TikTok.

#### react-native-image-viewing (For Full-Screen Media)

- Why: A highly reliable, production-ready modal component that handles image pagination, pinch-to-zoom, and the crucial "swipe down to dismiss" gesture out of the box. It maps perfectly to our Media[] data structure and keeps parent components clean via a declarative API.
- Alternatives considered:
  - react-native-image-zoom-viewer: Historically popular but currently unmaintained and causes strict mode warnings.
  - react-native-awesome-gallery: Offers peak performance but requires too much boilerplate (custom modals, close buttons, pagination).
  - Custom Reanimated 3 Build: Great for custom shared-element transitions but notoriously difficult and time-consuming to perfect edge-case gesture math.
- Verdict: It provides the exact "Twitter/Instagram" gesture standard users expect, works flawlessly with Expo, and took minimal time to drop into the existing ImageGrid and ImageCarousel components.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
