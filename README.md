# CreatorScope — Influencer Discovery Platform

> Discover, analyze, and shortlist the world's top social media creators across Instagram, YouTube, and TikTok.

🔗 **Live Demo:** [https://wobb-influencer-search.vercel.app](https://wobb-influencer-search.vercel.app)

---

## Project Overview

**CreatorScope** is a premium influencer search and analytics platform built for talent and marketing teams. It enables users to search and filter creators by platform, view detailed profile analytics, and build a persistent shortlist — all in a fast, beautiful, single-page experience.

This project was built as a complete redesign of the Wobb frontend assignment — transforming a rough starter into a production-quality product.

---

## Features

- 🔍 **Instant Search** — Case-insensitive search by full name or username with live results
- 🎛️ **Platform Filtering** — Switch between Instagram, YouTube, and TikTok; search resets on switch
- 📊 **Dashboard Analytics** — Per-platform stats: total creators, total reach, avg engagement, saved count
- 👤 **Profile Detail Page** — Full stats view: followers, engagement rate, posts, avg likes/comments/views, total engagements
- 💾 **Persistent Shortlist** — Save/remove creators; list persists across sessions via localStorage
- 📱 **Responsive Design** — Mobile bottom sheet, tablet/desktop right drawer
- 🌙 **Dark/Light Mode** — System preference detection, manual toggle, no flash on load
- ✅ **Duplicate Prevention** — Toast notifications on add/remove/clear
- ⌨️ **Keyboard Shortcut** — `⌘K` / `Ctrl+K` to focus search
- 🎨 **No-scroll Profile View** — Two-column layout fits in one viewport

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v4 (Vanilla CSS tokens) |
| Routing | React Router DOM v7 |
| State Management | Zustand v5 + persist middleware |
| Animations | Framer Motion v12 |
| Icons | Lucide React |
| Notifications | Sonner |
| Deployment | Vercel |

---

## Folder Structure

```
src/
├── assets/
│   └── data/
│       ├── search/         # Platform search results (instagram, youtube, tiktok JSON)
│       └── profiles/       # Individual profile detail JSON files
├── components/
│   ├── common/
│   │   ├── Avatar.tsx      # Auto-fallback initials avatar with gradient hash
│   │   ├── Button.tsx      # Polymorphic button: primary, secondary, outline, ghost
│   │   ├── PlatformBadge.tsx
│   │   └── StatCard.tsx    # Metric display card
│   ├── Layout.tsx          # Floating glass navbar + sidebar trigger
│   ├── PlatformFilter.tsx  # Platform tabs + search input
│   ├── ProfileCard.tsx     # Grid card with save/view actions
│   ├── ProfileList.tsx     # Responsive profile grid + empty state
│   ├── SelectedSidebar.tsx # Bottom sheet (mobile) / right drawer (desktop)
│   └── VerifiedBadge.tsx
├── constants/              # Platform brands, influencer meta mapping
├── hooks/                  # useTheme hook
├── pages/
│   ├── SearchPage.tsx      # Home: hero, stats, filter, grid
│   └── ProfileDetailPage.tsx # Detail: two-column no-scroll layout
├── store/
│   └── useStore.ts         # Zustand store with localStorage persistence
├── types/
│   └── index.ts            # TypeScript interfaces
├── utils/
│   ├── dataHelpers.ts      # Extract + filter profiles, platform helpers
│   ├── formatters.ts       # Number/rate formatting utilities
│   └── profileLoader.ts    # Dynamic profile JSON loader
├── App.tsx                 # Router setup + Toaster
├── index.css               # CSS custom properties, design tokens, global styles
└── main.tsx                # Entry point with no-flash theme init
```

---

## Installation

```bash
# Clone the repo
git clone https://github.com/IamGaurav001/wobb-influencer-search.git
cd wobb-influencer-search

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

```bash
# Build for production
npm run build

# Lint
npm run lint
```

---

## Architecture

### Data Flow

```
JSON Files (src/assets/data/)
    ↓
dataHelpers.ts (extractProfiles, filterProfiles)
    ↓
SearchPage → PlatformFilter + ProfileList
    ↓
ProfileCard (navigate to detail page)
    ↓
ProfileDetailPage ← profileLoader.ts (dynamic import by username)
```

### Theme System

- CSS custom properties defined in `:root` and `html.dark`
- Mapped to Tailwind via `@theme` block
- `main.tsx` applies the correct class synchronously before React renders → **zero flash**
- `useTheme` hook exposes `{ theme, toggleTheme }`

---

## State Management

**Zustand** is used for the global selected creators list:

```ts
useStore = create(persist((set, get) => ({
  selectedProfiles: [],
  addProfile:    (profile) => { /* dedup check + toast */ },
  removeProfile: (userId)  => { /* filter + toast */ },
  clearProfiles: ()        => { /* reset + toast */ },
  isSelected:    (userId)  => { /* boolean check */ },
}), { name: "wobb-selected-influencers" }))
```

- `persist` middleware auto-syncs to `localStorage`
- Survives page refresh, tab close, and browser restart
- Duplicate prevention handled inside `addProfile`

---

## Screenshots

> The app features a premium dark/light themed interface.

| View | Description |
|---|---|
| Home (Dark) | Hero, analytics stats, platform switcher, creator grid |
| Home (Light) | Same layout with light glassmorphic styling |
| Profile Detail | Two-column no-scroll layout with full analytics |
| Shortlist Sidebar | Bottom sheet on mobile, right drawer on desktop |

---

## Key Bug Fixes

1. **Case-insensitive search** — `.toLowerCase()` applied to both sides of filter
2. **Engagement rate display** — Fixed `×100` multiplier rendering raw decimal as percentage
3. **Avatar fallback** — Auto-generates initials + gradient when image fails to load
4. **No flash of wrong theme** — Theme class applied synchronously in `main.tsx` before React mounts
5. **Platform URL detection** — Parses `instagram.com` / `youtube.com` / `tiktok.com` from profile URLs
6. **Profile page refresh** — Direct URL and hard refresh both work via proper routing config
7. **Mobile sidebar** — Replaced full-screen overlay with responsive bottom sheet

---

## Future Improvements

- Search debouncing (300ms) to reduce redundant filter runs on keystroke
- Drag-and-drop reordering inside the shortlist
- Export shortlist as CSV / PDF
- Pagination or infinite scroll for larger datasets
- Real API integration replacing static JSON files
- Unit tests with Vitest + React Testing Library

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | TypeScript check + Vite production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build locally |
