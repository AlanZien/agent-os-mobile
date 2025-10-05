# Development Best Practices

## Context

Global development guidelines for Agent OS mobile projects (React Native + Expo).

<conditional-block context-check="core-principles">
IF this Core Principles section already read in current context:
  SKIP: Re-reading this section
  NOTE: "Using Core Principles already in context"
ELSE:
  READ: The following principles

## Core Principles

### Keep It Simple
- Implement code in the fewest lines possible
- Avoid over-engineering solutions
- Choose straightforward approaches over clever ones
- Prefer Expo managed workflow over bare React Native when possible

### Optimize for Readability
- Prioritize code clarity over micro-optimizations
- Write self-documenting code with clear variable names
- Add comments for "why" not "what"
- Use TypeScript for type safety and better developer experience

### DRY (Don't Repeat Yourself)
- Extract repeated business logic to custom hooks
- Extract repeated UI markup to reusable components
- Create utility functions for common operations
- Use component composition over props drilling

### File Structure
- Keep files focused on a single responsibility
- Group related functionality together (feature-based structure)
- Use consistent naming conventions (PascalCase for components, camelCase for functions)
- Organize by: screens/, components/, hooks/, utils/, services/, types/
</conditional-block>

<conditional-block context-check="mobile-specific-practices">
IF this Mobile-Specific Practices section already read in current context:
  SKIP: Re-reading this section
  NOTE: "Using Mobile Practices already in context"
ELSE:
  READ: The following mobile practices

## Mobile-Specific Best Practices

### Performance Optimization
- Use FlatList/SectionList for long lists, never ScrollView with .map()
- Implement proper list item memoization with React.memo()
- Use useCallback and useMemo to prevent unnecessary re-renders
- Optimize images with proper sizes and formats (WebP when possible)
- Lazy load screens and heavy components with React.lazy() and Suspense
- Avoid inline function definitions in render methods
- Use Hermes JavaScript engine for better performance

### Navigation
- Use typed navigation with TypeScript for type-safe routing
- Implement deep linking for all important screens
- Handle back button properly on Android
- Use stack navigators for hierarchical flows
- Use tab/drawer navigators for primary navigation
- Prefetch data for next screens when possible

### State Management
- Start with React Context API for simple global state
- Upgrade to Zustand/Redux only when needed
- Keep async logic in custom hooks or services
- Use React Query/TanStack Query for server state
- Persist critical state with AsyncStorage/SecureStore
- Never store sensitive data in AsyncStorage (use SecureStore)

### Platform Differences
- Always test on both iOS and Android
- Use Platform.select() for platform-specific code
- Handle safe areas properly with SafeAreaView
- Respect platform-specific design patterns (iOS vs Material Design)
- Test different screen sizes and orientations
- Handle keyboard properly with KeyboardAvoidingView

### Data Handling
- Implement offline-first architecture when possible
- Cache API responses appropriately
- Handle network errors gracefully with retry logic
- Show loading states and skeleton screens
- Implement pull-to-refresh for list screens
- Validate all user inputs before API calls

### User Experience
- Provide immediate visual feedback for all interactions
- Use optimistic updates for better perceived performance
- Implement proper error boundaries
- Show meaningful error messages
- Add haptic feedback for important actions (Expo Haptics)
- Support dark mode from the start
- Make all touchable areas at least 44x44 points

### Security
- Never commit API keys or secrets to version control
- Use environment variables for configuration (Expo Constants)
- Store sensitive data in SecureStore only
- Implement proper authentication token refresh
- Validate all API responses
- Use HTTPS for all network requests
- Implement certificate pinning for critical apps
</conditional-block>

<conditional-block context-check="dependencies" task-condition="choosing-external-library">
IF current task involves choosing an external library:
  IF Dependencies section already read in current context:
    SKIP: Re-reading this section
    NOTE: "Using Dependencies guidelines already in context"
  ELSE:
    READ: The following guidelines
ELSE:
  SKIP: Dependencies section not relevant to current task

## Dependencies

### Choose Libraries Wisely
When adding third-party dependencies:
- Prefer Expo-compatible libraries (check Expo docs first)
- Select the most popular and actively maintained option
- Check the library's GitHub repository for:
  - React Native compatibility (not just React)
  - Expo compatibility (if using managed workflow)
  - Recent commits (within last 6 months)
  - Active issue resolution
  - Number of stars/downloads
  - iOS and Android support
  - TypeScript support
  - Clear documentation
- Verify library doesn't require native code changes (if using Expo Go)
- Check bundle size impact with expo-analyze
</conditional-block>

<conditional-block context-check="testing-practices">
IF this Testing Practices section already read in current context:
  SKIP: Re-reading this section
  NOTE: "Using Testing Practices already in context"
ELSE:
  READ: The following testing practices

## Testing Best Practices

### Unit Testing
- Test custom hooks with @testing-library/react-hooks
- Test utility functions and services thoroughly
- Mock external dependencies and API calls
- Aim for 80%+ code coverage on business logic

### Component Testing
- Use React Native Testing Library for component tests
- Test user interactions, not implementation details
- Test accessibility labels and roles
- Verify correct rendering for different states
- Mock navigation and platform-specific code

### Integration Testing
- Test complete user flows
- Test navigation between screens
- Test data persistence and retrieval
- Test API integration with mock servers

### E2E Testing
- Use Detox or Maestro for critical user journeys
- Test on both iOS and Android
- Test on different device sizes
- Automate regression testing
- Run E2E tests before releases
</conditional-block>
