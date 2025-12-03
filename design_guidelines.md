# Design Guidelines: AI Company Employee Onboarding Platform

## Design Approach
**Selected Framework**: Design System Approach inspired by Linear + Notion  
**Rationale**: Productivity-focused learning platform requiring clear information hierarchy, consistent patterns, and efficient navigation across complex training modules.

## Core Design Principles
1. **Clarity First**: Clean layouts that reduce cognitive load during learning
2. **Progress Visibility**: Clear visual feedback on completion and achievements
3. **Role-Specific Identity**: Subtle visual differentiation between role paths
4. **Professional Yet Approachable**: Balance credibility with warmth

## Typography System

**Font Families**:
- Primary: Inter (via Google Fonts CDN) - UI, headings, body text
- Monospace: JetBrains Mono - code snippets, technical content

**Hierarchy**:
- H1: text-4xl font-bold (page titles)
- H2: text-2xl font-semibold (section headers)
- H3: text-xl font-semibold (module titles)
- Body: text-base (content)
- Small: text-sm (metadata, captions)

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, and 8 consistently
- Component padding: p-4, p-6, p-8
- Section spacing: space-y-4, space-y-6, space-y-8
- Container margins: m-4, m-6, m-8

**Grid Structure**:
- Dashboard: Two-column (sidebar + main content)
- Sidebar: Fixed 280px width (w-70)
- Content area: Responsive with max-w-6xl container
- Module cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3

## Component Library

### Navigation
**Sidebar Navigation** (Fixed Left):
- Company logo at top
- Role badge/indicator below logo
- Main navigation items with icons (Dashboard, Training Modules, Resources, Progress, AI Assistant)
- User profile at bottom
- Icons from Heroicons (outline style)

**Top Bar**:
- Breadcrumb navigation
- Search functionality (global platform search)
- Notification bell
- User avatar dropdown

### Dashboard Components

**Welcome Hero Section**:
- Personalized greeting with user name and role
- Current progress overview (percentage complete)
- Next recommended module card
- Quick action buttons (Continue Learning, Ask AI Assistant)
- Height: Natural content height, not forced viewport

**Progress Cards**:
- Overall completion ring chart (circular progress)
- Module completion list with checkmarks
- Upcoming milestones timeline
- Achievements/badges earned

**Training Module Cards**:
- Module thumbnail/icon
- Title and brief description
- Duration estimate
- Difficulty indicator (Beginner/Intermediate/Advanced)
- Progress bar if started
- CTA button (Start/Continue/Review)

### Interactive Training Components

**Module Content Layout**:
- Left: Content navigation (module sections)
- Center: Main content area with step-by-step lessons
- Right: AI Assistant chat panel (collapsible)

**Content Blocks**:
- Text lessons with clear typography
- Code snippets with syntax highlighting
- Video embed containers (16:9 aspect ratio)
- Interactive diagrams/illustrations
- Tool-specific tutorials (Replit, Bolt, etc.)

**Quiz Component**:
- Question card with multiple choice options
- Radio buttons/checkboxes for selections
- Submit button with instant feedback
- Score display with encouraging messaging
- Review incorrect answers feature

### AI Assistant Interface

**Chat Panel**:
- Fixed or slide-over panel (400px width)
- Message bubbles (user vs AI differentiated)
- Input field at bottom with send button
- Suggested questions/prompts chips
- Conversation history access

**Message Styling**:
- User messages: Aligned right, subtle background
- AI responses: Aligned left, code blocks supported
- Typing indicator animation
- Timestamp on hover

### Resource Library

**Organization**:
- Filter sidebar (by role, tool, content type)
- Card grid layout for resources
- Each card: Icon, title, type badge, description, access button
- Search bar at top
- Sort options (Recent, Popular, Alphabetical)

### Progress Tracking

**Visual Elements**:
- Timeline view of completed/upcoming modules
- Completion percentage rings
- Achievement badges with unlock dates
- Skill matrix/competency radar chart
- Certification status cards

## Role Selection Interface

**Initial Screen**:
- Grid of 10 role cards (2 rows of 5 on desktop)
- Each card: Role icon, title, brief description
- Hover effect: Subtle lift and shadow
- Selected state: Border accent
- Confirm button appears after selection

**Role Cards Design**:
- Consistent size (240px × 200px)
- Centered icon at top
- Role title below
- 2-line description
- "Learn more" link

## Interaction Patterns

**Buttons**:
- Primary: Solid fill, medium weight
- Secondary: Outline style
- Text buttons: For tertiary actions
- Icon buttons: Circular, 40px × 40px
- States: Default, hover (subtle transform), active, disabled

**Cards**:
- Subtle shadow elevation
- Rounded corners (rounded-lg)
- Hover: Slight shadow increase
- Clickable cards: Cursor pointer, subtle scale

**Modals/Overlays**:
- Centered overlay with backdrop blur
- Max width 600px for content modals
- Close button (X) top-right
- Smooth fade-in animation

## Icons
**Library**: Heroicons (outline style via CDN)  
**Usage**: Navigation (20px), section headers (24px), cards (32px), hero sections (48px)

## Images

**Dashboard Hero**:
- Abstract tech/AI-themed illustration (not photo)
- Positioned in welcome section background (subtle, low opacity)
- Size: 600px × 400px, positioned top-right
- Purpose: Visual interest without distraction

**Module Thumbnails**:
- Tool logos for tool-specific modules (Replit, Bolt, Lovable, etc.)
- Abstract icons for conceptual modules
- Size: 200px × 200px, displayed in module cards
- Consistent aspect ratio across all cards

**Achievement Badges**:
- Custom illustrated badges for milestones
- Celebratory visuals for completions
- Size: 80px × 80px in progress section

## Accessibility
- Keyboard navigation throughout
- Focus states visible on all interactive elements
- ARIA labels on icon-only buttons
- Color contrast ratios meeting WCAG AA
- Screen reader friendly progress indicators
- Form inputs with proper labels and error states

## Responsive Behavior
- Mobile: Single column, collapsible sidebar (hamburger menu)
- Tablet: Maintain sidebar, stack module cards to 2 columns
- Desktop: Full layout with fixed sidebar, 3-column grids

## Animations
**Minimal and Purposeful**:
- Page transitions: Subtle fade (200ms)
- Progress updates: Smooth number counting animation
- Module completion: Celebratory checkmark animation (one-time)
- Loading states: Subtle skeleton screens
- No scroll-triggered animations