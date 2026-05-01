# Copilot Instructions — heroes-vue

## Project Overview

Tour of Heroes — a Vue 3 SPA with an Azure Functions API. Two independent packages: `vue-app/` (TypeScript SPA) and `api/` (JavaScript serverless functions).

## Code Conventions

### Vue Components

- Use **single-file components** (`.vue`) with `<script lang="ts">`, `<style lang="scss">`, and `<template>` sections
- Use `defineComponent()` with Composition API `setup()` function
- Name components in **PascalCase** in script, **kebab-case** in templates and filenames (e.g., `hero-list.vue`)
- **Props in, events out** — presentational components receive data via props and emit events; container components handle state and dispatch actions
- Keep component files small — extract reusable UI into `src/components/`, route-level views in `src/views/`

### TypeScript

- Use TypeScript for all `vue-app/src/` files
- Define models as classes in `store/modules/models.ts`
- Define state interfaces in `store/modules/types.ts`
- Use strict typing for Vuex `ActionContext` parameters

### Vuex Store

- Use **module-based Vuex** — each domain (heroes, villains) gets its own module in `store/modules/`
- Define mutation names as string constants in `store/modules/mutation-types.ts`
- Actions perform HTTP calls with Axios, then `commit` mutations
- Wrap Vuex dispatch calls in **composable functions** (`use-heroes.ts`, `use-villains.ts`) for view components
- Modules are **not namespaced** — ensure mutation/action names are globally unique

### Routing

- Define all routes in `src/router.ts`
- Use **lazy loading** with dynamic `import()` and webpack chunk names
- Use HTML5 history mode (no hash routing)

### Styling

- Global styles live in `src/styles.scss`
- Use **Bulma** CSS framework classes
- Use **SCSS** (`lang="scss"`) in component `<style>` blocks
- Use **Font Awesome** for icons via `@fortawesome` packages

### Linting & Formatting

- ESLint config: Airbnb + Prettier + Vue 3 + TypeScript
- Single quotes, trailing commas (es5), 80-char print width
- Run: `cd vue-app && npm run lint`

### API (Azure Functions)

- Each endpoint is a folder under `api/` (e.g., `heroes-get/`, `heroes-post/`)
- Each folder has `function.json` (HTTP binding) and `index.js` (handler)
- Handlers call shared helpers from `api/shared/data.js`
- Plain JavaScript — no TypeScript, no frameworks
- Data is in-memory (no database)

### Environment Variables

- `VUE_APP_API` — API base URL, set in `.env` and `.env.development`
- All Vue env vars must be prefixed with `VUE_APP_`

## Maintenance Matrix

| When you change...              | Also update or verify...                                  |
| ------------------------------- | --------------------------------------------------------- |
| A model class in `models.ts`    | Corresponding Vuex state interface in `types.ts`, any API function in `api/shared/data.js` that handles that entity |
| Vuex mutation type constant     | `mutation-types.ts`, all modules and composables referencing it |
| A Vuex module (heroes/villains) | The composable (`use-heroes.ts` / `use-villains.ts`), the container view component |
| A composable (`use-*.ts`)       | The view component that calls it                          |
| API route or method             | `function.json` binding, the Vuex action making the HTTP call, `.env` if base URL changes |
| `api/shared/data.js` schema     | All API function handlers, Vue model classes, Vuex state  |
| Vue Router routes               | `router.ts`, navigation components (`nav-bar.vue`, `header-bar-links.vue`) |
| A reusable component            | All parent components that import it                      |
| Styling (Bulma/SCSS)            | `styles.scss` and any component `<style>` blocks          |
| `package.json` scripts          | `README.md`, `AGENTS.md` build/run instructions           |
| Environment variable names      | `.env`, `.env.development`, `store/config.ts`, `AGENTS.md`|

## Adding a New Entity (e.g., "Sidekicks")

1. Create model class in `store/modules/models.ts`
2. Add state interface in `store/modules/types.ts`
3. Add mutation constants in `store/modules/mutation-types.ts`
4. Create Vuex module `store/modules/sidekicks.ts`
5. Register module in `store/index.ts`
6. Create composable `views/sidekicks/use-sidekicks.ts`
7. Create view components: `sidekicks.vue`, `sidekick-list.vue`, `sidekick-detail.vue`
8. Add route in `router.ts` with lazy loading
9. Add nav link in `header-bar-links.vue`
10. Create API functions: `sidekicks-get/`, `sidekicks-post/`, `sidekicks-put/`, `sidekicks-delete/`
11. Add data helpers in `api/shared/data.js`
