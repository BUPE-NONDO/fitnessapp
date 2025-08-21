TECHNICAL DESIGN DOCUMENT: AuraFit
MY BENEFIT
One‑sentence pitch: AuraFit is a personalized, test-driven fitness platform that leverages a modern, type-safe technology stack to provide users with tailored workout and nutrition plans, motivating them to achieve their wellness goals.

1. OVERVIEW

Goal:

To provide users with a personalized and motivating platform for managing their fitness and nutrition.

To build a highly testable, scalable, and maintainable full-stack application using a modern, type-safe technology stack.

To create an engaging user experience through data-driven insights, goal tracking, and community features.

Key features:

User onboarding and personalized profile creation.

Interactive dashboard with goal setting and progress summaries.

Comprehensive workout and exercise library with custom plan creation.

Intuitive logging for both workouts and nutritional intake.

Data visualization for tracking progress over time.

Integration with wearable devices for automated activity tracking.

Target users & success criteria:

Target Users: Individuals at any stage of their fitness journey, from beginners seeking guidance to experienced athletes optimizing performance.

Success Criteria: High user engagement and retention rates, positive user feedback on personalization and ease of use, and achieving a minimum of 80% test coverage across the application.

2. TECH STACK (GOLDEN PATH)

Category	Technology/Tool
Runtime	Node (Firebase Gen 2 Cloud Functions)
Language	TypeScript (strict)
Front‑end	React + Vite
UI kit	shadcn/ui (Radix + Tailwind source‑copy model)
Styling	Tailwind CSS (design‑token file)
State / data fetching	TanStack Query
Forms & validation	React Hook Form + Zod resolver
Shared validation	Zod (client & server)
API layer	tRPC (typed RPC)
Backend services	Firebase Auth · Firestore · Storage · Functions
Package manager / mono	PNPM workspaces
Build orchestration	Turborepo (remote caching)
Component workshop	Storybook (UI in isolation)
Unit / component tests	Vitest + Testing Library
Visual / interaction	Storybook + @storybook/testing‑library
End‑to‑end tests	Playwright
Linting	ESLint (typescript‑eslint) + eslint‑plugin‑perfectionist
Formatting	Prettier
Type‑safe env vars	T3 Env (Zod‑validated)
Versioning / publishing	Changesets (monorepo changelogs & releases)
CI / CD	GitHub Actions (Turbo‑aware pipeline; see §8)

Export to Sheets
3. MONOREPO LAYOUT (PNPM)

.
├── apps/
│   └── web/              ← React front‑end (+.storybook)
├── functions/            ← Cloud Functions / tRPC routers
├── packages/
│   ├── shared/           ← Zod schemas, utilities, common types
│   └── seeding/          ← Data‑seeding helpers (Firestore emulator/Admin SDK)
├── docs/                 ← Project docs (this TDD, ADRs, API notes)
└──.github/              ← CI workflows
4. ARCHITECTURE

The system architecture is designed for simplicity, type-safety, and scalability, leveraging the Firebase ecosystem.

Client (React + TanStack Query) ⇄ tRPC HTTPS endpoints (Cloud Functions)

tRPC handlers read/write Firestore documents and interact with Storage.

The frontend, built with React and Vite, communicates with the backend via tRPC. This provides end-to-end type safety without requiring code generation, as the client can directly import the type definitions of the API router. All backend logic is encapsulated within Firebase Cloud Functions, which serve as the tRPC API endpoints. These functions handle business logic and interact directly with Firebase services like Firestore for data persistence and Firebase Storage for file storage (e.g., user profile images).

5. DATA MODEL

The data will be stored in Cloud Firestore, a NoSQL document database. This model is chosen for its scalability, real-time capabilities, and seamless integration with Firebase Functions and Auth.

Entity	Key fields	Notes
User	uid, email, displayName, photoURL	Stored in the users collection; uid links to Firebase Auth.
UserProfile	heightCm, weightKg, goals (JSON)	Sub-collection under a User document.
Workout	userId, name, startedAt	Stored in a top-level workouts collection.
WorkoutSet	exerciseId, reps, weightKg	Stored as an array of objects within a Workout document.
Exercise	name, videoUrl, muscleGroup	Stored in a top-level exercises collection for the master list.
NutritionLog	userId, foodName, calories, proteinG, loggedAt	Stored in a top-level nutrition_logs collection.

Export to Sheets
Security rules: Firestore security rules will be implemented to enforce the principle of least privilege. For example, users will only be able to read and write their own UserProfile, Workout, and NutritionLog documents.

Index strategy: Composite indexes will be created in Firestore to support complex queries required for reporting and analytics, such as querying a user's workouts within a specific date range, sorted by start time.

6. API DESIGN (tRPC)

The API is structured around tRPC routers, with Zod used for robust input validation.

Router	Procedure	Input (Zod schema)	Output
user	getProfile	z.void()	{ id, name, email, profile }
user	updateProfile	z.object({ heightCm: z.number(),... })	{ success: true }
workout	log	z.object({ name: z.string(), sets: z.array(...) })	{ workoutId: string }
workout	getHistory	z.object({ limit: z.number().optional() })	Array<{ id, name, startedAt }>
dashboard	getStats	z.object({ period: z.enum(['7d', '30d']) })	{ weightTrend, calorieAvg,... }

Export to Sheets
Error‑handling conventions: tRPC middleware will be used to handle errors consistently. Authentication errors will return a UNAUTHORIZED code. Zod validation errors will automatically return a BAD_REQUEST code with detailed validation issues. Server-side errors will be caught and logged, returning a generic INTERNAL_SERVER_ERROR to the client.

7. TESTING STRATEGY

A multi-layered testing strategy ensures application quality and reliability.

Level / focus	Toolset	Scope
Unit	Vitest	Pure functions (e.g., utility functions in packages/shared), custom hooks.
Component	Vitest + Testing Library	Individual React components, verifying rendering and props.
Visual / interaction	Storybook + @storybook/testing‑library	UI snapshots to prevent visual regressions, user interactions within Storybook.
End‑to‑end	Playwright	
Critical user flows like authentication, workout logging, and profile updates.

Coverage target: ≥80% statement coverage for unit and component tests.

Fixtures / seeding: pnpm seed → runs scripts in packages/seeding against the Firebase emulator to ensure a consistent test environment.

8. CI / CD PIPELINE (GITHUB ACTIONS)

The pipeline is configured in .github/workflows/ and is optimized with Turborepo's remote caching.

Setup PNPM and restore Turbo remote cache.

pnpm exec turbo run lint typecheck – ESLint & tsc --noEmit.

pnpm exec turbo run test – Vitest (Turbo skips untouched packages).

pnpm exec turbo run build-storybook – generates static Storybook for visual regression checks.

pnpm exec turbo run e2e – Playwright suite (headless) against the Firebase emulator.

Deploy preview (Firebase Hosting channel + optional Storybook host).

Changesets release & promote to prod on merge to main.

9. ENVIRONMENTS & SECRETS

Env	URL / target	Notes
local	localhost:5173	.env + Firebase emulators; validated by T3 Env.
preview-*	Firebase Hosting channel	Auto‑created per PR.
prod	https://aurafit.app	Promote via CI workflow.

Export to Sheets
Secrets are handled with firebase functions:config:set for backend functions and GitHub repo secrets for the CI/CD pipeline. This prevents hardcoding sensitive data.

10. PERFORMANCE & SCALABILITY

Denormalize Firestore data where appropriate to optimize for frequent read patterns and avoid complex queries.

Tune TanStack Query caching strategies (staleTime, cacheTime) to minimize unnecessary data fetching and improve perceived performance.

Code‑split via Vite dynamic import() to ensure only the necessary JavaScript is loaded for each route.

11. MONITORING & LOGGING

Concern	Tool	Notes
Runtime errors	Firebase Crashlytics / Sentry	Front‑end error capture and reporting.
Server logs	Google Cloud Logging	Structured JSON logs from Firebase Functions for debugging and analysis.
Analytics	GA4 or PostHog	Track user engagement funnels & feature usage.

Export to Sheets
12. ACCESSIBILITY & I18N

shadcn/ui components are built on Radix UI primitives, ensuring a high standard of accessibility (focus management, ARIA attributes) out of the box.

The Storybook accessibility addon will be used for quick audits during component development.

All development will adhere to WCAG 2.1 AA checklist standards (e.g., color contrast, keyboard navigation).

i18n plan: Internationalization will be planned for a future release, likely using a library like react-i18next.

13. CODE QUALITY & FORMATTING

Prettier formats code automatically on save and as a pre-commit action to ensure consistent styling.

ESLint governs code quality rules; the eslint-plugin-perfectionist plug‑in auto‑sorts imports, object keys, and more.

Husky pre‑commit hook runs lint-staged to lint and format staged files before they are committed.

14. OPEN QUESTIONS / RISKS

Item	Owner	Resolution date
Firestore query limitations for complex analytics	Backend Lead	TBD
Vendor lock-in with Firebase ecosystem	CTO	TBD
Cost management for Firestore reads/writes at scale	Product Owner	TBD

Export to Sheets
15. APPENDICES

Setup script: pnpm install && pnpm dev to run the local development environment with Firebase emulators.

Branching model: Conventional Commits + Changesets for automated versioning and changelog generation.

Links: Figma Designs, Storybook URL, Project Backlog.

Last updated: 2025-08-21