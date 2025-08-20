# 🚀 CI/CD Pipeline Documentation

## Overview

The FitnessApp uses a comprehensive CI/CD pipeline built with GitHub Actions to ensure code quality, security, and reliable deployments. The pipeline is designed to work with our monorepo structure using pnpm and Turbo.

## 🏗️ Pipeline Architecture

### Workflows

1. **`deploy.yml`** - Main deployment pipeline
2. **`pull-request.yml`** - Quality gates for PRs
3. **`release.yml`** - Automated releases

### Environments

- **Staging**: `dev` branch → `fitness-app-bupe-staging`
- **Production**: `main` branch → `fitness-app-bupe-production` (future)
- **Preview**: Pull requests → Preview channels

## 🔄 Workflow Triggers

### Main Deployment Pipeline (`deploy.yml`)

```yaml
on:
  push:
    branches: [ main, dev ]
  pull_request:
    branches: [ main, dev ]
```

**Jobs:**
- **Quality Checks**: Linting, type checking, tests
- **Staging Deployment**: Auto-deploy to staging on `dev` branch
- **Production Deployment**: Manual deployment to production on `main` branch
- **Preview Deployment**: Auto-deploy preview for PRs
- **Security Checks**: Dependency audits and vulnerability scanning
- **Bundle Analysis**: Performance monitoring

### Pull Request Checks (`pull-request.yml`)

```yaml
on:
  pull_request:
    branches: [ main, dev ]
  push:
    branches: [ main, dev ]
```

**Jobs:**
- **Code Quality**: ESLint, TypeScript, Prettier
- **Security**: npm audit, Snyk scanning
- **Build Verification**: Ensures builds succeed
- **Bundle Size**: Prevents oversized bundles
- **Performance**: Lighthouse CI checks
- **Dependency Review**: Security review of dependencies

### Release Pipeline (`release.yml`)

```yaml
on:
  push:
    tags:
      - 'v*'
```

**Jobs:**
- **Release Creation**: Automated GitHub releases
- **Asset Upload**: Build artifacts for releases

## 🛠️ Setup Instructions

### 1. Repository Secrets

Configure these secrets in your GitHub repository settings:

```bash
# Firebase Service Accounts
FIREBASE_SERVICE_ACCOUNT_FITNESS_APP_BUPE_STAGING
FIREBASE_SERVICE_ACCOUNT_FITNESS_APP_BUPE_PRODUCTION

# Security Scanning
SNYK_TOKEN

# Optional: Code Coverage
CODECOV_TOKEN
```

### 2. Firebase Service Account Setup

1. Go to Firebase Console → Project Settings → Service Accounts
2. Generate new private key
3. Add the JSON content as a GitHub secret

### 3. Environment Protection Rules

Set up environment protection for production:

1. Go to Settings → Environments
2. Create `production` environment
3. Add required reviewers
4. Enable deployment branch policies

## 📋 Quality Gates

### Code Quality
- ✅ ESLint passes with no errors
- ✅ TypeScript compilation succeeds
- ✅ Prettier formatting is correct
- ✅ All tests pass
- ✅ Minimum 80% test coverage

### Security
- ✅ No high/critical vulnerabilities
- ✅ Dependencies are up to date
- ✅ Snyk security scan passes
- ✅ Dependency review approved

### Performance
- ✅ Bundle size under 1MB
- ✅ Lighthouse performance score > 90
- ✅ Lighthouse accessibility score > 90
- ✅ Lighthouse best practices score > 90

### Build
- ✅ Application builds successfully
- ✅ No build warnings
- ✅ All assets generated correctly

## 🚀 Deployment Process

### Staging Deployment (Automatic)

1. Push to `dev` branch
2. Quality checks run automatically
3. If all checks pass, deploy to staging
4. Staging URL: https://fitness-app-bupe-staging.web.app

### Production Deployment (Manual)

1. Create pull request from `dev` to `main`
2. All quality gates must pass
3. Get approval from required reviewers
4. Merge to `main` branch
5. Production deployment triggers automatically

### Preview Deployments

1. Create pull request
2. Preview deployment runs automatically
3. Get preview URL in PR comments
4. Preview URL format: `https://fitness-app-bupe-staging--pr-{PR_NUMBER}.web.app`

## 📊 Monitoring and Analytics

### Build Metrics
- Build time tracking
- Bundle size monitoring
- Test coverage reports
- Performance metrics

### Deployment Status
- Deployment success/failure rates
- Rollback capabilities
- Environment health monitoring

### Security Monitoring
- Vulnerability alerts
- Dependency update notifications
- Security scan results

## 🔧 Local Development

### Pre-commit Hooks

Install pre-commit hooks to catch issues early:

```bash
# Install pre-commit
pip install pre-commit

# Install hooks
pre-commit install

# Run all hooks
pre-commit run --all-files
```

### Local Quality Checks

```bash
# Run all quality checks locally
pnpm lint
pnpm type-check
pnpm test
pnpm format:check
pnpm audit

# Build verification
pnpm build
```

### Local Performance Testing

```bash
# Build with analysis
pnpm build:analyze

# Run Lighthouse locally
npx lighthouse http://localhost:3000 --output html
```

## 🚨 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache and reinstall
pnpm clean
pnpm install

# Check for TypeScript errors
pnpm type-check

# Verify dependencies
pnpm audit
```

#### Deployment Failures
1. Check Firebase service account permissions
2. Verify project ID configuration
3. Check Firebase CLI version compatibility
4. Review deployment logs in GitHub Actions

#### Performance Issues
1. Run bundle analysis: `pnpm build:analyze`
2. Check for large dependencies
3. Review code splitting implementation
4. Optimize images and assets

### Debug Commands

```bash
# Debug build process
pnpm build --debug

# Check bundle contents
npx vite-bundle-analyzer apps/web/dist

# Test specific components
pnpm test --run ComponentName

# Check environment variables
echo $FIREBASE_PROJECT_ID
```

## 📈 Best Practices

### Code Quality
- Write comprehensive tests
- Use TypeScript strictly
- Follow ESLint rules
- Keep functions small and focused
- Document complex logic

### Performance
- Lazy load components
- Optimize images
- Minimize bundle size
- Use code splitting
- Monitor performance metrics

### Security
- Keep dependencies updated
- Use security scanning tools
- Follow OWASP guidelines
- Implement proper authentication
- Validate all inputs

### Deployment
- Use feature flags for rollouts
- Implement health checks
- Monitor error rates
- Set up alerts
- Plan rollback strategies

## 🔄 Continuous Improvement

### Pipeline Optimization
- Monitor build times
- Optimize caching strategies
- Parallelize jobs where possible
- Use latest GitHub Actions versions

### Quality Enhancement
- Increase test coverage
- Add more security checks
- Implement performance budgets
- Add accessibility testing

### Monitoring Enhancement
- Set up error tracking
- Implement user analytics
- Add performance monitoring
- Create dashboards

## 📞 Support

For CI/CD pipeline issues:

1. Check GitHub Actions logs
2. Review this documentation
3. Check Firebase documentation
4. Create an issue in the repository

## 🔗 Useful Links

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Firebase Hosting Documentation](https://firebase.google.com/docs/hosting)
- [Turbo Documentation](https://turbo.build/repo/docs)
- [pnpm Documentation](https://pnpm.io/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Snyk Documentation](https://docs.snyk.io/)

---

**Last Updated**: $(date)
**Pipeline Version**: 2.0.0
**Maintainer**: BUPE-NONDO
