# YAML Configuration Files - Mobile Adaptations

This document details all YAML/YML configuration file changes made for Agent OS Mobile.

## ✅ Files Modified

### 1. `config.yml` - Main Configuration

**Location:** Root directory

**Changes:**
```yaml
# Before:
# Agent OS Configuration
agent_os_version: 1.4.1

# After:
# Agent OS Mobile Configuration
# React Native + Expo Edition
agent_os_version: Mobile-1.0.0
agent_os_base_version: 1.4.1
```

**Purpose:**
- Clearly identify this as the mobile edition
- Track both mobile version and base Agent OS version
- Update documentation references

---

### 2. `.github/workflows/pr-decline.yml` - PR Auto-decline Workflow

**Changes:**

#### Environment Variables:
```yaml
# Before: Hardcoded URLs
IDEAS_URL: https://github.com/buildermethods/agent-os/discussions/categories/ideas
CONTRIBUTING_URL: https://github.com/buildermethods/agent-os/blob/main/.github/CONTRIBUTING.md

# After: Dynamic repository URLs
IDEAS_URL: https://github.com/${{ github.repository }}/discussions/categories/ideas
CONTRIBUTING_URL: https://github.com/${{ github.repository }}/blob/main/.github/CONTRIBUTING.md
ORIGINAL_AGENT_OS: https://github.com/buildermethods/agent-os
```

#### Decline Messages:
```yaml
# Before:
"...isn't on the current roadmap for Agent OS."

# After:
"...isn't on the current roadmap for Agent OS Mobile."
"We keep core focused on React Native + Expo mobile development..."
```

**Purpose:**
- Make workflow portable to any fork/repository
- Clarify this is the mobile edition
- Maintain reference to original Agent OS

---

### 3. `.github/ISSUE_TEMPLATE/config.yml` - Issue Template Configuration

**Major Changes:**

#### Updated Contact Links:
```yaml
# All URLs changed from:
https://github.com/buildermethods/agent-os/...

# To:
https://github.com/YOUR_USERNAME/agent-os-mobile/...
```

#### New Mobile-Specific Links:
```yaml
- name: 📱 Mobile Examples
  url: https://github.com/YOUR_USERNAME/agent-os-mobile/tree/main/examples/react-native-expo
  about: Check out production-ready mobile templates...

- name: 🎯 Original Agent OS (Web)
  url: https://buildermethods.com/agent-os
  about: For web development (Rails/Ruby), use the original Agent OS...
```

#### Updated Descriptions:
```yaml
# Feature requests now mention:
"improvements for React Native + Expo development"

# Questions now mention:
"about mobile development with Agent OS"
```

**Purpose:**
- Direct users to mobile-specific resources
- Provide clear path to original Agent OS for web developers
- Highlight mobile examples
- Make URLs customizable for forks

---

### 4. `.github/SECURITY.yml` - Security Policy

**Changes:**
```yaml
# Before:
Send potential security problems to brian@buildermethods.com

# After:
For security issues specific to Agent OS Mobile (React Native + Expo adaptation):
- Create a private security advisory on this repository

For issues related to the original Agent OS core:
- Contact brian@buildermethods.com
```

**Purpose:**
- Separate mobile-specific security issues from core issues
- Provide appropriate reporting channels
- Maintain connection to original maintainer

---

### 5. `.github/workflows/stale.yml` - Stale Issues Workflow

**Status:** ✅ No changes needed

**Reason:** Generic workflow, works for both web and mobile versions

---

## 📋 Summary of YAML Changes

| File | Change Type | Mobile-Specific |
|------|-------------|-----------------|
| `config.yml` | Modified | ✅ Version tracking |
| `workflows/pr-decline.yml` | Modified | ✅ Mobile messaging |
| `ISSUE_TEMPLATE/config.yml` | Modified | ✅ Mobile examples link |
| `SECURITY.yml` | Modified | ✅ Dual reporting |
| `workflows/stale.yml` | Unchanged | ⚪ Generic |

## 🎯 Key Improvements

1. **Portability**
   - Dynamic repository URLs in workflows
   - Easy to fork and customize
   - No hardcoded paths

2. **Clear Identity**
   - Mobile edition clearly identified
   - Version tracking for both mobile and base
   - References to original Agent OS maintained

3. **User Guidance**
   - Mobile examples prominently featured
   - Clear separation from web version
   - Appropriate support channels

4. **Maintainability**
   - Easy to update for forks
   - Clear security reporting process
   - Preserved original workflows where appropriate

## 🔧 For Fork Maintainers

When forking this repository:

1. **Update URLs in `.github/ISSUE_TEMPLATE/config.yml`:**
   ```yaml
   # Replace YOUR_USERNAME with your GitHub username
   url: https://github.com/YOUR_USERNAME/agent-os-mobile/...
   ```

2. **Verify workflow permissions:**
   - Ensure GitHub Actions are enabled
   - Check Discussions are enabled for the repository

3. **Optional: Customize security policy:**
   - Update `.github/SECURITY.yml` with your contact info
   - Or keep default GitHub security advisories

4. **Version tracking:**
   - Update `config.yml` versions as you make changes
   - Follow semantic versioning (e.g., Mobile-1.1.0, Mobile-2.0.0)

## ✅ Verification Checklist

- [x] All YAML files are valid syntax
- [x] Repository URLs are dynamic (not hardcoded)
- [x] Mobile edition is clearly identified
- [x] Original Agent OS is referenced where appropriate
- [x] Security reporting is clear
- [x] Examples are prominently featured
- [x] Version tracking is in place

---

**Last Updated:** 2025-10-05
**Mobile Version:** Mobile-1.0.0
**Base Version:** 1.4.1
