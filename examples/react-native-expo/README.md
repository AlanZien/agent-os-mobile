# React Native + Expo Examples

This directory contains example code demonstrating best practices for React Native + Expo development with Agent OS.

## 📁 Files Overview

### Screen.example.tsx
Complete screen component example demonstrating:
- TypeScript types and interfaces
- Navigation integration with type safety
- State management with hooks
- API data fetching with loading/error states
- FlatList optimization with memoization
- Pull-to-refresh functionality
- Safe area handling
- Proper styling organization

### Component.example.tsx
Reusable component examples including:
- Button component with variants and loading states
- Card component with elevation
- Badge component for status indicators
- Platform-specific shadow creation
- Accessibility considerations (minimum touch targets)
- Component composition patterns

### CustomHook.example.tsx
Custom hooks demonstrating:
- `useAuth` - Authentication state management with SecureStore
- `useFetch` - Generic data fetching with retry logic
- `useDebounce` - Value debouncing for search/filter
- `useForm` - Form state and validation management
- `useAsyncStorage` - Persistent state with AsyncStorage
- `useKeyboard` - Keyboard visibility and height tracking

### Test.example.test.tsx
Comprehensive testing examples:
- Component testing with React Native Testing Library
- Hook testing with @testing-library/react-hooks
- Async operation testing
- Navigation testing
- Integration testing
- E2E testing with Detox

## 🎯 Key Patterns Used

### TypeScript
- Explicit interface definitions for props
- Type-safe navigation parameters
- Generic types for reusable hooks
- Proper error handling with type guards

### Performance
- React.memo for list items
- useCallback for event handlers
- useMemo for expensive calculations
- FlatList optimization props
- Proper key extraction

### Code Organization
- Imports grouped logically
- Hooks at component top
- Event handlers before render
- Styles at the bottom
- Separation of concerns

### Mobile Best Practices
- Platform-specific code handling
- Safe area management
- Keyboard handling
- Offline-first approach
- Secure storage for sensitive data
- Proper error boundaries

## 🚀 Usage

These examples are meant to be references when building your mobile app. Copy and adapt them to your specific needs while maintaining the patterns and best practices demonstrated.

### Quick Start Pattern

1. **Create a new screen:**
   ```bash
   # Copy and adapt Screen.example.tsx
   cp Screen.example.tsx src/screens/YourScreen.tsx
   ```

2. **Create reusable components:**
   ```bash
   # Copy and adapt Component.example.tsx
   cp Component.example.tsx src/components/YourComponent.tsx
   ```

3. **Create custom hooks:**
   ```bash
   # Copy and adapt CustomHook.example.tsx
   cp CustomHook.example.tsx src/hooks/useYourHook.tsx
   ```

4. **Write tests:**
   ```bash
   # Copy and adapt Test.example.test.tsx
   cp Test.example.test.tsx src/__tests__/YourComponent.test.tsx
   ```

## 📚 Required Dependencies

Make sure you have these packages installed:

```bash
# Core
npm install react-native
npx expo install expo

# Navigation
npm install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context

# Storage
npx expo install @react-native-async-storage/async-storage expo-secure-store

# Testing
npm install --save-dev jest @testing-library/react-native @testing-library/react-hooks

# E2E Testing (optional)
npm install --save-dev detox
# or
brew tap facebook/fb && brew install maestro
```

## 🎨 Theme Setup

Create a theme file based on the constants used in examples:

```typescript
// theme/index.ts
export const COLORS = { /* from examples */ };
export const SPACING = { /* from examples */ };
export const TYPOGRAPHY = { /* from examples */ };
```

## ✅ Checklist for New Components

- [ ] TypeScript interfaces defined for all props
- [ ] Proper import organization
- [ ] useCallback for event handlers passed to children
- [ ] useMemo for expensive calculations
- [ ] React.memo for list items
- [ ] Styles using StyleSheet.create at bottom
- [ ] Accessibility: minimum 44x44 touch targets
- [ ] Platform-specific code when needed
- [ ] Error boundaries for error handling
- [ ] Tests written covering main functionality
- [ ] Safe area handling for screens
- [ ] Loading and error states

## 📖 Additional Resources

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Testing Library](https://callstack.github.io/react-native-testing-library/)
- [Agent OS Documentation](https://buildermethods.com/agent-os)
