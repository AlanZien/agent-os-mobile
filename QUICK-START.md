# 🚀 Quick Start - Agent OS Mobile

Get started with Agent OS for React Native + Expo in minutes!

## ✅ Prerequisites

- React Native + Expo project initialized
- Claude Code, Cursor, or another AI coding assistant
- Node.js 22+ installed

## 📦 Installation

### Step 1: Copy Agent OS Mobile to your project

```bash
cd your-react-native-project

# Clone or copy this repository as .agent-os
git clone https://github.com/your-repo/agent-os-mobile .agent-os

# Or manually copy the folder
cp -r /path/to/agent-os-mobile .agent-os
```

### Step 2: Review the standards

Open and review these key files:

1. **Tech Stack:** `.agent-os/standards/tech-stack.md`
   - Verify it matches your project's choices
   - Update versions and libraries as needed

2. **Best Practices:** `.agent-os/standards/best-practices.md`
   - Review mobile-specific patterns
   - Add your project's conventions

3. **Code Style:** `.agent-os/standards/code-style.md`
   - Check naming conventions
   - Adjust if needed for your team

### Step 3: Configure for your AI assistant

#### For Claude Code:

```bash
# Enable Claude Code in config
sed -i '' 's/enabled: false/enabled: true/' .agent-os/config.yml
```

#### For Cursor:

```bash
# Enable Cursor in config
sed -i '' '/cursor:/,/enabled:/ s/enabled: false/enabled: true/' .agent-os/config.yml
```

## 🎯 First Feature with Agent OS

### 1. Create Product Documentation

Ask your AI assistant:

```
@.agent-os/instructions/core/plan-product.md

I'm building a [YOUR_APP_DESCRIPTION].
Key features: [FEATURE_1], [FEATURE_2], [FEATURE_3]
Target users: [YOUR_USERS]
```

This creates:
- `.agent-os/product/mission.md` - Product vision
- `.agent-os/product/mission-lite.md` - Condensed version
- `.agent-os/product/tech-stack.md` - Your tech stack
- `.agent-os/product/roadmap.md` - Development phases

### 2. Create Your First Feature Spec

Ask your AI assistant:

```
@.agent-os/instructions/core/create-spec.md

I want to build [FEATURE_NAME] that allows users to [FUNCTIONALITY].
It should include [SPECIFIC_REQUIREMENTS].
```

This creates a spec folder with:
- `spec.md` - Feature requirements
- `spec-lite.md` - Summary
- `sub-specs/technical-spec.md` - Technical details
- `sub-specs/api-spec.md` - API design (if applicable)

### 3. Generate Tasks

After reviewing the spec:

```
@.agent-os/instructions/core/create-tasks.md
```

This creates `tasks.md` with a TDD task breakdown.

### 4. Execute Tasks

Start building:

```
@.agent-os/instructions/core/execute-tasks.md
```

The AI will:
1. ✅ Write tests first (TDD)
2. ✅ Implement features
3. ✅ Run tests
4. ✅ Create git commits
5. ✅ Generate PR
6. ✅ Create recap document

## 📚 Example Templates

Explore production-ready examples:

```bash
# View example files
ls .agent-os/examples/react-native-expo/

# Files:
# - Screen.example.tsx         - Complete screen with navigation
# - Component.example.tsx      - Reusable UI components
# - CustomHook.example.tsx     - 6 production-ready hooks
# - Test.example.test.tsx      - Comprehensive test examples
# - README.md                  - Detailed documentation
```

## 🎨 Using the Examples

### Creating a new screen:

1. Copy the screen template:
```typescript
// Reference: .agent-os/examples/react-native-expo/Screen.example.tsx
```

2. Ask AI to adapt it:
```
Create a UserProfile screen based on .agent-os/examples/react-native-expo/Screen.example.tsx
that shows user data and allows editing
```

### Creating a custom hook:

```
Create a useLocationTracking hook based on the patterns in
.agent-os/examples/react-native-expo/CustomHook.example.tsx
```

## 🧪 Testing Strategy

Agent OS Mobile enforces TDD:

1. **Write tests first** - Every task starts with test creation
2. **Implement feature** - Make tests pass
3. **Verify** - Run full test suite

Example test commands (from examples):
```bash
# Unit tests
npm test

# Watch mode
npm test -- --watch

# Coverage
npm test -- --coverage

# E2E (Detox)
detox test --configuration ios.sim.debug

# E2E (Maestro)
maestro test .maestro/flow.yaml
```

## 📱 Platform Testing Checklist

For every feature, test on:

- [ ] iOS Simulator (multiple screen sizes)
- [ ] Android Emulator (multiple devices)
- [ ] Light mode
- [ ] Dark mode
- [ ] Offline behavior (if applicable)
- [ ] Performance (FlatList, images, etc.)

## 🔧 Common Workflows

### Starting a new feature:

```
@.agent-os/instructions/core/create-spec.md

Build [FEATURE] for [USE_CASE]
```

### Continuing existing work:

```
@.agent-os/instructions/core/execute-tasks.md

Continue with the next task in [SPEC_FOLDER]
```

### Fixing a bug:

```
@.agent-os/instructions/core/create-spec.md

Fix bug: [DESCRIPTION]
Expected: [BEHAVIOR]
Actual: [BUG]
```

## 💡 Pro Tips

1. **Reference examples liberally**
   ```
   Build a login screen similar to .agent-os/examples/react-native-expo/Screen.example.tsx
   ```

2. **Use standards for consistency**
   ```
   Follow .agent-os/standards/typescript-react-native-style.md
   ```

3. **Platform-specific code**
   ```
   Implement this with Platform.select() as shown in best-practices.md
   ```

4. **Offline-first**
   ```
   Make this work offline using patterns from .agent-os/standards/best-practices.md
   ```

## 🎓 Learning Path

### Day 1: Setup
- [ ] Install Agent OS Mobile
- [ ] Review standards
- [ ] Explore examples
- [ ] Create product documentation

### Day 2: First Feature
- [ ] Create feature spec
- [ ] Generate tasks
- [ ] Build feature with AI assistant
- [ ] Review PR

### Day 3: Master Workflows
- [ ] Try different spec types
- [ ] Experiment with sub-agents
- [ ] Customize standards
- [ ] Add project-specific patterns

## 🆘 Troubleshooting

### AI not following patterns?

Reference the specific file:
```
Follow the component structure from .agent-os/standards/code-style/typescript-react-native-style.md
```

### Tests not running?

Check test-runner agent:
```
Use .agent-os/claude-code/agents/test-runner.md to run tests
```

### Want web-focused Agent OS?

Use the original: https://github.com/buildermethods/agent-os

## 📖 Next Steps

1. **Customize standards** for your team
2. **Create example components** specific to your app
3. **Build your first feature** end-to-end
4. **Share learnings** with your team

## 🔗 Resources

- **Examples:** `.agent-os/examples/react-native-expo/README.md`
- **Full adaptation details:** `.agent-os/MOBILE-ADAPTATION.md`
- **Original Agent OS docs:** https://buildermethods.com/agent-os
- **React Native docs:** https://reactnative.dev/
- **Expo docs:** https://docs.expo.dev/

---

**Ready to build?** Start with:
```
@.agent-os/instructions/core/plan-product.md
```

Happy coding! 🚀
