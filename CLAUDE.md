# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Kids Learning is a React-based educational web app for young children, covering four subjects: English, Math, Puzzles, and Science. Each subject has multiple interactive game/quiz activities. Deployed to GitHub Pages at `/kidslearning/` — pushes to `main` auto-deploy via `.github/workflows/deploy.yml`.

## Commands

- `npm run dev` — start Vite dev server with HMR
- `npm run build` — production build to `dist/`
- `npm run lint` — ESLint across all files
- `npm run preview` — preview production build locally

No test framework is configured.

## Architecture

- **React 19 + Vite 8**, plain JavaScript (no TypeScript), CSS modules per component
- **Routing**: react-router-dom v7 with `BrowserRouter` (basename `/kidslearning`). All routes defined in `src/App.jsx`. Pattern: `/:subjectId` for subject landing pages, `/:subjectId/:activityId` for individual games.
- **Layout**: `AppShell` wraps all routes (back nav, gradient background)
- **Subject registry**: `src/data/subjects.js` defines all subjects and their activities (id, name, icon, emoji, color CSS vars). `SubjectPage` reads this to render activity lists.
- **Game data**: `src/data/<subject>/` contains question/content data files for each activity
- **Game components**: `src/components/<subject>/` — one component per activity
- **Game types**: Not all games use the shared quiz system. Three patterns exist:
  - **Quiz-style** (most games): use `useQuiz` hook + `QuizContainer`/`QuizComplete` from `src/components/shared/`
  - **Exploratory** (e.g., AlphabetExplorer): carousel/browsing UI, no scoring
  - **Custom state** (e.g., CountingGame, MemoryCards): manage their own game state directly but still use `QuizComplete` for the end screen
- **Audio**: `useAudio` hook (`src/hooks/useAudio.js`) provides text-to-speech via the Web Speech API
- **Animations**: framer-motion for component transitions; canvas-confetti for correct-answer celebrations; CSS keyframe animations in `src/styles/animations.css` (shake, bounce, pop, float)
- **Styling**: Component-scoped CSS files alongside components, plus `src/styles/global.css` (CSS variables for subject colors, feedback colors, typography). Fonts: Nunito (body) and Fredoka (headings) loaded from Google Fonts in `index.html`.

## Adding a New Activity

1. Add question data in `src/data/<subject>/<activity>.js`
2. Create component in `src/components/<subject>/`. Use `useQuiz` hook + `QuizContainer`/`QuizComplete` for quiz-style games.
3. Register the activity in `src/data/subjects.js` (include id, name, emoji, description)
4. Add a route in `src/App.jsx`

## ESLint

Uses flat config (`eslint.config.js`). The `no-unused-vars` rule ignores uppercase-starting variables and `motion` (framer-motion).
