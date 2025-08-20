# 🚀 Complete CI/CD Setup Guide

This guide will help you set up the complete CI/CD pipeline for the FitTrack app with all necessary secrets and configurations.

## 📋 Prerequisites

- GitHub repository: `https://github.com/BUPE-NONDO/fitnessapp`
- Firebase CLI installed: `npm install -g firebase-tools`
- Google Cloud CLI (optional, for automatic service account generation)

## 🔥 Quick Setup (Automated)

### Step 1: Run the Setup Script

```bash
# Make sure you're in the project root
cd /home/bupe/FitnessApp

# Run the automated setup script
./scripts/setup-firebase-projects.sh
```

This script will:
- ✅ Create Firebase projects (staging & production)
- ✅ Initialize Firebase hosting
- ✅ Generate service account keys (if gcloud is available)
- ✅ Provide next steps

### Step 2: Set Up GitHub Secrets

1. **Go to GitHub Repository Settings**
   - Visit: https://github.com/BUPE-NONDO/fitnessapp/settings/secrets/actions
   - Click **New repository secret**

2. **Add Staging Secret**
   - **Name**: `FIREBASE_SERVICE_ACCOUNT_FITNESS_APP_BUPE_STAGING`
   - **Value**: Copy the entire content of `staging-service-account.json`
   - Click **Add secret**

3. **Add Production Secret**
   - **Name**: `FIREBASE_SERVICE_ACCOUNT_FITNESS_APP_BUPE_PRODUCTION`
   - **Value**: Copy the entire content of `production-service-account.json`
   - Click **Add secret**

### Step 3: Set Up Environment Protection

1. **Create Production Environment**
   - Go to: https://github.com/BUPE-NONDO/fitnessapp/settings/environments
   - Click **New environment**
   - **Name**: `production`
   - **Protection rules**: Enable "Required reviewers" (optional)
   - Click **Configure environment**

## 🔧 Manual Setup (If Script Fails)

### Step 1: Create Firebase Projects

```bash
# Login to Firebase
firebase login

# Create staging project
firebase projects:create fitness-app-bupe-staging --display-name "FitTrack Staging"

# Create production project
firebase projects:create fitness-app-bupe-production --display-name "FitTrack Production"
```

### Step 2: Generate Service Accounts

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/
   - Select project: `fitness-app-bupe-staging`

2. **Create Service Account**
   - Go to **Project Settings** → **Service accounts**
   - Click **Generate new private key**
   - Save as `staging-service-account.json`

3. **Repeat for Production**
   - Switch to `fitness-app-bupe-production`
   - Generate another service account key
   - Save as `production-service-account.json`

### Step 3: Add to GitHub Secrets

Follow the same steps as in the automated setup above.

## 🧪 Test the CI/CD Pipeline

### Test Staging Deployment

```bash
# Make sure you're on dev branch
git checkout dev

# Make a small change
echo "# Test CI/CD" >> README.md

# Commit and push
git add README.md
git commit -m "🧪 Test CI/CD pipeline"
git push origin dev
```

### Check GitHub Actions

1. Go to: https://github.com/BUPE-NONDO/fitnessapp/actions
2. You should see the workflow running
3. Check that all jobs pass:
   - ✅ Quality Checks
   - ✅ Deploy to Staging
   - ✅ Security Checks
   - ✅ Bundle Analysis

### Verify Deployment

- **Staging URL**: https://fitness-app-bupe-staging.web.app
- **Production URL**: https://fitness-app-bupe-production.web.app

## 🔄 Branch Strategy

### Development Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes
# ... your code changes ...

# Commit and push
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature

# Create Pull Request
# This will trigger preview deployment
```

### Deployment Flow

- **`dev` branch** → Automatic staging deployment
- **`main` branch** → Automatic production deployment (with protection)
- **Pull Requests** → Preview deployment for testing

## 🛠️ Troubleshooting

### Common Issues

1. **"Service account not found"**
   - Verify secret names are exactly correct
   - Check JSON content is valid
   - Ensure service account has proper permissions

2. **"Permission denied"**
   - Check Firebase project permissions
   - Verify service account is enabled
   - Ensure project ID matches

3. **"Environment not found"**
   - Verify environment name is exactly `production`
   - Check environment is properly configured

### Debug Commands

```bash
# Test Firebase connection
firebase login
firebase projects:list

# Test local build
pnpm build

# Test local deployment
firebase deploy --only hosting
```

## 📊 Monitoring

### GitHub Actions Dashboard
- https://github.com/BUPE-NONDO/fitnessapp/actions

### Firebase Console
- Staging: https://console.firebase.google.com/project/fitness-app-bupe-staging/hosting
- Production: https://console.firebase.google.com/project/fitness-app-bupe-production/hosting

## 🎉 Success Indicators

You'll know everything is working when:

1. ✅ Push to `dev` triggers staging deployment
2. ✅ Push to `main` triggers production deployment
3. ✅ Pull requests create preview deployments
4. ✅ All GitHub Actions jobs pass
5. ✅ Apps are accessible at Firebase hosting URLs

## 📚 Additional Resources

- **Detailed Setup Guide**: `docs/github-secrets-setup.md`
- **Branching Strategy**: `BRANCHING_STRATEGY.md`
- **CI/CD Documentation**: `docs/ci-cd-pipeline.md`

---

**🎯 Next Steps**: Once CI/CD is working, you can start developing features using the branching strategy!
