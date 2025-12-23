# BS Column Block

## Overview
The BS Column block is a responsive Bootstrap 5 column component that works seamlessly with the BS Row block to create flexible grid layouts. It features automatic width calculation, responsive breakpoint controls, and cascading inheritance for efficient layout management.

**Block Name:** `bootstrap-blocks/bs-column`  
**Category:** Layout  
**Icon:** Columns  
**API Version:** 2  
**Status:** Production Ready ✅

---

## Key Features

### Core Functionality
- ✅ **Auto-Width Calculation:** Automatically calculates column widths based on number of sibling columns
- ✅ **Bootstrap 5 Grid System:** Full Bootstrap 5 responsive grid support
- ✅ **Responsive Breakpoints:** Six breakpoints (Default, SM, MD, LG, XL, XXL)
- ✅ **Cascading Inheritance:** Smart inheritance from lower to higher breakpoints
- ✅ **Offset Support:** Column offset controls for advanced layouts
- ✅ **Manual Override:** Manually set custom column widths

### Advanced Features
- ✅ **Sibling Detection:** Automatically detects and responds to sibling column changes
- ✅ **Real-Time Updates:** Column classes update immediately when columns are added/removed
- ✅ **Auto-Open Panel:** Grid Settings panel opens automatically on column selection
- ✅ **Breakpoint Persistence:** Remembers active breakpoint when switching between columns
- ✅ **Visual Feedback:** Shows current calculated width in the editor

---

## Block Attributes

### Column Width Settings
```javascript
default: { width: 0, offset: 0 }  // Mobile (0px+)
sm: { width: 0, offset: 0 }       // Small tablets (576px+)
md: { width: 0, offset: 0 }       // Tablets (768px+)
lg: { width: 0, offset: 0 }       // Desktops (992px+)
xl: { width: 0, offset: 0 }       // Large desktops (1200px+)
xxl: { width: 0, offset: 0 }      // Extra large (1400px+)
```

### Attributes Reference
| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `className` | string | `""` | Additional CSS classes |
| `default` | object | `{width: 0, offset: 0}` | Mobile width/offset |
| `sm` | object | `{width: 0, offset: 0}` | Small tablet width/offset |
| `md` | object | `{width: 0, offset: 0}` | Tablet width/offset |
| `lg` | object | `{width: 0, offset: 0}` | Desktop width/offset |
| `xl` | object | `{width: 0, offset: 0}` | Large desktop width/offset |
| `xxl` | object | `{width: 0, offset: 0}` | Extra large width/offset |
| `calculatedWidth` | number | `6` | Auto-calculated width based on siblings |

---

## Bootstrap Breakpoints

### Breakpoint System
| Breakpoint | Min Width | Class Prefix | Description |
|------------|-----------|--------------|-------------|
| **Default** | 0px | `col-` | Mobile devices |
| **SM** | 576px | `col-sm-` | Small tablets (portrait) |
| **MD** | 768px | `col-md-` | Tablets (landscape) |
| **LG** | 992px | `col-lg-` | Desktops |
| **XL** | 1200px | `col-xl-` | Large desktops |
| **XXL** | 1400px | `col-xxl-` | Extra large screens |

### Column Width System
Bootstrap uses a 12-column grid system:

| Columns | Width | Class Example | Percentage |
|---------|-------|---------------|------------|
| 12 | Full width | `col-12` | 100% |
| 6 | Half width | `col-6` | 50% |
| 4 | One-third | `col-4` | 33.33% |
| 3 | One-quarter | `col-3` | 25% |
| 2 | One-sixth | `col-2` | 16.66% |
| 1 | One-twelfth | `col-1` | 8.33% |

---

## Editor Interface

### Inspector Controls (Right Sidebar)

#### Grid Settings Panel
**Auto-opens when column is selected**

**Breakpoint Tabs:**
- Default (Mobile)
- SM (Small)
- MD (Medium)
- LG (Large)
- XL (Extra Large)
- XXL (Extra Extra Large)

**For Each Breakpoint:**
- **Columns:** Number input (0-12)
  - Shows calculated width when set to 0
  - Manual entry overrides auto-calculation
- **Offset:** Number input (0-11)
  - Left margin in grid columns
- **Current Width Display:** Shows active column width

### Main Editor Area
- Columns display side-by-side (not stacked)
- 90% width for better editing experience
- Flexbox layout for proper alignment
- Visual indication of column structure
- Uses XXL breakpoint for editor preview

---

## Cascading Inheritance Logic

The BS Column block uses a smart cascading inheritance system:

### Inheritance Flow
```
Default → SM → MD → LG → XL → XXL
(Bottom-to-Top Cascade)
```

### How It Works

1. **Start with Default:** All breakpoints inherit from Default if not set
2. **Cascade Upward:** Each breakpoint inherits from the previous one
3. **Manual Override:** Setting a value breaks inheritance for that breakpoint
4. **Zero Handling:** Zero values properly inherit from previous breakpoints

### Example Scenario
```
Default: 12 (full width mobile)
SM: 0 (inherits 12)
MD: 6 (half width tablet) ← Manual override
LG: 0 (inherits 6)
XL: 4 (one-third desktop) ← Manual override
XXL: 0 (inherits 4)

Result:
- Mobile: Full width (12)
- Small tablets: Full width (12)
- Tablets: Half width (6)
- Desktop: Half width (6)
- Large desktop: One-third (4)
- XL screens: One-third (4)
```

---

## Auto-Width Calculation

### How It Works
When column width is set to `0` (or not manually set), the block automatically calculates the appropriate width based on the number of sibling columns:

| Sibling Count | Auto Width | Bootstrap Class |
|---------------|------------|-----------------|
| 1 column | 12 | `col-12` |
| 2 columns | 6 | `col-6` |
| 3 columns | 4 | `col-4` |
| 4 columns | 3 | `col-3` |
| 6 columns | 2 | `col-2` |
| 12 columns | 1 | `col-1` |

### Manual Override
- Set any value from 1-12 to manually control column width
- Manual values override auto-calculation
- Each breakpoint can have its own manual value

---

## Usage Instructions

### Basic Usage

#### 1. Create a Layout
```
1. Add a BS Row block
2. Add BS Column blocks inside the row
3. Columns auto-calculate equal widths
```

**Example: 3 Equal Columns**
- Add BS Row
- Add 3 BS Column blocks
- Each automatically becomes `col-4` (one-third width)

#### 2. Responsive Layouts
```
1. Select a column
2. Grid Settings panel opens automatically
3. Switch between breakpoint tabs
4. Set custom widths for each breakpoint
```

**Example: Full Width Mobile, Half Width Desktop**
```
Default: 12 (full width)
MD: 6 (half width from tablet up)
```

#### 3. Add Content
```
1. Click inside a column
2. Add any WordPress blocks (text, images, etc.)
3. Content inherits column width
```

### Advanced Usage

#### Custom Breakpoint Control
For precise control over responsive behavior:

```
Mobile (Default): 12 columns (100%)
Tablet (MD): 6 columns (50%)
Desktop (LG): 4 columns (33.33%)
Large (XL): 3 columns (25%)
```

#### Column Offsets
Create spacing by offsetting columns:

```
Column 1:
- Width: 6
- Offset: 0

Column 2:
- Width: 4
- Offset: 2 (creates 2-column gap)
```

#### Asymmetric Layouts
Mix column widths for custom layouts:

```
Column 1: col-8 (66.66%)
Column 2: col-4 (33.33%)
```

---

## Frontend Output

### HTML Structure
```html
<div class="wp-block-bootstrap-blocks-bs-column col-6 col-md-4 col-lg-3">
  <!-- Column content -->
</div>
```

### Generated CSS Classes
The block generates Bootstrap 5 grid classes:

**Responsive Classes:**
```html
col-12           <!-- Full width mobile -->
col-sm-6         <!-- Half width small tablets -->
col-md-4         <!-- One-third tablets -->
col-lg-3         <!-- One-quarter desktops -->
col-xl-3         <!-- One-quarter large desktops -->
col-xxl-3        <!-- One-quarter XL screens -->
```

**Offset Classes:**
```html
offset-2         <!-- 2 column offset mobile -->
offset-md-3      <!-- 3 column offset tablets -->
```

### Editor Output
```html
<div class="wp-block-bootstrap-blocks-bs-column col-4">
  <!-- Uses XXL breakpoint for editor preview -->
</div>
```

---

## Technical Implementation

### File Structure
```
src/bs-column/
├── index.js      # Main block logic
├── block.json    # Block metadata and attributes
└── style.css     # Column styles
```

### Dependencies
```javascript
@wordpress/blocks          // Block registration
@wordpress/block-editor    // Editor components and InnerBlocks
@wordpress/components      // UI controls
@wordpress/element         // React hooks
@wordpress/data            // WordPress data store
```

### Key Functions

#### `getColumnClasses(attributes, siblingCount)`
Generates appropriate Bootstrap column classes based on:
- Current breakpoint values
- Number of sibling columns
- Offset values
- Cascading inheritance logic

**Returns:** String of Bootstrap classes

#### `calculateColumnWidth(siblingCount)`
Calculates equal column width based on number of siblings:
```javascript
// Examples:
calculateColumnWidth(2) // Returns 6 (50%)
calculateColumnWidth(3) // Returns 4 (33.33%)
calculateColumnWidth(4) // Returns 3 (25%)
```

#### `getCascadedValue(breakpoint, attributes)`
Implements cascading inheritance logic:
```javascript
// Gets value for a breakpoint, falling back to previous breakpoint
// if current breakpoint is not set (0 or undefined)
```

#### Sibling Detection
Uses WordPress data store to detect column siblings:
```javascript
const siblings = select('core/block-editor')
  .getBlock(getBlockParents(clientId)[0])
  ?.innerBlocks.filter(block => 
    block.name === 'bootstrap-blocks/bs-column'
  );
```

---

## Integration with BS Row

### Parent-Child Relationship
```
BS Row (Parent)
├── Container/Container-fluid
│   └── Row
│       ├── BS Column (Child 1)
│       ├── BS Column (Child 2)
│       └── BS Column (Child 3)
```

### How They Work Together

1. **BS Row** provides:
   - Container structure
   - Row wrapper with Bootstrap classes
   - Background and spacing controls
   - Responsive padding/margin

2. **BS Column** provides:
   - Column grid system
   - Responsive width control
   - Content placement
   - Offset capabilities

### Example Layout Structure
```html
<div class="emg-bs-sec-abc123">
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-6 col-lg-4">
        Column 1 Content
      </div>
      <div class="col-12 col-md-6 col-lg-4">
        Column 2 Content
      </div>
      <div class="col-12 col-md-12 col-lg-4">
        Column 3 Content
      </div>
    </div>
  </div>
</div>
```

---

## Best Practices

### Layout Design
1. **Mobile-First:** Start with mobile layout, then add tablet/desktop breakpoints
2. **Equal Columns:** Use auto-calculation for equal-width columns
3. **Custom Layouts:** Use manual values for asymmetric designs
4. **Test Responsive:** Preview at different screen sizes

### Column Width Guidelines
- **Content-Heavy:** Use 4-8 columns (50-66% width)
- **Sidebar Layouts:** Use 8-4 or 9-3 splits
- **Equal Columns:** Let auto-calculation handle it
- **Mobile:** Often best as full-width (col-12)

### Performance
- **Avoid Nesting:** Don't nest too many levels of rows/columns
- **Minimize Classes:** Use cascading inheritance to reduce CSS classes
- **Consistent Breakpoints:** Use same breakpoints across your site

### Accessibility
- **Logical Order:** Columns should follow logical reading order
- **Mobile Stacking:** Consider how columns stack on mobile
- **Focus Order:** Ensure tab order makes sense

---

## Common Layout Patterns

### Two Column Layout
```
Column 1: col-12 col-md-6
Column 2: col-12 col-md-6
```

### Three Column Layout
```
Column 1: col-12 col-md-4
Column 2: col-12 col-md-4
Column 3: col-12 col-md-4
```

### Sidebar Layout (70/30)
```
Main: col-12 col-lg-8
Sidebar: col-12 col-lg-4
```

### Hero with Thirds
```
Column 1: col-12 (mobile full)
          col-md-12 (tablet full)
          col-lg-4 (desktop third)

(Repeat for 3 columns)
```

### Asymmetric Layout
```
Featured: col-12 col-md-8
Secondary: col-12 col-md-4
```

---

## Troubleshooting

### Columns Not Side-by-Side
- **Check:** Editor CSS for flexbox layout
- **Solution:** Verify editor styles are loaded
- **CSS:** Ensure `.wp-block-bootstrap-blocks-bs-row` has `display: flex`

### Width Not Auto-Calculating
- **Check:** Console for JavaScript errors
- **Solution:** Rebuild with `npm run build`
- **Verify:** Sibling detection is working

### Breakpoint Persistence Not Working
- **Check:** Global state management
- **Solution:** Verify breakpoint state is stored correctly
- **Debug:** Check WordPress data store

### Incorrect Bootstrap Classes
- **Check:** `getColumnClasses()` function output
- **Solution:** Verify cascading inheritance logic
- **Inspect:** Check generated HTML classes

### Columns Stacking Incorrectly on Mobile
- **Check:** Default breakpoint values
- **Solution:** Set Default to `col-12` for mobile
- **Test:** Preview on actual mobile device

---

## Styling Customization

### Via Custom CSS
```css
/* All columns */
.wp-block-bootstrap-blocks-bs-column {
  padding: 15px;
}

/* Specific breakpoint adjustments */
@media (min-width: 768px) {
  .wp-block-bootstrap-blocks-bs-column {
    padding: 30px;
  }
}

/* First column */
.wp-block-bootstrap-blocks-bs-column:first-child {
  background-color: #f5f5f5;
}

/* Last column */
.wp-block-bootstrap-blocks-bs-column:last-child {
  border-right: none;
}
```

### Via Theme
Override in your theme's style.css:
```css
.wp-block-bootstrap-blocks-bs-column {
  --column-padding: 20px;
  --column-gap: 30px;
}
```

---

## Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ✅ Bootstrap 5 compatible

---

## Future Enhancements

Potential features for future versions:
- 🔄 Visual column width dragging
- 🔄 Gutters/spacing control between columns
- 🔄 Vertical alignment options
- 🔄 Column order control (flex-order)
- 🔄 Custom breakpoint definitions
- 🔄 Column templates/presets

---

## Support & Documentation

For more information, bug reports, or feature requests, please refer to:
- **Main Documentation:** `PROJECT_HISTORY.md`
- **Plugin File:** `bootstrap-blocks.php`
- **Source Code:** `src/bs-column/`
- **Related Blocks:** `BS-ROW.md`

---

*Last Updated: October 2025*  
*API Version: 2*  
*Status: Production Ready ✅*

