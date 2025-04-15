
# Matches Page Brandbook

## Color Palette

### Primary Colors
- **Background**: Dark gradient (from-gray-900/95 via-gray-900/98 to-black)
- **Accent Blue**: #3b82f6 (blue-500)
- **Accent Red**: #ef4444 (red-500) - Used for LIVE indicators
- **Accent Green**: #10b981 (emerald-500) - Used for completed matches

### Secondary Colors
- **Text Primary**: #ffffff (white)
- **Text Secondary**: #9ca3af (gray-400)
- **Border Colors**: rgba(255, 255, 255, 0.05) (white/5) to rgba(255, 255, 255, 0.1) (white/10)
- **Card Background**: rgba(0, 0, 0, 0.2) (black/20)
- **Hover States**: rgba(255, 255, 255, 0.05) (white/5)

## Typography

### Font Families
- **Primary Font**: System font stack with sans-serif fallbacks
- **Weights Used**: 
  - Regular (400) 
  - Medium (500)
  - Bold (700)

### Text Sizes
- **Headers**: text-xl (Matches header)
- **Subheaders**: text-base
- **Body Text**: text-sm
- **Small Text/Labels**: text-xs

## Component Styling

### Cards
- **Match Cards**: Rounded corners (rounded-xl), dark background with gradient, subtle border
- **Live Match Cards**: Special styling with red indicators and animation effects
- **Card Hover Effects**: Scale and shadow changes, subtle glow effects

### Buttons
- **Primary Buttons**: Blue background with white text
- **Secondary/Filter Buttons**: Dark transparent background (black/20) with white borders
- **Icon Buttons**: Circular, minimal styling with hover effects

### Tables
- **Headers**: Slightly darker background than rows (black/40)
- **Rows**: Subtle hover effect (bg-white/5)
- **Borders**: Very subtle white/5 borders between rows
- **Special Row Styling**: 
  - Live matches: red-500/5 background
  - Upcoming matches: blue-500/5 background

### UI Elements
- **Badges**: 
  - LIVE: red-500 background
  - Upcoming: blue-500 background
  - Completed: green-500 background
- **Inputs**: Dark backgrounds with light borders
- **Dropdowns/Popovers**: Dark backgrounds with subtle borders

## Animation and Effects
- **Loading State**: Skeleton loading for table rows
- **Transitions**: Smooth transitions for hover states (300-500ms)
- **Live Indicators**: Subtle pulse animations
- **Card Hover**: Scale and shadow transitions

## Icons
- **Style**: Simple, line-based icons from Lucide React
- **Sizing**: Consistently sized (h-4 w-4 for small, h-5 w-5 for medium)
- **Common Icons**: 
  - Calendar
  - Clock
  - Search
  - Filter
  - Eye (for details)
  - ChevronDown (for dropdowns)

## Responsive Design
- **Mobile First**: Components stack vertically on small screens
- **Grid Layouts**: Switch from single column to multi-column at md breakpoints
- **Table View**: Horizontally scrollable on small screens

## Visual Hierarchy
- **Primary Focus**: Match scores and team names
- **Secondary Elements**: Match details, times, dates
- **Tertiary Elements**: Filter controls and sorting options
