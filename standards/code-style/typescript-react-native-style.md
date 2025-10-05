# TypeScript & React Native Style Guide

## TypeScript Best Practices

### Type Definitions
- Always define explicit types for function parameters and return values
- Use interfaces for object shapes that may be extended
- Use types for unions, intersections, and complex type compositions
- Export all reusable types from a dedicated `types/` directory
- Use `readonly` for props that shouldn't be mutated
- Avoid using `any` - use `unknown` if type is truly unknown

### Component Props
```typescript
// Good: Explicit prop types with interface
interface IButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<IButtonProps> = ({ title, onPress, disabled, variant = 'primary' }) => {
  // Component implementation
};
```

### Navigation Types
- Always define typed navigation parameters
- Use type-safe navigation hooks
```typescript
// types/navigation.ts
export type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Settings: undefined;
};

// In component
import { NativeStackScreenProps } from '@react-navigation/native-stack';
type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;
```

### Custom Hooks
- Return typed values from custom hooks
- Define clear return types
```typescript
interface IUseAuthReturn {
  user: IUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = (): IUseAuthReturn => {
  // Hook implementation
};
```

### API Response Types
- Define types for all API responses
- Use discriminated unions for different response states
```typescript
type ApiResponse<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };
```

## React Native Component Patterns

### Functional Components
- Use functional components with hooks (no class components)
- Use `React.FC` for simple components or explicit prop destructuring
```typescript
// Preferred approach
export const UserCard: React.FC<IUserCardProps> = ({ user, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{user.name}</Text>
    </TouchableOpacity>
  );
};
```

### Component Structure
```typescript
// 1. Imports (organized as per code-style.md)
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// 2. Type definitions
interface IMyComponentProps {
  // props
}

// 3. Component
export const MyComponent: React.FC<IMyComponentProps> = ({ prop1 }) => {
  // 4. Hooks (useState, useEffect, custom hooks)
  const [state, setState] = useState('');

  // 5. Event handlers
  const handlePress = () => {
    // handler logic
  };

  // 6. Render helpers (if needed)
  const renderItem = () => {
    return <Text>Item</Text>;
  };

  // 7. Main return
  return (
    <View style={styles.container}>
      <Text>{state}</Text>
    </View>
  );
};

// 8. Styles at the bottom
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```

### Hooks Usage
- Call hooks at the top level only
- Use `useCallback` for functions passed as props
- Use `useMemo` for expensive calculations
- Create custom hooks for reusable logic
```typescript
// Good: Memoized callbacks
const handlePress = useCallback(() => {
  navigation.navigate('Details', { id: item.id });
}, [navigation, item.id]);

// Good: Memoized expensive calculations
const sortedData = useMemo(() => {
  return data.sort((a, b) => a.name.localeCompare(b.name));
}, [data]);
```

### Performance Optimization
```typescript
// Memoize list items
const UserListItem = React.memo<IUserListItemProps>(({ user, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(user.id)}>
      <Text>{user.name}</Text>
    </TouchableOpacity>
  );
});

// Use FlatList with proper key extraction
<FlatList
  data={users}
  renderItem={({ item }) => <UserListItem user={item} onPress={handleUserPress} />}
  keyExtractor={(item) => item.id}
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={5}
/>
```

### Error Boundaries
- Wrap screens in error boundaries
- Create reusable error boundary component
```typescript
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
```

### Platform-Specific Code
```typescript
import { Platform, StyleSheet } from 'react-native';

// For small differences
const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
});

// For larger differences
const ComponentVariant = Platform.select({
  ios: ComponentIOS,
  android: ComponentAndroid,
  default: ComponentDefault,
});

// For file-level differences, use .ios.tsx and .android.tsx extensions
```

### Constants and Enums
```typescript
// Use const objects for related constants
export const COLORS = {
  PRIMARY: '#007AFF',
  SECONDARY: '#5856D6',
  ERROR: '#FF3B30',
  SUCCESS: '#34C759',
} as const;

// Use enums for state machines
export enum AuthState {
  Idle = 'IDLE',
  Loading = 'LOADING',
  Authenticated = 'AUTHENTICATED',
  Error = 'ERROR',
}
```

### Async Operations
```typescript
// Good: Properly typed async function
const fetchUser = async (userId: string): Promise<IUser> => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

// Good: Error handling with TypeScript
try {
  const user = await fetchUser(userId);
  setUser(user);
} catch (error) {
  if (error instanceof Error) {
    setError(error.message);
  }
}
```

### Avoid These Patterns
```typescript
// Bad: Inline styles
<View style={{ flex: 1, padding: 20 }} />

// Bad: Functions in render without useCallback
<Button onPress={() => handlePress(item.id)} />

// Bad: Any type usage
const data: any = response.data;

// Bad: Non-null assertions
const user = users.find(u => u.id === id)!;

// Good alternatives
const styles = StyleSheet.create({ container: { flex: 1, padding: 20 } });
const handlePress = useCallback((id: string) => {}, []);
const data: IApiResponse = response.data;
const user = users.find(u => u.id === id);
if (!user) return null;
```
