# Wobb Frontend Assignment

A starter influencer search application built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. This project is intentionally left in a rough-but-working state for candidates to improve.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

## What's Included

- **Search / Dashboard** — filter influencers by platform (Instagram, YouTube, TikTok) and search by username or full name
- **Profile Details** — click a profile to view extended data loaded from individual JSON files
- **Routing** — `react-router-dom` with `/` (search) and `/profile/:username` (details)

Sample data lives in:

- `src/assets/data/search/` — platform search results (10 profiles each)
- `src/assets/data/profiles/` — detailed profile JSON per username

## How to Submit

1. **Download or clone** this starter project to your machine.
2. **Create a new repository** on your own GitHub account. Do not fork the original assignment repo — push your work to a repo you own.
3. Complete the tasks below and push your changes to that repository.
4. **Share the public GitHub repository URL** with us as your submission.

### Deadline (strict)

- **Due:** **2 July 2026, 2:00 PM IST** (Indian Standard Time, UTC+5:30)
- **Any git commits made after this deadline will disqualify your submission.** We will only consider the repository state as of the deadline; late commits will not be reviewed.
- Make sure your final work is pushed **before** the cutoff.

## AI Usage

You may use any AI tools (Cursor, ChatGPT, Claude, GitHub Copilot, etc.). We are evaluating your final solution and engineering decisions.

## Your Tasks

Complete the following as part of your submission:

1. **Find and fix all bugs and quality issues** — the codebase contains intentional bugs and quality issues. Identify and resolve them.

2. **Completely redesign the UI/UX** — replace the basic layout with a polished, modern interface. Focus on usability, visual hierarchy, and delight.

3. **Replace React Context with Zustand** — when you implement state management for the selected list, use [Zustand](https://github.com/pmndrs/zustand) instead of React Context.

4. **Implement "Select profile & Add to List"** — the disabled "Add to List" button is a stub. Build the full feature:
   - Select / add profiles to a persistent list
   - View and manage the selected list
   - Handle duplicates appropriately

5. **Improve code quality and project structure** — refactor as needed, add proper types, and follow React best practices.

6. **Optimize performance** — apply sensible optimizations where appropriate.

7. **Use any libraries you need** — you are not limited to the current stack. Choose tools that help you deliver a great result (UI kits, state managers, testing libraries, etc.).

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Start development server |
| `npm run build`| Production build         |
| `npm run lint` | Run ESLint               |

## Submission Notes

### What Was Changed & Solved
1. **Core Bug Fixes:**
   - **Case-Insensitive Search:** Fixed username filtering in `src/utils/dataHelpers.ts` to use `.toLowerCase()` matching.
   - **Engagement Rate Calculation:** Fixed the $100\times$ multiplier math bug in `ProfileDetailPage.tsx`.
   - **Engagements Field:** Corrected the count field rendering total engagements as a formatted raw number (e.g. `1,320,790`) rather than formatting it as a rate.
   - **URL Platform Fallback:** Resolved missing query param crashes by falling back to the metadata `user.type` values inside loaded profile JSON files.
   - **Dynamic Import File Casing:** Solved dynamic lookup crash on case-sensitive filesystems by performing case-insensitive key searches in `src/utils/profileLoader.ts`.
   - **Responsive Layout:** Replaced the layout-breaking fixed width `w-[700px]` with responsive layout grids (`w-full max-w-xl`).
   - **Wildcard Catch-All Route:** Added a catch-all route redirecting invalid URLs back to home.
   - **Dead Code Cleanup:** Deleted the unused/unimported `SearchBar.tsx` component.
2. **State Management (Zustand):**
   - Built a custom store at `src/store/useStore.ts` utilizing Zustand's `persist` middleware for automatic `localStorage` synchronization. Added strict duplicate check validations.
3. **UI/UX Redesign:**
   - Added a sliding sidebar drawer (`SelectedSidebar.tsx`) to manage selection lists.
   - Designed responsive cards with premium platform brand colors and custom glassmorphism styling tokens.
   - Created a sticky header navigation bar containing selected counts and animated indicators.
4. **Reusable Common UI Components:**
   - **Avatar (`common/Avatar.tsx`):** Automated image load error handling; dynamically parses name initials and applies a hashed gradient background as a fallback.
   - **StatCard (`common/StatCard.tsx`):** Unified metadata cards display.
   - **Button (`common/Button.tsx`):** Premium button component supporting ghost, outline, and loading indicator states.
5. **Performance & Optimization:**
   - Removed state-induced page-wide click counters (`clickCount`), substituting them with `useRef`.
   - Removed prop-drilled `searchQuery` keys to avoid unnecessary rendering loops on character inputs.
   - Utilized React's `memo` and `useCallback` to enforce rendering isolation.

### Libraries Added
- **Zustand** (`^5.0.3`): Exclusively used for robust, persistent state management.

### Assumptions & Trade-Offs
- **Platform Detection:** In selected lists, the profile summary data lacks platform identifiers. Rather than modifying the JSON structure, we wrote a helper parsing the social profiles' domain URLs (`instagram.com`, `youtube.com`, `tiktok.com`) to dynamically detect brand contexts.
- **Verbatim Module Syntax:** Kept the project configuration strict, modifying imports to type-only declarations to enforce compiler directives.

### Remaining Improvements
- Add search result debouncing on input fields.
- Integrate drag-and-drop ordering inside the Selected List panel.

