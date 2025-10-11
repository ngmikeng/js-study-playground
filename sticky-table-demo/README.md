# Sticky Table Columns Demo

A demonstration of a responsive table with sticky columns using HTML, CSS, and JavaScript. This project showcases how to implement sticky columns that remain fixed while horizontally scrolling through a wide table, with both light and dark theme support.

## Features

### 1. Sticky Columns
- First column (ID) sticks to the left side
- Last column (Actions) sticks to the right side
- Visual indicators for sticky columns:
  - Distinct borders
  - Shadow effects
  - Hover animations
  - Different background colors

### 2. Theme Support
- Toggle between light and dark themes
- Theme persistence using localStorage
- Smooth transitions between themes
- Emoji indicators (🌞 for light, 🌙 for dark)
- Carefully selected color palettes for both themes

### 3. Responsive Design
- Horizontal scrolling for wide tables
- Maintains fixed header
- Proper z-indexing for overlap handling
- Consistent spacing and alignment

### 4. Interactive Elements
- Edit and Delete action buttons
- Theme toggle button with hover effects
- Animated transitions for better user experience

## Technical Implementation

### CSS Variables
```css
:root {
    /* Dark theme variables */
    --bg-color: #1a1a1a;
    --text-color: #fff;
    --table-bg: #2d2d2d;
    /* ... other variables ... */
}

:root[data-theme="light"] {
    /* Light theme variables */
    --bg-color: #f5f5f5;
    --text-color: #333;
    /* ... other variables ... */
}
```

### Sticky Column Implementation
```css
.sticky-col {
    position: sticky;
    z-index: 1;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
}

.sticky-col-1 {
    left: 0;
    z-index: 2;
}

.sticky-col-last {
    right: 0;
    z-index: 2;
}
```

### Theme Switching Logic
```javascript
function toggleTheme() {
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}
```

## Project Structure

```
sticky-table-demo/
├── index.html          # Main HTML file
├── style.css          # Styles including theme variables
├── main.js           # JavaScript for table population and theme handling
└── README.md         # Project documentation
```

## Features in Detail

### 1. Sample Data Generation
- Generates 20 random employee records
- Includes various fields like name, email, department, etc.
- Realistic data patterns for testing

### 2. Visual Feedback
- Hover effects on sticky columns
- Shadow effects to indicate "elevation"
- Smooth transitions for all interactive elements
- Alternating row colors for better readability

### 3. Theme Implementation
- CSS variables for easy theme switching
- Transition effects for smooth theme changes
- Persistent theme storage
- Accessible color contrasts in both themes

### 4. Accessibility Considerations
- Proper table structure with thead and tbody
- Semantic HTML elements
- Clear visual hierarchy
- Sufficient color contrast ratios

## Usage

1. Open `index.html` in a web browser
2. Use the theme toggle button (🌞/🌙) to switch between light and dark themes
3. Scroll horizontally to see the sticky columns in action
4. Hover over sticky columns to see interactive effects
5. Theme preference is automatically saved

## Technical Notes

### CSS Features Used
- CSS Variables (Custom Properties)
- Position: sticky
- Box-shadow effects
- CSS Transitions
- Flexbox for layout
- Data attributes for theme switching

### JavaScript Features Used
- DOM manipulation
- Event handling
- localStorage for persistence
- Dynamic data generation
- Table population

### Browser Support
- Modern browsers supporting:
  - CSS Custom Properties
  - Position: sticky
  - CSS Transitions
  - localStorage API

## Future Enhancements

Potential improvements that could be added:

1. Responsive column visibility options
2. Custom column sticky positioning
3. Column reordering capability
4. Export table data functionality
5. Custom theme creation
6. More interactive features for sticky columns
7. Additional table formatting options

## Performance Considerations

The implementation takes into account several performance aspects:

1. Efficient CSS selectors
2. Optimized transitions
3. Minimal JavaScript overhead
4. Smooth scrolling performance
5. Efficient DOM updates