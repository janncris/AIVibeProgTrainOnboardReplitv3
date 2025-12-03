# AI Company Employee Onboarding Platform

## Overview

This is an employee onboarding and training platform for an AI software development company. The platform provides role-specific learning paths, interactive training modules, quizzes, progress tracking, and an AI-powered assistant to help new employees learn about company culture, tools, and best practices.

The application supports 10 different roles (developers, project managers, designers, QA engineers, business analysts, and non-IT employees) with customized training content for each role. Employees can complete training modules, take quizzes, track their progress, access resources, and get help from an AI assistant.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool

**UI Component Library**: Shadcn UI (New York style) with Radix UI primitives
- Comprehensive component library including dialogs, dropdowns, cards, forms, navigation
- Custom-themed using CSS variables for light/dark mode support
- Tailwind CSS for styling with a design system inspired by Linear and Notion

**State Management**:
- React Context API for global onboarding session state (`OnboardingContext`)
- TanStack Query (React Query) for server state management and API requests
- Local Storage for persisting user sessions between page reloads

**Routing**: Wouter for client-side routing (lightweight alternative to React Router)

**Design System**:
- Typography: Inter font for UI/body text, JetBrains Mono for code snippets
- Color system: CSS custom properties with light/dark theme support
- Spacing: Consistent Tailwind spacing units (2, 4, 6, 8)
- Component patterns: Cards for content containers, badges for status indicators, progress bars for completion tracking

**Key Pages**:
- Role Selection: Initial onboarding screen where users choose their role
- Dashboard: Overview of progress and recommended modules
- Modules: Browse and filter training modules
- Module Detail: View module content, complete sections, take quizzes
- Resources: Access documentation and learning materials
- Progress: View detailed completion statistics
- AI Assistant: Chat interface for onboarding help

### Backend Architecture

**Runtime**: Node.js with Express.js

**API Pattern**: RESTful JSON API with the following endpoints:
- `POST /api/sessions` - Create new onboarding session
- `GET /api/sessions/:id` - Retrieve session data
- `DELETE /api/sessions/:id` - Delete session
- `PUT /api/sessions/:id/progress` - Update module progress
- `POST /api/sessions/:id/chat` - Send message to AI assistant

**Storage Strategy**: 
- Currently using in-memory storage (`MemStorage` class) for development
- Interface-based design (`IStorage`) allows easy swap to persistent database
- Session data includes user info, progress tracking, and chat history

**Build System**:
- esbuild for server bundling (optimized for cold start performance)
- Vite for client bundling
- Development mode uses Vite HMR for fast refresh
- Production builds static client assets to `dist/public`

**Development Tools**:
- TypeScript for type safety across client/server/shared code
- Path aliases for clean imports (`@/`, `@shared/`, `@assets/`)
- Shared schema definitions using Zod for validation

### Data Schema

**Core Entities** (defined in `shared/schema.ts`):

- **Roles**: 10 role types (developer, project_manager, product_owner, ui_ux_designer, qa, frontend_dev, backend_dev, devops_engineer, business_analyst, non_it_employee)

- **OnboardingSession**: User's complete onboarding state
  - User identification (id, name, role)
  - Progress array tracking completion of modules/sections
  - Chat history with AI assistant
  - Timestamps for creation and activity

- **TrainingModule**: Learning content structure
  - Module metadata (title, description, category, difficulty, duration)
  - Role targeting (which roles should see this module)
  - Sections with content (text, video, or interactive)
  - Optional quiz with questions and passing score

- **UserProgress**: Tracks completion state
  - Module/section identification
  - Status (not_started, in_progress, completed)
  - Quiz results if applicable
  - Completion timestamp

- **Resource**: Reference materials
  - Type (documentation, video, guide, tutorial)
  - Tool association (replit, bolt, lovable, softr, bubble, framer)
  - URL and metadata

### External Dependencies

**AI Integration**: OpenAI API
- GPT-5 model for AI assistant responses
- System prompt provides company context, values, and tool information
- Role-specific context passed to personalize responses
- Error handling for missing API keys (lazy initialization)

**Database**: Neon Serverless PostgreSQL (configured but not actively used)
- Drizzle ORM setup for future database integration
- Connection pooling via `@neondatabase/serverless`
- Schema migrations ready in `migrations/` directory
- Current implementation uses in-memory storage for simplicity

**Styling & UI**:
- Google Fonts CDN (Inter, JetBrains Mono)
- Radix UI primitives for accessible components
- Tailwind CSS for utility-first styling
- CSS custom properties for theming

**Development Environment**:
- Replit-specific plugins for development banner, error overlay, and cartographer
- Environment variable configuration for API keys and database URLs

**Form Handling**:
- React Hook Form with Zod resolvers for type-safe form validation
- Zod schemas shared between client and server for consistent validation