# Design Guidelines: University Training & Placement Management System

## Design Approach

**Selected Approach**: Modern Pastel Design System
A fresh, inviting design with soft pastel colors that feels professional yet approachable. The color palette creates a warm, lively atmosphere while maintaining clarity and usability.

**Key Design Principles**:
1. **Soft & Inviting**: Pastel colors create a welcoming, friendly atmosphere
2. **Visual Harmony**: Gradient backgrounds and color-coordinated elements
3. **Clarity First**: Information density balanced with breathing room
4. **Purposeful Hierarchy**: Guide users through complex workflows effortlessly

---

## Color Palette

**Primary Colors (Light Mode)**:
- **Primary**: Soft Lavender/Violet - `hsl(258 65% 65%)` - Main actions, links, focus states
- **Secondary**: Mint/Teal - `hsl(180 35% 92%)` - Complementary highlights, secondary actions
- **Accent**: Soft Pink - `hsl(330 50% 94%)` - Warm accents, notifications
- **Background**: Warm Off-White - `hsl(30 50% 99%)` - Page backgrounds with subtle gradients
- **Card**: Warm White - `hsl(30 40% 98%)` - Card and panel backgrounds

**Dark Mode**:
- Deep violet-tinted backgrounds with matching pastel highlights
- Muted foregrounds for comfortable reading
- Preserved color harmony across themes

**Gradient Usage**:
- Page backgrounds: `bg-gradient-to-br from-background via-background to-[color]/10`
- Cards: `bg-gradient-to-br from-card to-[color]/10`
- Icon containers: `bg-gradient-to-br from-[color]/25 to-[color]/15`

---

## Typography

**Font Stack**: 
- **Primary**: Inter (via Google Fonts CDN) - all body text, UI elements, data tables
- **Headings**: Inter with increased letter-spacing for page titles

**Type Scale**:
- Page Titles: `text-3xl font-semibold tracking-tight`
- Section Headers: `text-xl font-semibold`
- Card Titles: `text-lg font-medium`
- Body Text: `text-base font-normal`
- Metadata/Labels: `text-sm font-medium`
- Table Data: `text-sm font-normal`
- Tiny Labels: `text-xs font-medium uppercase tracking-wide`

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 6, 8, 12, 16** for consistency
- Component padding: `p-4` to `p-6`
- Section spacing: `gap-8`, `space-y-12`
- Tight groupings: `gap-2`, `space-y-4`
- Page margins: `px-6 md:px-12`

**Container Strategy**:
- Dashboard content: `max-w-7xl mx-auto`
- Form containers: `max-w-2xl`
- Modal content: `max-w-3xl`
- Full-width tables with horizontal scroll on mobile

**Grid Patterns**:
- Stats cards: `grid-cols-1 md:grid-cols-3 gap-6`
- Drive cards: `grid-cols-1 lg:grid-cols-2 gap-4`
- Form layouts: Single column with responsive two-column for related fields

---

## Component Library

### Navigation
- **Sticky header** with horizontal navigation tabs
- Tab indicator: bottom border treatment
- User dropdown menu aligned right with profile icon
- Mobile: Hamburger menu with slide-out drawer

### Dashboard Cards
- **Stats cards**: Rounded corners (`rounded-lg`), subtle border, `p-6`
- Large metric number (`text-4xl font-bold`)
- Label below metric (`text-sm uppercase tracking-wide`)
- Icon positioned top-right of card

### Data Tables
- **Striped rows** for better scanning
- Header row: sticky, `font-medium text-sm uppercase tracking-wide`
- Cell padding: `px-4 py-3`
- Action buttons: icon buttons aligned right
- Responsive: horizontal scroll with fixed first column on mobile

### Forms
- **Field groups**: `space-y-6` between groups, `space-y-2` within label/input pairs
- Labels: `text-sm font-medium mb-1.5`
- Inputs: `rounded-md border px-4 py-2.5 text-base` with focus ring
- Multi-select checkboxes: Grid layout `grid-cols-2 md:grid-cols-3 gap-3`
- Required indicators: Asterisk in label
- Help text: `text-sm` below inputs
- Submit buttons: Full width on mobile, auto width on desktop

### Status Badges
- Pill shape: `rounded-full px-3 py-1 text-xs font-semibold`
- Variants: Active, Completed, Cancelled, Registered, Shortlisted, Interview, Selected, Rejected, Placed, Not Placed
- Positioned inline with text or top-right of cards

### Drive Cards (Student View)
- Border treatment: `border-2 rounded-lg`
- Header: Company name `text-lg font-semibold`
- Metadata row: Icons + text for CTC, deadline, eligibility
- Description: Truncated with "Read more" expansion
- Footer: Action buttons right-aligned
- Hover: Subtle lift effect

### Modals/Dialogs
- Backdrop: Semi-transparent overlay
- Container: `rounded-xl` with shadow, centered
- Header: `text-xl font-semibold pb-4 border-b`
- Body: `py-6` with scrollable content
- Footer: Action buttons right-aligned with Cancel/Confirm pattern

### Buttons
- **Primary**: `rounded-md px-6 py-2.5 text-sm font-semibold`
- **Secondary**: Border variant of primary
- **Ghost**: Text-only with hover background
- **Icon buttons**: Square `p-2 rounded-md`
- Disabled state: Reduced opacity with cursor-not-allowed

### Empty States
- Centered content with icon (`w-16 h-16`)
- Message: `text-lg font-medium`
- Subtext: `text-sm`
- Call-to-action button below

### Loading States
- Spinner: Centered in container
- Skeleton screens for tables (shimmer animation on placeholder rows)
- Button loading: Spinner replacing text

---

## Icons

**Library**: Heroicons (via CDN)
- Navigation: outline variant, `w-5 h-5`
- Stats cards: solid variant, `w-8 h-8`
- Table actions: outline variant, `w-4 h-4`
- Status icons: Match badge size

---

## Animations

**Minimal, Purposeful Motion**:
- Page transitions: None (instant navigation)
- Dropdown menus: `transition-opacity duration-150`
- Modals: Fade in backdrop + scale content (`scale-95` to `scale-100`)
- Hover states: `transition-colors duration-150`
- **No scroll animations, parallax, or decorative motion**

---

## Images

**Hero Images**: Not applicable - This is a dashboard/management application
**Profile Images**: Circular avatars for user dropdowns (`w-8 h-8 rounded-full`)
**Empty State Illustrations**: Simple iconography, no complex illustrations
**Company Logos**: Optional upload field in drive details, displayed as `max-h-12` thumbnail

---

## Responsive Breakpoints

- Mobile: < 768px - Single column, stacked navigation, full-width tables with scroll
- Tablet: 768px - 1024px - Two-column grids, visible tab navigation
- Desktop: > 1024px - Three-column stats, full table visibility, side-by-side layouts