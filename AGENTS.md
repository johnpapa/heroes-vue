# AI-Ready Repo — Agent Guide

This is the **Tour of Heroes** Vue 3 SPA with a separate Azure Functions API backend. It demonstrates CRUD operations on heroes and villains using Vuex for state management, Vue Router for client-side routing, and Bulma/SCSS for styling.

## Repository Structure

```
heroes-vue/
├── vue-app/                        # Vue 3 SPA (TypeScript)
│   ├── src/
│   │   ├── main.ts                 # App bootstrap — createApp, register router + store
│   │   ├── app.vue                 # Root component
│   │   ├── router.ts               # Vue Router with lazy-loaded routes
│   │   ├── store/                  # Vuex store
│   │   │   ├── index.ts            # Root store — registers heroes + villains modules
│   │   │   ├── config.ts           # API base URL from VUE_APP_API env var
│   │   │   └── modules/
│   │   │       ├── models.ts       # Hero and Villain class definitions
│   │   │       ├── types.ts        # State interfaces (HeroesState, VillainsState, RootState)
│   │   │       ├── mutation-types.ts # Mutation string constants
│   │   │       ├── action-utils.ts # Response parsing helpers
│   │   │       ├── heroes.ts       # Heroes Vuex module (state, mutations, actions, getters)
│   │   │       └── villains.ts     # Villains Vuex module
│   │   ├── components/             # Generic reusable components
│   │   │   ├── header-bar.vue      # App header with brand + links
│   │   │   ├── nav-bar.vue         # Navigation bar
│   │   │   ├── modal.vue           # Reusable modal dialog
│   │   │   ├── card-content.vue    # Card body (name + description)
│   │   │   ├── button-footer.vue   # Icon button used in card footers
│   │   │   ├── list-header.vue     # List title + add button
│   │   │   └── page-not-found.vue  # 404 fallback
│   │   ├── views/                  # Route-level view components
│   │   │   ├── about.vue
│   │   │   ├── heroes/
│   │   │   │   ├── heroes.vue      # Container — orchestrates list + detail
│   │   │   │   ├── hero-list.vue   # Presentational list of hero cards
│   │   │   │   ├── hero-detail.vue # Edit form for a single hero
│   │   │   │   └── use-heroes.ts   # Composition function wrapping Vuex dispatch
│   │   │   └── villains/           # Same pattern as heroes/
│   │   ├── styles.scss             # Global Bulma + custom SCSS
│   │   └── shims-vue.d.ts          # TypeScript shim for .vue imports
│   ├── cypress/                    # Cypress E2E tests
│   ├── package.json                # Vue CLI project — scripts: serve, build, lint, test:e2e
│   ├── tsconfig.json               # TypeScript config
│   ├── vue.config.js               # Vue CLI / Webpack config
│   ├── .eslintrc.js                # ESLint — Airbnb + Prettier + Vue 3 + TypeScript
│   ├── .env                        # Default env (VUE_APP_API)
│   ├── .env.development            # Dev env overrides
│   └── db.json / server.js / db.js # Optional JSON Server mock backend
├── api/                            # Azure Functions API (JavaScript)
│   ├── shared/data.js              # In-memory data store + CRUD helpers
│   ├── heroes-get/                 # GET /api/heroes
│   ├── heroes-post/                # POST /api/heroes
│   ├── heroes-put/                 # PUT /api/heroes/{id}
│   ├── heroes-delete/              # DELETE /api/heroes/{id}
│   ├── villains-get/               # GET /api/villains
│   ├── villains-post/              # POST /api/villains
│   ├── villains-put/               # PUT /api/villains/{id}
│   ├── villains-delete/            # DELETE /api/villains/{id}
│   ├── host.json                   # Azure Functions host config
│   ├── proxies.json                # Azure Functions proxies
│   └── package.json                # API dependencies
├── README.md                       # Project overview and feature list
└── .prettierrc                     # Root Prettier config
```

## Tech Stack

| Layer     | Technology                                                       |
| --------- | ---------------------------------------------------------------- |
| Framework | Vue 3 (beta) with Composition API                                |
| Language  | TypeScript (vue-app), JavaScript (api)                           |
| State     | Vuex 4 with typed modules (heroes, villains)                     |
| Routing   | Vue Router 4 with lazy-loaded routes and HTML5 history mode      |
| HTTP      | Axios                                                            |
| Styling   | Bulma CSS framework + SCSS + Font Awesome icons                  |
| Linting   | ESLint (Airbnb + Prettier + Vue 3 + TypeScript)                  |
| Testing   | Cypress E2E tests                                                |
| API       | Azure Functions (HTTP triggers, in-memory data)                  |
| Backend   | Optional JSON Server (`json-server-auth`) for local development  |
| Build     | Vue CLI 4 / Webpack                                              |

## Build & Run

```bash
# Vue SPA — install and serve
cd vue-app
npm install
npm run serve          # Dev server at http://localhost:8080

# Vue SPA — production build
npm run build          # Output in vue-app/dist/

# Vue SPA — lint
npm run lint

# Optional: local JSON Server backend
npm run backend        # Starts json-server on port 9627

# Both frontend + backend together
npm run quick          # Concurrently runs backend + serve

# Azure Functions API
cd api
npm install
npm start              # Requires Azure Functions Core Tools (func CLI)
```

## Testing

```bash
cd vue-app
npm run test:e2e       # Cypress E2E tests via Vue CLI
npm run cypress        # Open Cypress interactive runner
npm run e2e            # Run backend + frontend + Cypress together
```

There are no unit tests. Cypress E2E tests live in `vue-app/cypress/`.

## Architecture Patterns

### Vuex Store Pattern

The store uses **module-based Vuex 4** (not namespaced):

1. **Models** (`store/modules/models.ts`) — `Hero` and `Villain` classes with `id`, `name`, `description`
2. **Types** (`store/modules/types.ts`) — State interfaces for each module
3. **Mutation types** (`store/modules/mutation-types.ts`) — String constants (`GET_HEROES`, `ADD_HERO`, etc.)
4. **Modules** (`store/modules/heroes.ts`, `villains.ts`) — Each has `state`, `mutations`, `actions`, `getters`
5. **Actions** use Axios to call the API, then `commit` mutations to update state

### Composition Functions (Composables)

View-level composables (`use-heroes.ts`, `use-villains.ts`) wrap Vuex `dispatch` calls for cleaner component code. They return action functions that components call directly.

### Component Hierarchy

```
App.vue
├── HeaderBar → HeaderBarBrand + HeaderBarLinks
├── NavBar (route links)
└── <router-view>
    ├── Heroes (container)
    │   ├── HeroList (presentational) → CardContent + ButtonFooter
    │   └── HeroDetail (edit form)
    ├── Villains (same pattern)
    └── About
```

**Convention:** Container components (e.g., `heroes.vue`) own state and dispatch actions. Presentational components receive props and emit events.

### API Layer

Azure Functions with HTTP triggers. Each function folder contains:
- `function.json` — HTTP binding config (method, route, auth level)
- `index.js` — Handler that calls shared data helpers

All data lives in memory (`api/shared/data.js`) — no database.

## Key Conventions

- **Single-file components** — `<script>`, `<style>`, `<template>` in `.vue` files
- **TypeScript in vue-app** — All `.ts` files use strict typing; `.vue` files use `lang="ts"`
- **defineComponent + setup()** — Components use Options API wrapper with Composition API `setup()`
- **Props in, events out** — Presentational components receive data via props and emit events to parents
- **ESLint Airbnb + Prettier** — Single quotes, trailing commas (es5), 80-char print width
- **Lazy-loaded routes** — Webpack chunk splitting via dynamic `import()` in router
- **Environment variables** — `VUE_APP_API` controls the API base URL

## Common Pitfalls

- The project uses **Vue 3 beta** and **Vuex 4 beta** — not all Vue 3 stable APIs may be available
- Vuex modules are **not namespaced** — mutation/action names must be globally unique
- The `main.ts` file registers `router` twice (`.use(router).use(router)`) — this is a known quirk
- The API uses in-memory data — all changes are lost on restart
- No root `package.json` — you must `cd` into `vue-app/` or `api/` to run npm commands
- Cypress tests require both the frontend and backend to be running
