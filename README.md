# Tic-Tac-Toe Game

This is a web-based Tic-Tac-Toe game built with Next.js. The project demonstrates how to build a full-stack web application using modern technologies. It includes user authentication, gameplay against a simple bot, and score tracking.

## ✨ Features

- **User Authentication**: Secure sign-in with Google using NextAuth.js.
- **Bot Opponent**: Play against a bot with a simple game logic.
- **Score Tracking**: Scores are saved and displayed for authenticated users.
- **Responsive Design**: The user interface is built with Ant Design and Tailwind CSS to ensure a great experience on all screen sizes.
- **Modern Tech Stack**: Utilizes Next.js with Turbopack for a fast development experience.

## 🛠️ Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **UI**: React, Ant Design, Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: MongoDB

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- Node.js (version 20 or later)
- npm, yarn, or pnpm

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/heart-01/tic-tac-toe
   cd tic-tac-toe
   ```
2. **Set up environment variables:**
   Create a `.env.local` file in the root of the project and add the necessary environment variables. You can use `.env.example` as a template.

   ```env
   # Authentication
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=
   SESSION_MAX_AGE=

   # Google Provider
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=

   # Database
   MONGODB_URI=
   ```
3. **Install dependencies:**

   ```bash
   npm install
   ```

### Running the Application

- **Development:**
  To start the development server with Turbopack:

  ```bash
  npm run dev
  ```

  Open [http://localhost:3000](http://localhost:3000) in your browser.
- **Build:**
  To build the application for production:

  ```bash
  npm run build
  ```
- **Production:**
  To start the production server:

  ```bash
  npm run start
  ```

## 📂 Project Structure

The project follows a feature-based organization inside the `src` directory.

```
src/
├── app/         # Next.js App Router: pages, layouts, and API routes
├── components/  # Shared React components (Atoms, Molecules, Organisms)
├── enums/       # TypeScript enums
├── types/       # TypeScript type definitions
└── utils/       # Utility functions and helpers
```

- **`src/app`**: Contains all the routes of the application. The routes are grouped by feature (e.g., `(auth)`, `(game)`).
- **`src/app/api`**: API routes, including the NextAuth.js handler.
- **`src/components`**: Components are structured using Atomic Design principles.
- **`src/utils`**: Includes helper functions for game logic (`gameLogic.ts`), bot behavior (`botLogic.ts`), and score management (`scoreManager.ts`).
