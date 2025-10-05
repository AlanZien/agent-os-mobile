# Setup Scripts - Not Applicable for Mobile Edition

⚠️ **Important Notice**

The installation scripts in this directory (`base.sh` and `project.sh`) are from the original Agent OS (Rails/Ruby version) and are **not adapted for React Native + Expo projects**.

## Installation for React Native + Expo Projects

To use Agent OS Mobile in your React Native + Expo project:

### Option 1: Manual Copy (Recommended)

1. Copy this entire `agent-os-mobile` repository into your project as `.agent-os/`:
   ```bash
   cd your-react-native-project
   git clone https://github.com/your-repo/agent-os-mobile .agent-os
   ```

2. Review and customize the standards:
   - `.agent-os/standards/tech-stack.md` - Update for your specific stack choices
   - `.agent-os/standards/best-practices.md` - Add project-specific patterns
   - `.agent-os/standards/code-style.md` - Adjust naming conventions if needed

3. Start using Agent OS workflows with your AI coding assistant

### Option 2: Initialize Project Structure

Manually create the project structure:

```bash
cd your-react-native-project

# Create product documentation directory
mkdir -p .agent-os/product

# Create necessary files
touch .agent-os/product/mission.md
touch .agent-os/product/mission-lite.md
touch .agent-os/product/tech-stack.md
touch .agent-os/product/roadmap.md
```

Then use the `/plan-product` command or `@.agent-os/instructions/core/plan-product.md` to generate your product documentation.

## What You Get

Once installed, you'll have:

- ✅ **Standards** - Mobile-specific tech stack, best practices, and code style
- ✅ **Instructions** - Structured workflows for spec creation and task execution
- ✅ **Agents** - Specialized sub-agents for testing, git workflow, etc.
- ✅ **Examples** - Production-ready templates for screens, components, hooks, and tests
- ✅ **Commands** - Slash commands for your AI coding assistant

## Configuration

After installation, you can configure:

1. **config.yml** - Enable Claude Code or Cursor support
2. **standards/** - Customize for your project's specific needs
3. **examples/** - Reference these when building new features

## Getting Started

Once installed, start with:

1. Create product documentation: `@.agent-os/instructions/core/plan-product.md`
2. Create a feature spec: `@.agent-os/instructions/core/create-spec.md`
3. Execute tasks: `@.agent-os/instructions/core/execute-tasks.md`

## Need the Original Scripts?

The original Rails-focused installation scripts are preserved here for reference, but they are designed to download from the original Agent OS GitHub repository and are not compatible with React Native + Expo projects.

For Rails projects, use the original Agent OS:
https://github.com/buildermethods/agent-os

---

For questions or issues, refer to:
- Main README: `../README.md`
- Examples documentation: `../examples/react-native-expo/README.md`
- Original Agent OS docs: https://buildermethods.com/agent-os
