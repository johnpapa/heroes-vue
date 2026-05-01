# Heroes Vue — Agent Guide

Tour of Heroes is a **demo/reference Vue SPA** with a separate Azure Functions API backend. The app manages heroes and villains (list, add, edit, delete) and showcases Vue 3, TypeScript, Vuex, and Vue Router patterns.

This repo is part of a family of framework comparison apps ([heroes-angular](https://github.com/johnpapa/heroes-angular), [heroes-react](https://github.com/johnpapa/heroes-react), [heroes-svelte](https://github.com/johnpapa/heroes-svelte)).

## Repository Structure

```
heroes-vue/
├── vue-app/                        # Vue 3 SPA (TypeScript)
│   ├── src/
│   │   ├── main.ts                 # App entry — mounts Vue, registers router + store
│   │   ├── app.vue                 # Root component (HeaderBar, NavBar, router-view)
│   │   ├── router.ts               # Client-side routes: /heroes, /villains, /about, 404
│   │   ├── store/
│   │   │   ├── index.ts            # Vuex store — registers heroes + villains modules
│   │   │   ├── config.ts           # API base URL from VUE_APP_API env var
│   │   │   ├── modules/
│   │   │   │   ├── heroes.ts       # Heroes Vuex module (actions, mutations, getters)
│   │   │   │   ├── villains.ts     # Villains Vuex module
│   │   │   │   ├── models.ts       # Hero and Villain class definitions
│   │   │   │   ├── types.ts        # RootState, HeroesState, VillainsState interfaces
│   │   │   │   ├── mutation-types.ts  # Mutation type constants
│   │   │   │   └── action-utils.ts # Shared HTTP action helpers (Axios)
│   │   ├── views/
│   │   │   ├── heroes/
│   │   │   │   ├── heroes.vue      # Heroes page (list + detail)
│   │   │   │   ├── hero-list.vue   # Hero list with edit/delete buttons
│   │   │   │   ├── hero-detail.vue # Hero edit form
│   │   │   │   └── use-heroes.ts   # Composable wrapping Vuex hero actions
│   │   │   ├── villains/           # Same pattern as heroes/
│   │   │   └── about.vue           # Static about page
│   │   ├── components/             # Shared UI components (modal, header, nav, cards)
│   │   └── styles.scss             # Global Bulma + custom SCSS styles
│   ├── cypress/                    # Cypress E2E tests
│   │   └── integration/heroes.spec.js
│   ├── db.json                     # Mock data for json-server (local dev)
│   ├── server.js                   # Express server for production builds
│   ├── package.json                # Vue app dependencies and scripts
│   ├── vue.config.js               # Webpack config — devServer proxy to API on :7071
│   ├── .eslintrc.js                # ESLint config (Airbnb + Prettier + Vue 3 + TS)
│   ├── tsconfig.json               # TypeScript config
│   └── .env / .env.development     # Environment variables (VUE_APP_API=api)
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
│   ├── host.json                   # Azure Functions host config (v2)
│   ├── proxies.json                # API proxies config
│   └── package.json                # API dependencies (@azure/functions)
├── .vscode/settings.json           # VS Code + Peacock + Azure Functions settings
├── .prettierrc                     # Prettier config (root level)
└── README.md                       # Project overview, features, getting started
```

## Tech Stack

- **Frontend:** Vue 3 (beta), TypeScript ~3.9, Vuex 4, Vue Router 4
- **HTTP client:** Axios
- **Styling:** Bulma CSS, SCSS, Font Awesome
- **Bundler:** Vue CLI (Webpack via `@vue/cli-service`)
- **API:** Azure Functions v2 (JavaScript, Node.js)
- **Mock backend:** json-server + json-server-auth (local development)
- **E2E tests:** Cypress 5
- **Linting:** ESLint (Airbnb + Prettier + Vue 3 + TypeScript)
- **Formatting:** Prettier (single quotes, trailing commas)

## Build & Run

**This is NOT a monorepo.** The `vue-app/` and `api/` directories have independent `package.json` files with no workspace config.

### Vue App (frontend)

```bash
cd vue-app
npm install
npm run serve          # Dev server on http://localhost:8080 (proxies /api to :7071)
npm run build          # Production build → dist/
npm run lint           # ESLint check
```

### Local Development with Mock Backend

```bash
cd vue-app
npm run quick          # Starts json-server (:9627) + Vue dev server concurrently
```

The `db.json` file provides seed data for heroes and villains. The `routes.json` file maps API routes to json-server endpoints.

### Azure Functions API

```bash
cd api
npm install
npm start              # Starts Azure Functions on http://localhost:7071
```

The Vue dev server proxies `/api` requests to `http://localhost:7071` (configured in `vue.config.js`).

### Environment Variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `VUE_APP_API` | `api` | API base URL (relative path for proxy, or absolute URL for production) |
| `PORT` | `9626` | Express server port (production) |
| `NODE_ENV` | `development` | Environment mode |

## Testing

### E2E Tests (Cypress)

```bash
cd vue-app
npm run e2e            # Starts backend + frontend + opens Cypress
npm run cypress        # Opens Cypress (requires backend + frontend running)
```

Tests live in `vue-app/cypress/integration/`. Currently covers heroes CRUD operations.

**No unit tests exist.** Only Cypress E2E tests are configured.

## Key Patterns and Conventions

### Vuex Module Pattern

Each entity (heroes, villains) follows the same structure:

1. **Model class** in `store/modules/models.ts` — `Hero { id, name, description }`
2. **State interface** in `store/modules/types.ts` — `HeroesState { heroes: Hero[] }`
3. **Vuex module** in `store/modules/heroes.ts` — actions (CRUD via Axios), mutations, getters
4. **Composable** in `views/heroes/use-heroes.ts` — wraps Vuex dispatch calls for use in components
5. **View components** in `views/heroes/` — `heroes.vue` (page), `hero-list.vue`, `hero-detail.vue`

### Azure Functions Pattern

Each API endpoint is a separate directory under `api/` with:
- `function.json` — HTTP trigger binding config (method, route, auth level)
- `index.js` — handler that calls shared data helpers

All data operations go through `api/shared/data.js` (in-memory, not persisted).

### Component Conventions

- Components use `defineComponent()` with Options API style
- Single-file components (`.vue`) with `<script lang="ts">`, `<template>`, `<style>`
- Global styles in `styles.scss`, no scoped component styles
- Shared UI components in `src/components/`, feature components in `src/views/{feature}/`

### Routing

Routes are defined in `router.ts` using `createRouter` with HTML5 history mode. All main routes are lazy-loaded via dynamic imports with webpack chunk names.

## Adding a New Entity

To add a new entity (e.g., "Sidekicks"):

1. **Model** — add `Sidekick` class to `vue-app/src/store/modules/models.ts`
2. **Types** — add `SidekicksState` to `vue-app/src/store/modules/types.ts`
3. **Mutations** — add mutation types to `vue-app/src/store/modules/mutation-types.ts`
4. **Vuex module** — create `vue-app/src/store/modules/sidekicks.ts` (follow `heroes.ts` pattern)
5. **Register module** — add to `vue-app/src/store/index.ts` imports and `modules` object
6. **Composable** — create `vue-app/src/views/sidekicks/use-sidekicks.ts`
7. **Views** — create `vue-app/src/views/sidekicks/` with `sidekicks.vue`, `sidekick-list.vue`, `sidekick-detail.vue`
8. **Route** — add `/sidekicks` route to `vue-app/src/router.ts`
9. **Nav link** — add link to `vue-app/src/components/nav-bar.vue`
10. **API functions** — create `api/sidekicks-get/`, `api/sidekicks-post/`, `api/sidekicks-put/`, `api/sidekicks-delete/` (follow existing function pattern)
11. **Shared data** — add sidekicks array and CRUD helpers to `api/shared/data.js`
12. **Mock data** — add sidekicks to `vue-app/db.json`

## Documentation

This project does not have a docs site — documentation is in `README.md` and `api/README.md`.

## Common Pitfalls

- **Two separate `npm install` steps** — `vue-app/` and `api/` have independent dependencies. Don't forget to install both.
- **Proxy config matters** — the Vue dev server proxies `/api` to `:7071`. If the API isn't running, the frontend will show empty lists with no error.
- **In-memory API data** — the Azure Functions API uses in-memory storage (`api/shared/data.js`). Data resets on every restart.
- **Vue 3 beta** — this repo uses Vue 3.0.0-beta.1. Some APIs may differ from stable Vue 3.
- **json-server port** — the mock backend runs on port 9627, not the default 3000.
