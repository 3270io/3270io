# Planning Guide

A professional landing page for 3270.io that showcases both 3270Connect and 3270Web products with links to their respective MkDocs documentation sites, styled with authentic IBM 3270 mainframe terminal aesthetics.

**Experience Qualities**:
1. **Nostalgic** - Evokes the authentic feel of classic IBM 3270 terminals with green phosphor displays and monospace typography
2. **Professional** - Presents enterprise-grade mainframe tooling with clear information hierarchy and authoritative design
3. **Functional** - Provides immediate access to documentation and product information without unnecessary complexity

**Complexity Level**: Content Showcase (information-focused)
This is a focused landing page that presents two products with clear navigation to their documentation. It's primarily informational with minimal interactivity beyond navigation.

## Essential Features

**Product Card Display**
- Functionality: Display cards for 3270Connect and 3270Web with descriptions and documentation links
- Purpose: Give users immediate understanding of both products and direct access to their documentation
- Trigger: Page load
- Progression: Page loads → Products displayed in grid/cards → User reads descriptions → User clicks documentation link → Navigates to https://3270connect.3270.io or https://3270web.3270.io
- Success criteria: Both products clearly visible with working links to their respective documentation sites

**Mainframe Terminal Aesthetic**
- Functionality: Apply authentic IBM 3270 terminal styling throughout the interface
- Purpose: Create immediate brand recognition and nostalgic connection to mainframe computing
- Trigger: Page load and render
- Progression: Page loads → Terminal-style interface renders → Phosphor glow effects applied → Typography displays in monospace → Scanline effects animate subtly
- Success criteria: Interface resembles authentic 3270 terminal with green phosphor glow, monospace fonts, and CRT-style effects

**Header/Hero Section**
- Functionality: Display 3270.io branding and tagline
- Purpose: Establish brand identity and communicate the product family purpose
- Trigger: Page load
- Progression: Page loads → Logo/title appears → Tagline describes mainframe connectivity → Sets context for products below
- Success criteria: Clear branding that immediately communicates the mainframe technology focus

## Edge Case Handling

- **Missing Links**: If documentation URLs change, cards still display with visual indication that links are external
- **Mobile Viewing**: Layout adapts to single column with maintained readability on small screens
- **Browser Compatibility**: Fallback for browsers that don't support backdrop-filter or CSS effects
- **Slow Connections**: Content-first loading with progressive enhancement for visual effects

## Design Direction

The design should transport users to the era of classic mainframe computing with IBM 3270 terminals - the iconic green phosphor CRT displays, monospace typography, and subtle scan line effects. The aesthetic should feel like a well-maintained vintage terminal: nostalgic yet functional, retro yet professional. This creates immediate brand alignment with mainframe technology while providing modern usability.

## Color Selection

The palette is inspired by authentic IBM 3270 terminal displays with green phosphor monitors and dark backgrounds.

- **Primary Color**: Terminal Green `oklch(0.75 0.15 145)` - The iconic phosphor green that defined mainframe terminals, used for primary text and glowing effects
- **Secondary Colors**: 
  - Deep Terminal Background `oklch(0.12 0.02 145)` - Nearly black with subtle green tint for authentic CRT feel
  - Bright Phosphor Highlight `oklch(0.85 0.18 145)` - Brighter green for headings and emphasis
- **Accent Color**: Amber Alert `oklch(0.75 0.15 65)` - Classic terminal amber/orange for attention and interactive elements
- **Foreground/Background Pairings**: 
  - Background (Deep Terminal `oklch(0.12 0.02 145)`): Terminal Green text `oklch(0.75 0.15 145)` - Ratio 7.2:1 ✓
  - Card backgrounds (Slightly lighter `oklch(0.15 0.02 145)`): Terminal Green text `oklch(0.75 0.15 145)` - Ratio 6.8:1 ✓
  - Accent (Amber `oklch(0.75 0.15 65)`): Dark background `oklch(0.12 0.02 145)` - Ratio 7.5:1 ✓

## Font Selection

Typography should evoke the precise, mechanical feel of mainframe terminal displays with authentic monospace fonts that reference computing history.

- **Typographic Hierarchy**:
  - H1 (Main Title): IBM Plex Mono Bold / 48px / tracking-wide / uppercase for maximum terminal authenticity
  - H2 (Product Names): IBM Plex Mono SemiBold / 32px / tracking-wide / slight glow effect
  - Body (Descriptions): IBM Plex Mono Regular / 16px / line-height 1.6 / balanced readability
  - Labels/Links: IBM Plex Mono Medium / 14px / uppercase / letter-spacing

## Animations

Animations should enhance the CRT terminal aesthetic with subtle vintage computing references while maintaining professionalism.

- **Glow Pulse**: Subtle pulsing glow on terminal green text simulating phosphor persistence (2-3s duration, very subtle)
- **Scanline Effect**: CSS-based horizontal scanlines slowly scrolling to mimic CRT refresh
- **Hover States**: Cards glow more intensely on hover with slight scale and brightness increase
- **Page Load**: Simulated terminal boot sequence with content "typing in" or fading up sequentially
- **Link Interactions**: Amber accent glow on hover with smooth color transition

## Component Selection

- **Components**: 
  - Card component (modified with terminal borders and glow effects)
  - Button component (styled as terminal command buttons with brackets `[ BUTTON ]`)
  - Custom header component with ASCII-art style borders
  - Custom footer with version/status information in terminal style
  
- **Customizations**: 
  - Terminal-style borders using `border-2` with green glow via `box-shadow`
  - CRT scanline overlay using CSS `::before` pseudo-element with repeating gradient
  - Phosphor glow effects using multiple `text-shadow` layers
  - ASCII-art decorative elements for headers/dividers
  
- **States**: 
  - Buttons: Default (green with brackets), Hover (amber glow + brightness), Active (pressed effect with reduced glow), Focus (double border with intense glow)
  - Cards: Default (subtle glow), Hover (increased glow + scale 1.02), Focus (glow ring for keyboard navigation)
  
- **Icon Selection**: 
  - Terminal/Monitor icons for product cards
  - ArrowRight for documentation links suggesting forward navigation
  - Book or FileText for documentation indicators
  - Code/Terminal for technical emphasis
  
- **Spacing**: 
  - Container padding: `px-6 md:px-12 lg:px-24`
  - Section spacing: `py-12 md:py-16 lg:py-24`
  - Card gap: `gap-6 md:gap-8`
  - Content max-width: `max-w-6xl` centered
  
- **Mobile**: 
  - Desktop: Two-column grid for products, full effects
  - Tablet (768px): Two-column maintained, slightly reduced effects
  - Mobile (<768px): Single column stack, simplified scanlines for performance, maintained terminal aesthetic with adjusted font sizes (H1: 36px, H2: 24px, Body: 14px)
