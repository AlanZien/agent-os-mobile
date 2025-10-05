# Agent OS Mobile - Adaptation Documentation

This document details all the changes made to adapt the original Agent OS (Rails/Ruby) to React Native + Expo mobile development.

## 📋 Summary of Changes

This is a comprehensive fork of [Agent OS](https://buildermethods.com/agent-os) specifically adapted for **React Native + Expo** mobile development. All Rails/Ruby/web references have been replaced with mobile-specific equivalents.

---

## 🔄 Modified Files

### Core Standards

#### 1. `standards/tech-stack.md`
**Before:** Rails, Ruby, PostgreSQL, Vite, TailwindCSS
**After:** React Native, Expo SDK, TypeScript, React Navigation, Jest, Detox, EAS

**Changes:**
- Complete replacement of backend stack with mobile framework
- Added mobile-specific tools (Expo plugins, native modules)
- Included testing frameworks for mobile (Jest, Detox, Maestro)
- Added CI/CD with EAS (Expo Application Services)
- Platform-specific considerations (iOS/Android)

#### 2. `standards/best-practices.md`
**Before:** General web development practices
**After:** Mobile-first development patterns

**Major additions:**
- **Performance Optimization** - FlatList, memoization, Hermes engine
- **Platform Differences** - iOS vs Android patterns
- **Mobile UX** - Touch targets, haptics, dark mode
- **Offline-First** - Data caching, sync strategies
- **Security** - SecureStore, environment variables
- **Testing** - Unit, component, integration, E2E for mobile

#### 3. `standards/code-style.md`
**Before:** Ruby/Rails naming conventions
**After:** TypeScript/React Native conventions

**Changes:**
- PascalCase for components, camelCase for functions
- Import organization for mobile projects
- JSDoc comments for public APIs
- React Native specific patterns

### New Standards Files Created

#### 4. `standards/code-style/typescript-react-native-style.md`
**New file - 180+ lines**

Comprehensive guide covering:
- TypeScript type definitions and interfaces
- Component structure and patterns
- Custom hooks best practices
- Navigation types
- Performance optimization (useCallback, useMemo, React.memo)
- Error boundaries
- Platform-specific code handling
- Common patterns and anti-patterns

#### 5. `standards/code-style/react-native-styling.md`
**New file - 200+ lines**

Complete styling guide including:
- StyleSheet organization and best practices
- Responsive design with Flexbox
- Typography and color systems
- Theme support (light/dark mode)
- Shadows and elevation (iOS/Android)
- Safe area handling
- Dynamic styles
- NativeWind (Tailwind for RN) integration
- Performance considerations

### Deleted Files

#### 6. Removed obsolete web-focused files:
- ❌ `standards/code-style/html-style.md`
- ❌ `standards/code-style/css-style.md`
- ❌ `standards/code-style/javascript-style.md`

These were replaced by the TypeScript/React Native specific guides above.

---

## 📝 Updated Instructions

### 7. `instructions/core/create-spec.md`
**Changes:**
- Expected deliverables: "browser-testable" → "mobile-testable (iOS and Android)"
- Added mobile considerations: platform-specific differences, device sizes, offline behavior
- Technical requirements expanded for mobile: navigation flow, permissions, native modules

### 8. `instructions/core/execute-task.md`
**Changes:**
- Added mobile test commands section:
  - `npm test` for Jest
  - `expo start --ios/--android` for manual testing
  - `detox test` for E2E
  - `maestro test` for E2E flows
- Updated verification step to include both platforms

### 9. `instructions/core/post-execution-tasks.md`
**Changes:**
- "Ready to test in browser" → "Ready to test on mobile"
- Separated iOS and Android testing instructions
- Updated completion summary template for mobile

### 10. `instructions/core/analyze-product.md`
**Changes:**
- Technology stack detection updated:
  - "Gemfile, requirements.txt" → "package.json, app.json, eas.json"
  - Added React Native, Expo, navigation, state management detection

---

## 🤖 Updated Agents

### 11. `claude-code/agents/test-runner.md`
**Major rewrite - 115 lines**

**Before:** Generic Rails test runner
**After:** React Native + Expo specialized test runner

**New sections:**
- Test commands for Jest (unit/component)
- E2E testing with Detox (iOS/Android builds)
- E2E testing with Maestro flows
- TypeScript type checking
- Platform-specific failure analysis
- Mobile-specific output format

### 12. `claude-code/agents/git-workflow.md`
**Changes:**
- Updated description for "Agent OS Mobile"
- Enhanced PR template with mobile checklist:
  - Platform notes (iOS/Android)
  - TypeScript type checking
  - Simulator/emulator testing
  - Build verification
- Added EAS build integration notes (optional)

### 13. `claude-code/agents/context-fetcher.md`
**Changes:**
- Updated examples:
  - "Ruby style rules" → "TypeScript style rules"
  - Added "React Native component patterns"

---

## 📚 Documentation Updates

### 14. `README.md`
**Complete rewrite - 85 lines**

**New README includes:**
- Mobile-first branding
- React Native + Expo focus
- Mobile features highlighted
- Quick start for mobile projects
- Links to mobile examples
- Mobile tech stack summary
- Credits to original Agent OS

### 15. `CHANGELOG.md`
**Changes:**
- Added Mobile-1.0.0 release notes
- Comprehensive list of all mobile adaptations
- Separated from original Agent OS changelog
- Documented all new files and changes

### 16. `setup/README.md`
**New file - 80 lines**

**Purpose:** Explain that setup scripts are not applicable for mobile

**Contents:**
- Warning about incompatible scripts
- Manual installation instructions
- Configuration guidance
- Getting started steps
- Reference to original scripts

---

## 📦 Examples & Templates

### 17. Created `/examples/react-native-expo/` directory

#### New example files:

**`Screen.example.tsx`** - 220 lines
- Complete screen implementation
- Navigation integration
- API data fetching
- FlatList optimization
- Pull-to-refresh
- Loading/error states
- Safe area handling

**`Component.example.tsx`** - 180 lines
- Button component (variants, loading states)
- Card component (elevation)
- Badge component (status indicators)
- Platform-specific shadows
- Accessibility considerations

**`CustomHook.example.tsx`** - 240 lines
Six production-ready hooks:
- `useAuth` - Authentication with SecureStore
- `useFetch` - API calls with retry logic
- `useDebounce` - Value debouncing
- `useForm` - Form state and validation
- `useAsyncStorage` - Persistent state
- `useKeyboard` - Keyboard handling

**`Test.example.test.tsx`** - 200 lines
Comprehensive testing examples:
- Component tests (React Native Testing Library)
- Hook tests (@testing-library/react-hooks)
- Async operation testing
- Navigation mocking
- Integration tests
- E2E tests (Detox examples)

**`README.md`** - 100 lines
- File overview
- Key patterns used
- Usage instructions
- Required dependencies
- Theme setup
- Component checklist
- Additional resources

---

## ⚙️ Configuration Files (YAML)

### 18. `config.yml`
**Changes:**
- Updated header: "Agent OS Mobile Configuration - React Native + Expo Edition"
- Version: Mobile-1.0.0 (with base version 1.4.1 reference)
- Updated documentation links

### 19. `.github/workflows/pr-decline.yml`
**Changes:**
- Dynamic repository URLs (not hardcoded to buildermethods/agent-os)
- Updated "Agent OS" references to "Agent OS Mobile"
- Added React Native + Expo context in messages

### 20. `.github/ISSUE_TEMPLATE/config.yml`
**Changes:**
- Updated all URLs to point to this repository (YOUR_USERNAME/agent-os-mobile)
- Added mobile-specific contact links:
  - 📱 Mobile Examples link
  - 🎯 Original Agent OS (Web) reference
- Updated descriptions to mention React Native + Expo

### 21. `.github/SECURITY.yml`
**Changes:**
- Clarified security reporting for mobile-specific vs core issues
- Added GitHub security advisory option
- Kept reference to original maintainer for core issues

---

## 📊 Statistics

### Lines of Code
- **New files created:** 5 major files + 5 examples = ~1,500 lines
- **Modified files:** 10+ instruction/standard files = ~200 lines modified
- **Deleted files:** 3 obsolete web files = ~100 lines removed

### File Count Changes
- ✅ Created: 10 new files
- ✏️ Modified: 19+ files (including 4 YAML configs)
- ❌ Deleted: 3 files
- ℹ️ Documented: 3 README files

### Coverage
- **Standards:** 100% adapted for mobile
- **Instructions:** 100% reviewed and updated where needed
- **Agents:** 100% adapted for mobile workflows
- **Examples:** New comprehensive mobile template library
- **Documentation:** Complete rewrite for mobile focus

---

## 🎯 What's NOT Changed

These remain generic and work for both web and mobile:

1. **Core workflow structure** - Spec-driven development process
2. **Product planning** (`plan-product.md`, `analyze-product.md`)
3. **Task creation** (`create-tasks.md`)
4. **Execution loop** (`execute-tasks.md` - only test commands updated)
5. **Meta instructions** (`pre-flight.md`, `post-flight.md`)
6. **Commands** - Slash command wrappers
7. **GitHub templates** - PR/issue templates
8. **File creator agent** - Generic file operations
9. **Date checker agent** - Generic date checking
10. **Project manager agent** - Generic project management

---

## 🚀 Usage

This adapted version maintains the same workflow as original Agent OS:

1. **Plan Product:** `@.agent-os/instructions/core/plan-product.md`
2. **Create Spec:** `@.agent-os/instructions/core/create-spec.md`
3. **Create Tasks:** `@.agent-os/instructions/core/create-tasks.md`
4. **Execute Tasks:** `@.agent-os/instructions/core/execute-tasks.md`

**But now with:**
- Mobile-specific tech stack
- iOS/Android platform awareness
- React Native best practices
- Expo tooling integration
- Mobile testing strategies
- Production-ready mobile examples

---

## 🙏 Credits

- **Original Agent OS:** Created by [Brian Casel](https://buildermethods.com) @ Builder Methods
- **Mobile Adaptation:** Comprehensive fork for React Native + Expo development
- **Version:** Mobile-1.0.0 (based on Agent OS 1.4.2)

---

## 📖 Resources

- [Original Agent OS](https://buildermethods.com/agent-os)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Testing Library](https://callstack.github.io/react-native-testing-library/)

---

**Last Updated:** 2025-10-05
**Adaptation Status:** ✅ Complete
