# Copilot Instructions — heroes-vue

## Project Type

Vue 3 SPA (`vue-app/`) with a separate Azure Functions API (`api/`). This is a demo/reference app — not a monorepo. Each directory has its own `package.json` and installs independently.

## Language Conventions

### TypeScript (vue-app)

- Target ES module syntax with `import`/`export`
- Use `defineComponent()` for all Vue components
- Use TypeScript class syntax for models (`class Hero { constructor(public id, ...) }`)
- Use explicit type annotations for Vuex state interfaces
- Single quotes, trailing commas (ES5), 80-char print width (enforced by Prettier)

### JavaScript (api)

- CommonJS modules (`require`/`module.exports`)
- Azure Functions v2 pattern: `module.exports = async function (context, req) { ... }`
- Parse route params with `parseInt(req.params.id, 10)`

## Framework Patterns

### Vuex Modules

Each entity follows a strict module pattern:
1. Model class in `store/modules/models.ts`
2. State interface in `store/modules/types.ts`
3. Mutation constants in `store/modules/mutation-types.ts`
4. Vuex module in `store/modules/{entity}.ts` (actions dispatch HTTP calls via Axios)
5. Composable in `views/{entity}/use-{entity}.ts` (wraps `store.dispatch`)

Do not break this pattern — every entity must have all five pieces.

### Component Structure

- Shared/generic components → `src/components/`
- Feature-specific components → `src/views/{feature}/`
- All components use `<script lang="ts">` with Options API via `defineComponent()`
- No scoped styles — all styles in `src/styles.scss` (global Bulma + custom SCSS)
- Props flow in, events emit out

### Routing

- Routes defined in `src/router.ts`
- All feature routes use lazy loading: `component: () => import('./views/...')`
- Include `webpackChunkName` comment for each lazy-loaded route
- 404 catch-all route uses `/:pathMatch(.*)*`

### API Functions

- One directory per endpoint under `api/` (e.g., `heroes-get/`, `heroes-post/`)
- Each directory contains `function.json` (binding config) + `index.js` (handler)
- All data access goes through `api/shared/data.js`

## Code Style

Enforced by ESLint (`.eslintrc.js` in `vue-app/`) and Prettier (`.prettierrc` at root):
- **Extends:** `@vue/airbnb`, `plugin:vue/vue3-essential`, `@vue/prettier`, `@vue/typescript`
- **Single quotes**, no semicolons in Prettier output
- **No `console.log`** in production (`no-console` rule)
- **No unused variables** (`@typescript-eslint/no-unused-vars`)
- Run `cd vue-app && npm run lint` before committing

## Test Conventions

- **E2E only** — Cypress tests in `vue-app/cypress/integration/`
- Test files use `.spec.js` suffix
- Tests reset data via `cy.request('POST', '/api/reset', data)` before each suite
- No unit tests currently exist

## Maintenance Matrix

| When this changes... | Also update... |
|---|---|
| New entity added (model + views) | `store/modules/models.ts`, `store/modules/types.ts`, `store/modules/mutation-types.ts`, `store/index.ts` (register module), `router.ts` (add route), `components/nav-bar.vue` (add link), `api/shared/data.js`, create API function dirs |
| New shared component | `src/components/` — import in consuming views |
| Vuex mutation types changed | `store/modules/mutation-types.ts` and all modules that reference them |
| API endpoint added | Create `api/{entity}-{verb}/` dir with `function.json` + `index.js`, update `api/shared/data.js` |
| Route added/changed | `src/router.ts`, `src/components/nav-bar.vue` |
| Styling changed | `src/styles.scss` — shared across all components |
| Environment variable added | `vue-app/.env`, `vue-app/.env.development`, `vue-app/src/store/config.ts` |
| Dependencies changed | Run `npm install` in the affected directory (`vue-app/` or `api/`) |
| Build/tooling changed | `.github/workflows/ci.yml`, `.github/workflows/copilot-setup-steps.yml`, `AGENTS.md` |
