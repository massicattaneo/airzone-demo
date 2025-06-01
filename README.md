<img src="./libs/assets/svg/airzone.svg" alt="Logo" width="200" />

**NOTE ON THE PROJECT:**

This implementation focuses on code architecture, scalability, and folder structure to ensure long-term maintainability and reusability of the component across different contexts.

⚠️ The current visual styling does not fully match the provided design specifications. This was a conscious decision to prioritize structure, state handling, and deliverability within the scope of this test.

🎨 I can easily adapt the component to match the design visuals precisely upon request. The groundwork is in place to support styling updates with minimal effort.

## Project Setup

- NodeJS:
  - Install NODEJS `v22.15.1`
  - Install yarn `npm add -g yarn`
  - Install dependencies `yarn`
- Tauri [Desktop & Mobile app]:
  - Pre requisites: [See Tauri] (https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode)

## Code formatting

- Type checking: `yarn ts-check`
- Prettier: `yarn format`
- ESLint: `yarn lint`

## Integration Tests

- Install playwright

  - `yarn playwright install`
  - `yarn playwright install-deps`

  Run tests with: `yarn test` (to visually debug `yarn test --ui`)

## WEB APP

### Local Development

- Run `yarn dev`

### Build

- Run `yarn build:web`

## DESKTOP APP

### Local Development

** see TAURI for initial setup **

- Run `yarn tauri dev`

### Build

- Run `yarn tauri build`

## IOS APP

### Local Development

** see TAURI for initial setup **

- Run `yarn tauri ios dev`

### Build

- Run `yarn tauri ios build`

## ANDROID APP

### Local Development

** see TAURI for initial setup **

- Run `yarn tauri android dev`

### Build

- Run `yarn tauri android build`
