# AuraFit 🏃‍♂️💪

A personalized, test-driven fitness platform that leverages a modern, type-safe technology stack to provide users with tailored workout and nutrition plans, motivating them to achieve their wellness goals.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development environment
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build
```

## 🛠 Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components (Radix + Tailwind)
- **TanStack Query** - Data fetching and caching
- **React Hook Form + Zod** - Forms and validation

### Backend
- **Firebase Functions** - Serverless backend
- **tRPC** - Type-safe API layer
- **Firestore** - NoSQL database
- **Firebase Auth** - Authentication
- **Firebase Storage** - File storage

### Development Tools
- **PNPM** - Package manager with workspaces
- **Turborepo** - Monorepo build orchestration
- **Storybook** - Component development
- **Vitest + Testing Library** - Unit and component testing
- **Playwright** - End-to-end testing
- **ESLint + Prettier** - Code quality and formatting

## 📁 Project Structure

```
.
├── apps/
│   └── web/              # React frontend (+ Storybook)
├── functions/            # Cloud Functions / tRPC routers
├── packages/
│   ├── shared/           # Zod schemas, utilities, common types
│   └── seeding/          # Data-seeding helpers
├── docs/                 # Project documentation
└── .github/             # CI workflows
```

## 🔧 Development Setup

### Prerequisites
- Node.js 18+
- PNPM 8+
- Firebase CLI

### Environment Setup
1. Clone the repository
2. Install dependencies: `pnpm install`
3. Copy `.env.example` to `.env` and configure your Firebase project
4. Start Firebase emulators: `firebase emulators:start`
5. Start development server: `pnpm dev`

### Firebase Setup
1. Create a new Firebase project
2. Enable Firestore, Functions, Auth, and Storage
3. Update `firebase.json` with your project ID
4. Deploy security rules: `firebase deploy --only firestore:rules`

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run unit tests only
pnpm test:unit

# Run component tests
pnpm test:component

# Run E2E tests
pnpm test:e2e

# Run tests with coverage
pnpm test:coverage
```

## 📚 Documentation

- [Technical Design Document](./docs/technical-design-doc.md)
- [Contributing Guidelines](./docs/CONTRIBUTING.md)
- [API Documentation](./docs/api.md)
- [Component Library](./apps/web/.storybook)

## 🚀 Deployment

### Preview Deployments
Every PR automatically creates a preview deployment on Firebase Hosting.

### Production Deployment
```bash
# Deploy to production
pnpm deploy:prod

# Deploy functions only
pnpm deploy:functions
```

## 🤝 Contributing

1. Create a feature branch from `dev`
2. Follow the [conventional commits](https://www.conventionalcommits.org/) format
3. Write tests for new features
4. Update documentation as needed
5. Submit a pull request

### Branching Strategy
- `main` - Production-ready code
- `dev` - Development branch
- `feature/*` - Feature branches
- `fix/*` - Bug fix branches
- `docs/*` - Documentation updates

## 📊 Key Features

- **Personalized Workout Plans** - AI-driven workout recommendations
- **Nutrition Tracking** - Comprehensive food logging and analysis
- **Progress Visualization** - Charts and insights for goal tracking
- **Community Features** - Social fitness challenges and leaderboards
- **Wearable Integration** - Connect with fitness devices
- **Goal Setting** - SMART goal creation and tracking

## 🎯 Success Metrics

- 80%+ test coverage
- <2s page load times
- 95%+ uptime
- High user engagement and retention

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🆘 Support

- [Issues](https://github.com/your-org/aurafit/issues)
- [Discussions](https://github.com/your-org/aurafit/discussions)
- [Documentation](./docs/)

---

Built with ❤️ by the AuraFit team
