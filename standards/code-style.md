# Code Style Guide

## Context

Global code style rules for Agent OS mobile projects (React Native + Expo).

<conditional-block context-check="general-formatting">
IF this General Formatting section already read in current context:
  SKIP: Re-reading this section
  NOTE: "Using General Formatting rules already in context"
ELSE:
  READ: The following formatting rules

## General Formatting

### Indentation
- Use 2 spaces for indentation (never tabs)
- Maintain consistent indentation throughout files
- Align nested structures for readability
- Configure Prettier for consistent formatting

### Naming Conventions
- **Components**: Use PascalCase (e.g., `UserProfile`, `LoginScreen`)
- **Files**: Match component names - `UserProfile.tsx`, `LoginScreen.tsx`
- **Functions and Variables**: Use camelCase (e.g., `getUserProfile`, `isLoading`)
- **Custom Hooks**: Prefix with `use` (e.g., `useAuth`, `useFetchData`)
- **Constants**: Use UPPER_SNAKE_CASE (e.g., `API_BASE_URL`, `MAX_RETRY_COUNT`)
- **Types/Interfaces**: Use PascalCase with `I` prefix for interfaces or `T` prefix for types (e.g., `IUser`, `TNavigationParams`)
- **Folders**: Use kebab-case (e.g., `user-profile/`, `auth-screens/`)

### String Formatting
- Use single quotes for strings: `'Hello World'`
- Use template literals for interpolation: `` `Hello ${name}` ``
- Use template literals for multi-line strings

### Import Organization
- Group imports in this order:
  1. React and React Native imports
  2. Third-party libraries
  3. Expo imports
  4. Navigation imports
  5. Local components
  6. Hooks
  7. Utils and services
  8. Types
  9. Styles
- Separate groups with blank lines
- Use absolute imports for shared code (configure with tsconfig paths)

### Code Comments
- Add brief comments above non-obvious business logic
- Document complex algorithms or calculations
- Explain the "why" behind implementation choices
- Use JSDoc comments for public functions and components
- Never remove existing comments unless removing the associated code
- Update comments when modifying code to maintain accuracy
- Keep comments concise and relevant
</conditional-block>

<conditional-block task-condition="typescript-react-native" context-check="typescript-style">
IF current task involves writing or updating TypeScript/React Native code:
  IF typescript-react-native-style.md already in context:
    SKIP: Re-reading this file
    NOTE: "Using TypeScript/React Native style guide already in context"
  ELSE:
    <context_fetcher_strategy>
      IF current agent is Claude Code AND context-fetcher agent exists:
        USE: @agent:context-fetcher
        REQUEST: "Get TypeScript and React Native style rules from code-style/typescript-react-native-style.md"
        PROCESS: Returned style rules
      ELSE:
        READ: @.agent-os/standards/code-style/typescript-react-native-style.md
    </context_fetcher_strategy>
ELSE:
  SKIP: TypeScript/React Native style guide not relevant to current task
</conditional-block>

<conditional-block task-condition="styling" context-check="react-native-styling">
IF current task involves writing or updating styles:
  IF react-native-styling.md already in context:
    SKIP: Re-reading this file
    NOTE: "Using React Native styling guide already in context"
  ELSE:
    <context_fetcher_strategy>
      IF current agent is Claude Code AND context-fetcher agent exists:
        USE: @agent:context-fetcher
        REQUEST: "Get React Native styling rules from code-style/react-native-styling.md"
        PROCESS: Returned style rules
      ELSE:
        READ: @.agent-os/standards/code-style/react-native-styling.md
    </context_fetcher_strategy>
ELSE:
  SKIP: React Native styling guide not relevant to current task
</conditional-block>
