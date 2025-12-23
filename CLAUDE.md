# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev --turbopack`: Start development server with Turbopack for faster builds
- `npm run build`: Build the production application
- `npm start`: Start the production server
- `npm run lint`: Run ESLint to check code quality

## Project Architecture

This is a Next.js 15 personal portfolio website using the App Router architecture with the following key structure:

### Core Framework Stack
- **Next.js 15** with App Router and React 19
- **Material-UI (MUI)** for UI components and theming
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for animations
- **Swiper** for carousel/gallery functionality

### Application Structure

#### Theme System
- `src/app/theme.js`: Material-UI theme configuration with Inter font and custom color palette
- `src/app/providers.js`: ThemeProvider wrapper for Material-UI theme
- Dual styling approach: Material-UI components with Tailwind utility classes

#### Page Structure
- **Home** (`src/app/page.js`): Landing page with hero section and introduction
- **About** (`src/app/about/page.js`): Personal information with photo gallery
- **Resume** (`src/app/resume/page.js`): Interactive tabbed resume with animations
- **Projects** (`src/app/projects/page.js`): Project showcase with cards

#### Key Components
- `src/components/navbar.js`: Simple navigation with Next.js Link
- `src/components/gallery.js`: Photo gallery using Swiper
- `src/components/skillslevelbar.js`: Animated skill level indicators
- `src/app/resume/data.js`: Resume data structure

#### Data Management
Resume data is centralized in `src/app/resume/data.js` with structured objects for:
- Personal information
- Work experience
- Education
- Skills (categorized by type)
- Professional summary

### Styling Approach
- Material-UI theme provides consistent typography and color system
- Tailwind handles layout, spacing, and utility styling
- Custom CSS animations via Framer Motion
- Responsive design with grid layouts

### Asset Organization
- Static assets in `public/` including images and icons
- Gallery images in `public/gallery/`
- Project showcase images directly in `public/`

## Development Notes

- The project uses both `.js` and `.mjs` file extensions
- Client-side components are marked with `'use client'` directive
- ESLint configured with Next.js core web vitals rules
- No test framework currently configured