# 🚀 Quick Start Guide - FitTrack Branching Strategy

## 🌿 Branch Structure Overview

```
main (Production)
├── dev (Development)
│   ├── feature/data-persistence
│   ├── feature/workout-tracking
│   ├── feature/progress-charts
│   └── feature/mobile-optimization
└── staging (Pre-production)
```

## ⚡ Quick Commands

### **Start a New Feature**
```bash
./scripts/git-workflow.sh start-feature <feature-name>
```

**Example:**
```bash
./scripts/git-workflow.sh start-feature user-authentication
```

### **Finish a Feature**
```bash
./scripts/git-workflow.sh finish-feature <feature-name>
```

**Example:**
```bash
./scripts/git-workflow.sh finish-feature user-authentication
```

### **Clean Up After Merge**
```bash
./scripts/git-workflow.sh cleanup-feature <feature-name>
```

### **Check Status**
```bash
./scripts/git-workflow.sh status
```

### **View All Branches**
```bash
./scripts/git-workflow.sh branches
```

## 📋 Standard Workflow

### **1. Start Feature Development**
```bash
# Start a new feature
./scripts/git-workflow.sh start-feature my-new-feature

# Make your changes
# ... code, code, code ...

# Commit your changes
git add .
git commit -m "feat: add new feature description"
```

### **2. Finish Feature**
```bash
# Prepare feature for merge
./scripts/git-workflow.sh finish-feature my-new-feature

# Push to remote
git push origin feature/my-new-feature

# Create Pull Request on GitHub: feature/my-new-feature → dev
```

### **3. After Merge**
```bash
# Clean up the feature branch
./scripts/git-workflow.sh cleanup-feature my-new-feature
```

## 🚨 Emergency Hotfix

### **Start Hotfix**
```bash
./scripts/git-workflow.sh start-hotfix critical-bug-fix
```

### **Finish Hotfix**
```bash
./scripts/git-workflow.sh finish-hotfix critical-bug-fix
```

## 📝 Commit Message Format

Follow **Conventional Commits**:

```bash
git commit -m "feat: add user authentication system"
git commit -m "fix: resolve login validation issue"
git commit -m "docs: update README with new features"
git commit -m "style: format code with prettier"
git commit -m "refactor: simplify goal calculation logic"
git commit -m "test: add unit tests for user service"
git commit -m "chore: update dependencies"
```

## 🎯 Branch Types

| Type | Naming | Purpose |
|------|--------|---------|
| **Feature** | `feature/description` | New features and enhancements |
| **Bugfix** | `bugfix/description` | Bug fixes and patches |
| **Hotfix** | `hotfix/description` | Critical production fixes |
| **Release** | `release/version` | Release preparation |

## 🔄 Branch Lifecycle

```
dev → feature/new-feature → dev → staging → main
```

1. **Create** feature branch from `dev`
2. **Develop** your feature
3. **Merge** feature back to `dev`
4. **Test** in staging environment
5. **Release** to production (`main`)

## 🛡️ Protection Rules

- **main**: Protected - requires PR reviews
- **dev**: Protected - requires PR reviews
- **staging**: Protected - requires PR reviews
- **feature branches**: Unprotected - direct pushes allowed

## 📚 Full Documentation

For complete details, see:
- **[BRANCHING_STRATEGY.md](./BRANCHING_STRATEGY.md)** - Comprehensive branching strategy
- **[README.md](./README.md)** - Project overview and setup

## 🆘 Need Help?

```bash
# Show help
./scripts/git-workflow.sh help

# Check current status
./scripts/git-workflow.sh status

# View all branches
./scripts/git-workflow.sh branches
```

---

**Happy Coding! 🚀**
