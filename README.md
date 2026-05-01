# Foodiary

A mobile app for tracking your daily food intake and nutrition — just take a photo or record a voice note of what you ate, and AI does the rest.

---

## What is Foodiary?

Foodiary helps you stay on top of your nutrition without the tedious manual logging. Instead of searching for foods in a database and entering quantities by hand, you simply snap a photo of your plate or record a quick voice note describing what you ate. The app sends that to an AI backend that identifies the foods and calculates the nutritional breakdown automatically.

You can set personal goals (lose weight, maintain, or gain), define your daily targets for calories and macronutrients, and track your progress throughout the day.

---

## Features

- **Meal logging via photo or voice** — capture meals the natural way
- **AI-powered nutrition analysis** — automatic calorie, protein, carb, and fat breakdown per meal
- **Daily nutrition dashboard** — see your progress toward daily goals at a glance
- **Date navigation** — browse your meal history by day
- **Personal goals** — set targets based on whether you want to lose, maintain, or gain weight
- **Profile setup** — enter your name, age, height, weight, gender, and activity level so the app can tailor recommendations
- **Google login** — sign in quickly with your Google account
- **Real-time meal status** — see when a meal is being processed and get results as soon as they're ready

---

## Screenshots

_Coming soon._

---

## Tech Stack

Built with [Expo](https://expo.dev) and [React Native](https://reactnative.dev), targeting both iOS and Android from a single codebase.

| Area | Technology |
|---|---|
| Framework | Expo 54 / React Native 0.81.5 / React 19 |
| Navigation | React Navigation v7 |
| Server state | TanStack Query v5 |
| Forms | React Hook Form + Zod |
| HTTP | Axios with automatic token refresh |
| Animations | Reanimated + Moti |
| Auth | AWS Cognito (email/password + Google OAuth) |
| Fonts | Host Grotesk |
| Icons | Lucide React Native |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) (LTS recommended)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) — `npm install -g expo-cli`
- For iOS: a Mac with Xcode installed
- For Android: Android Studio with an emulator configured, or a physical device

### 1. Clone the repository

```bash
git clone https://github.com/your-username/foodiary-app.git
cd foodiary-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root with the following variables:

```env
EXPO_PUBLIC_API_BASE_URL=https://your-api.example.com
EXPO_PUBLIC_COGNITO_CLIENT_ID=your-cognito-client-id
EXPO_PUBLIC_COGNITO_DOMAIN=your-pool.auth.us-east-1.amazoncognito.com
```

| Variable | Description |
|---|---|
| `EXPO_PUBLIC_API_BASE_URL` | Base URL of the Foodiary backend API |
| `EXPO_PUBLIC_COGNITO_CLIENT_ID` | AWS Cognito app client ID |
| `EXPO_PUBLIC_COGNITO_DOMAIN` | AWS Cognito hosted UI domain |

### 4. Start the development server

```bash
npm start
```

Then press `i` to open on iOS simulator, `a` for Android emulator, or scan the QR code with the [Expo Go](https://expo.dev/client) app on your phone.

### Run on a specific platform

```bash
npm run ios      # iOS simulator (Mac only)
npm run android  # Android emulator or connected device
```

---

## Project Structure

```
src/
├── app/                  # Business logic
│   ├── config/           # Environment variable validation
│   ├── contexts/         # React contexts (auth, home screen state)
│   ├── hooks/            # Custom hooks (queries, mutations)
│   ├── lib/              # Utilities (token storage, query client)
│   ├── navigation/       # Navigation stacks
│   ├── services/         # API service classes
│   └── types/            # Shared TypeScript types
└── ui/                   # User interface
    ├── components/        # Reusable components
    ├── screens/           # Individual screens
    └── styles/            # Theme, colors, typography
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm start` | Start the Metro bundler (development server) |
| `npm run ios` | Open on iOS simulator |
| `npm run android` | Open on Android emulator or device |
| `npm run typecheck` | Run TypeScript type checking |

---

## How the App Works

1. **Sign up or log in** — create an account with email/password or use Google
2. **Complete your profile** — enter your personal details and choose your goal (lose / maintain / gain weight)
3. **Log a meal** — tap the button on the home screen, then take a photo or record a voice note
4. **Wait a moment** — the app sends your input to an AI backend that identifies the foods and calculates nutrition
5. **Review your meal** — see the breakdown of calories and macronutrients for each food item
6. **Track your day** — the home screen shows your running totals vs. your daily goals

---

## Contributing

This project is currently personal/private. If you have access and want to contribute:

1. Create a branch from `main`
2. Make your changes
3. Run `npm run typecheck` to make sure there are no type errors
4. Open a pull request

---

## License

Private — all rights reserved.
