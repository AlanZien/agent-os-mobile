# React Native Styling Guide

## StyleSheet Best Practices

### StyleSheet Organization
- Define styles at the bottom of the component file
- Use `StyleSheet.create()` for performance optimization
- Group related styles together
- Name styles descriptively based on their purpose

```typescript
const styles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    padding: 16,
  },

  // Text styles
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
  },

  // Component-specific styles
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
});
```

### Responsive Design
- Use Flexbox for layouts
- Use percentages and flex for responsive sizing
- Use `Dimensions` API carefully (consider orientation changes)
- Consider using libraries like `react-native-responsive-screen`

```typescript
import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1, // Fill available space
  },
  halfWidth: {
    width: '50%', // Responsive width
  },
  imageContainer: {
    width: width * 0.9, // 90% of screen width
    aspectRatio: 16 / 9, // Maintain aspect ratio
  },
});
```

### Layout Patterns

#### Flex Container
```typescript
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

#### Spacing
```typescript
// Use consistent spacing scale
const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    gap: SPACING.sm, // Use gap for spacing between flex children
  },
});
```

### Typography
- Define a consistent type scale
- Use platform-specific defaults when appropriate
- Consider custom fonts loaded via Expo

```typescript
// theme/typography.ts
export const TYPOGRAPHY = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.8,
  },
} as const;

const styles = StyleSheet.create({
  heading: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    lineHeight: TYPOGRAPHY.sizes.xl * TYPOGRAPHY.lineHeights.tight,
  },
  body: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.regular,
    lineHeight: TYPOGRAPHY.sizes.md * TYPOGRAPHY.lineHeights.normal,
  },
});
```

### Color System
- Define colors in a theme file
- Support dark mode from the start
- Use semantic color names

```typescript
// theme/colors.ts
export const COLORS = {
  light: {
    primary: '#007AFF',
    secondary: '#5856D6',
    background: '#FFFFFF',
    surface: '#F2F2F7',
    text: '#000000',
    textSecondary: '#3C3C43',
    border: '#C6C6C8',
    error: '#FF3B30',
    success: '#34C759',
    warning: '#FF9500',
  },
  dark: {
    primary: '#0A84FF',
    secondary: '#5E5CE6',
    background: '#000000',
    surface: '#1C1C1E',
    text: '#FFFFFF',
    textSecondary: '#EBEBF5',
    border: '#38383A',
    error: '#FF453A',
    success: '#30D158',
    warning: '#FF9F0A',
  },
} as const;

// In component with theme context
const styles = (theme: 'light' | 'dark') => StyleSheet.create({
  container: {
    backgroundColor: COLORS[theme].background,
  },
  text: {
    color: COLORS[theme].text,
  },
});
```

### Shadows and Elevation
```typescript
// iOS shadows
const iosShadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
};

// Android elevation
const androidElevation = {
  elevation: 5,
};

// Combined shadow
const styles = StyleSheet.create({
  card: {
    ...Platform.select({
      ios: iosShadow,
      android: androidElevation,
    }),
    backgroundColor: '#FFFFFF',
  },
});

// Or use helper function
const createShadow = (elevation: number) => ({
  ...Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: elevation / 2 },
      shadowOpacity: 0.1 + elevation * 0.03,
      shadowRadius: elevation,
    },
    android: {
      elevation,
    },
  }),
});
```

### Safe Area Handling
```typescript
import { SafeAreaView, StyleSheet } from 'react-native';

// Use SafeAreaView for main containers
<SafeAreaView style={styles.safeArea}>
  <View style={styles.content}>
    {/* Content */}
  </View>
</SafeAreaView>

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.light.background,
  },
  content: {
    flex: 1,
  },
});

// Or use react-native-safe-area-context for more control
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Screen = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Content */}
    </View>
  );
};
```

### Dynamic Styles
```typescript
// Use style functions for dynamic styling
const getButtonStyle = (variant: 'primary' | 'secondary', disabled: boolean) => {
  return [
    styles.button,
    variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
    disabled && styles.disabledButton,
  ];
};

// Use in component
<TouchableOpacity style={getButtonStyle(variant, disabled)}>
  <Text>Button</Text>
</TouchableOpacity>
```

### Styling with NativeWind (Tailwind for RN)
If using NativeWind for Tailwind-like styling:

```typescript
// Good: Utility-first styling
<View className="flex-1 bg-white p-4">
  <Text className="text-2xl font-bold text-gray-900">Title</Text>
  <Text className="text-base text-gray-600 mt-2">Subtitle</Text>
</View>

// Combine with StyleSheet for complex styles
<View className="flex-1" style={styles.customShadow}>
  {/* Content */}
</View>
```

### Performance Considerations
- Use `StyleSheet.create()` to optimize styles (styles are created once)
- Avoid inline styles (creates new object on each render)
- Use `StyleSheet.flatten()` to combine styles when needed
- Memoize dynamic styles with `useMemo`

```typescript
// Bad: Inline style creates new object on every render
<View style={{ flex: 1, padding: 16 }} />

// Good: Created once
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});

// Good: Memoized dynamic styles
const containerStyle = useMemo(() =>
  [styles.container, { backgroundColor: isActive ? 'blue' : 'white' }],
  [isActive]
);
```

### Accessibility
- Use minimum touch target size of 44x44 points
- Ensure sufficient color contrast
- Consider text scaling

```typescript
const styles = StyleSheet.create({
  touchable: {
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    // Allow text scaling
    // Don't use fixed heights for text containers
  },
});
```

### Avoid These Patterns
```typescript
// Bad: Inline styles
<View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }} />

// Bad: Overusing absolute positioning
<View style={{ position: 'absolute', top: 10, left: 10 }}>

// Bad: Hardcoded dimensions everywhere
<View style={{ width: 200, height: 100 }}>

// Bad: Inconsistent spacing
<View style={{ marginTop: 7, marginBottom: 13, marginLeft: 5 }}>

// Good alternatives
const styles = StyleSheet.create({
  container: { flex: 1, padding: SPACING.md, backgroundColor: COLORS.light.background },
  floatingButton: { position: 'absolute', bottom: SPACING.lg, right: SPACING.lg },
  card: { width: '90%', aspectRatio: 2 },
  section: { marginVertical: SPACING.md },
});
```
