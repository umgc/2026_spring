# EduLense Design System

The EduLense design system provides a set of responsive, accessible UI components optimized for left-handed users and educational productivity. All components are built with Tailwind CSS and React, and work across web and mobile (PWA).

## Available Components

- **NavBar** – Top navigation with links; includes mobile hamburger and responsive behavior.
- **Sidebar** – Right-side vertical navigation (optimised for left-handed reach). Hides on mobile.
- **Card** – Simple, accessible content container with shadow.
- **Modal** – Overlay dialog with close button and keyboard focus trap.
- **Breadcrumb** – Hierarchical navigation display.
- **Pagination** – Page controls with previous/next.
- **Tabs** – Tabbed navigation with pills/underline variants.


> ⚠️ *Left-handed considerations:* primary action areas (sidebar, toggles) are positioned to the right edge, making them reachable by the left hand on touch devices.
## Usage Example

Import individual components from `src/components` and assemble them in your pages or layouts.

```jsx
import NavBar from '../components/NavBar';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
```

Make sure your Tailwind setup is configured (see root `tailwind.config.js`).
