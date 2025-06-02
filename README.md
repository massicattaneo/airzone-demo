<img src="./libs/assets/svg/airzone.svg" alt="Logo" width="200" />

Demo: [https://massicattaneo.github.io/airzone-demo/](https://massicattaneo.github.io/airzone-demo/)

This repository contains the technical test implementation for the **Zone Button** component. It simulates the behavior of climate control zones within a smart home system, as part of the **Airzone Cloud** solution.

## 🧱 Tech Stack

- **UI Framework**: React + Tailwind CSS
- **Mock Backend**: tRPC + MSW
- **Cross-Platform App Container**: [Tauri](https://tauri.app/)
- **Typing**: TypeScript

The project is structured to support scalability and component reuse, following clean architecture principles and separation of concerns.

## 📁 Project Structure

```text
.
├── .github/workflows    # CI configuration with GitHub Actions
├── libs/                # Shared libraries/components and logic
├── public/              # Static public assets (e.g. images, icons)
├── src/                 # Main React frontend application
├── src-tauri/           # Configuration and setup for Tauri app
├── README.md            # Project documentation
└── tsconfig.json        # TypeScript configuration
```

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

- Run `yarn build`

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

```

```
