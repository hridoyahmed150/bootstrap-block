# BS Row Block

## Overview
The BS Row block is a powerful Bootstrap 5 row component with advanced background options, responsive spacing controls, and flexible container width settings. It serves as the parent container for BS Column blocks and provides comprehensive layout control.

**Block Name:** `bootstrap-blocks/bs-row`  
**Category:** Layout  
**Icon:** Columns  
**API Version:** 2  
**Status:** Production Ready ✅

---

## Key Features

### Core Functionality
- ✅ **Bootstrap 5 Container System:** Full-width, wide, boxed, or custom width containers
- ✅ **Responsive Spacing:** Individual padding and margin controls for all 6 breakpoints
- ✅ **Background System:** Solid colors, images, gradients with overlay support
- ✅ **Inner Blocks Support:** Nest BS Column blocks and other content
- ✅ **Scoped CSS:** Unique class per block instance with dynamically generated styles
- ✅ **Cascading Inheritance:** Smart spacing value inheritance across breakpoints

### Background Options
- ✅ **Solid Color:** Simple background color picker
- ✅ **Background Image:** Full media library integration with size, position, repeat controls
- ✅ **Gradient:** Linear gradients with customizable direction and color stops
- ✅ **Overlay System:** Color overlay with opacity control for backgrounds
- ✅ **Multiple Layers:** Combine image + overlay for creative effects

### Spacing System
- ✅ **Six Breakpoints:** Default, SM, MD, LG, XL, XXL
- ✅ **Individual Controls:** Top, Right, Bottom, Left for both padding and margin
- ✅ **Default Values:** Smart defaults (70px vertical padding, 0px horizontal)
- ✅ **Cascading:** Higher breakpoints inherit from lower ones
- ✅ **Editor Preview:** 1/3 scale factor for better editing experience
- ✅ **Zero Handling:** Smart CSS generation only applies non-zero margins

---

## Block Attributes

### Container Settings
| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `uniqueId` | string | auto-generated | Unique identifier for scoped CSS |
| `containerWidth` | string | `"full-width"` | Container width: "full-width", "wide", "boxed", "custom" |
| `containerWidthCustom` | number | `1200` | Custom width in pixels (when containerWidth is "custom") |
| `className` | string | `""` | Additional CSS classes for wrapper |
| `rowClassName` | string | `""` | Additional CSS classes for row element |

### Background Settings
| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `backgroundType` | string | `"none"` | Background type: "none", "color", "image", "gradient" |
| `backgroundColor` | string | `""` | Solid background color |
| `backgroundImageUrl` | string | `""` | Background image URL |
| `backgroundImageId` | number | `0` | Background image media ID |
| `backgroundImageSize` | string | `"cover"` | CSS background-size: "cover", "contain", "auto" |
| `backgroundImagePosition` | string | `"center center"` | CSS background-position |
| `backgroundImageRepeat` | string | `"no-repeat"` | CSS background-repeat |
| `gradientType` | string | `"linear"` | Gradient type (currently only linear) |
| `gradientDirection` | string | `"to right"` | Gradient direction |
| `gradientColor1` | string | `"#000000"` | First gradient color |
| `gradientColor2` | string | `"#ffffff"` | Second gradient color |
| `gradientStop1` | number | `0` | First color stop (%) |
| `gradientStop2` | number | `100` | Second color stop (%) |
| `overlayType` | string | `"none"` | Overlay type: "none", "color" |
| `overlayColor` | string | `"#000000"` | Overlay color |
| `overlayOpacity` | number | `50` | Overlay opacity (0-100) |

### Responsive Spacing
Each breakpoint (default, sm, md, lg, xl, xxl) has:
```javascript
{
  paddingTop: 70,
  paddingRight: 0,
  paddingBottom: 70,
  paddingLeft: 0,
  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0
}
```

---

## Bootstrap Breakpoints

| Breakpoint | Min Width | Description |
|------------|-----------|-------------|
| **Default** | 0px | Mobile devices |
| **SM** | 576px | Small tablets (portrait) |
| **MD** | 768px | Tablets (landscape) |
| **LG** | 992px | Desktops |
| **XL** | 1200px | Large desktops |
| **XXL** | 1400px | Extra large screens |

---

## Editor Interface

### Inspector Controls (Right Sidebar)

#### 1. Container Width Panel
- **Width Options:**
  - Full Width (100%)
  - Wide (1400px max)
  - Boxed (1200px max)
  - Custom (specify px value)
- **Custom Width Input:** Number field (when "Custom" is selected)

#### 2. Background Settings Panel
**Background Type:** Radio button selector
- None (no background)
- Solid Color
- Image
- Gradient

**Solid Color Options:**
- Color picker for background color

**Image Options:**
- Media upload button
- Background Size: dropdown (cover, contain, auto)
- Background Position: dropdown (center, top, bottom, etc.)
- Background Repeat: dropdown (no-repeat, repeat, repeat-x, repeat-y)

**Gradient Options:**
- Gradient Direction: dropdown (to right, to bottom, 45deg, etc.)
- Color 1: color picker
- Color 2: color picker
- Color Stop 1: range slider (0-100%)
- Color Stop 2: range slider (0-100%)

#### 3. Overlay Settings Panel
- **Overlay Type:** Toggle (none, color)
- **Overlay Color:** Color picker
- **Overlay Opacity:** Range slider (0-100%)

#### 4. Spacing Panel
**Breakpoint Tabs:**
- Default | SM | MD | LG | XL | XXL

**For Each Breakpoint:**

**Padding Controls:**
- Padding Top (px)
- Padding Right (px)
- Padding Bottom (px)
- Padding Left (px)

**Margin Controls:**
- Margin Top (px)
- Margin Right (px)
- Margin Bottom (px)
- Margin Left (px)

**Features:**
- Full-width inputs
- Number inputs with increment/decrement buttons
- Active breakpoint tab highlighted
- Real-time preview in editor (at 1/3 scale)

### Main Editor Area
- Visual preview of the row with applied backgrounds
- Transparent control area showing "BS Row Block"
- Inner blocks (columns) displayed inside
- 90% width for better editing experience
- Background preview at reduced opacity for better content visibility

---

## Usage Instructions

### Basic Usage

#### 1. Create a Row Layout
```
1. Add BS Row block to page
2. Add BS Column blocks inside the row
3. Add content inside the columns
```

#### 2. Set Container Width
```
1. Open "Container Width" panel
2. Select width option:
   - Full Width: Edge-to-edge
   - Wide: 1400px max
   - Boxed: 1200px max (standard)
   - Custom: Specify exact pixels
```

#### 3. Add Background
```
Solid Color:
1. Select "Solid Color" background type
2. Choose color from picker

Image:
1. Select "Image" background type
2. Click "Upload Background Image"
3. Select or upload image
4. Adjust size, position, repeat

Gradient:
1. Select "Gradient" background type
2. Choose direction
3. Pick two colors
4. Adjust color stops
```

#### 4. Add Overlay (Optional)
```
1. Open "Overlay Settings"
2. Enable overlay
3. Choose overlay color
4. Adjust opacity slider
```

#### 5. Adjust Spacing
```
1. Open "Spacing" panel
2. Select breakpoint tab
3. Adjust padding values (internal spacing)
4. Adjust margin values (external spacing)
5. Higher breakpoints inherit from lower ones
```

### Advanced Usage

#### Cascading Spacing Example
```
Default (Mobile):
- Padding: 40px top/bottom, 15px left/right

MD (Tablet):
- Padding: 60px top/bottom
- (Inherits 15px left/right from Default)

LG (Desktop):
- Padding: 70px top/bottom
- (Still inherits 15px left/right)
```

#### Background + Overlay Effect
```
1. Add background image
2. Enable color overlay
3. Set overlay to dark color (#000000)
4. Set opacity to 50%
5. Result: Darkened background, readable text
```

#### Full-Width Hero Section
```
Container Width: Full Width
Background: Image (hero-bg.jpg)
Overlay: Black at 40% opacity
Padding: 100px top/bottom (Desktop)
Content: Centered text and CTA button
```

---

## Frontend Output

### HTML Structure
```html
<div class="emg-bs-sec-{uniqueId}">
  <div class="container">
    <div class="row">
      <!-- Inner blocks (columns) -->
    </div>
  </div>
</div>

<style>
  .emg-bs-sec-{uniqueId} {
    /* Base styles */
    padding-top: 70px;
    padding-bottom: 70px;
    background-color: #f5f5f5;
    position: relative;
  }
  
  /* Overlay */
  .emg-bs-sec-{uniqueId}::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
    z-index: 1;
  }
  
  .emg-bs-sec-{uniqueId} > .container {
    position: relative;
    z-index: 2;
  }
  
  /* Responsive styles */
  @media (min-width: 576px) {
    .emg-bs-sec-{uniqueId} {
      padding-top: 70px;
      padding-bottom: 70px;
    }
  }
  
  @media (min-width: 768px) {
    .emg-bs-sec-{uniqueId} {
      padding-top: 70px;
      padding-bottom: 70px;
    }
  }
  
  /* ... More breakpoints ... */
</style>
```

### Container Width Classes
- **Full Width:** No max-width constraint
- **Wide:** `max-width: 1400px`
- **Boxed:** `max-width: 1200px`
- **Custom:** `max-width: {custom}px`

All have `margin: 0 auto` for centering.

---

## Technical Implementation

### File Structure
```
src/bs-row/
├── index.js      # Main block registration and logic
├── block.json    # Block metadata and attributes
└── style.css     # Row styles
```

### Dependencies
```javascript
@wordpress/blocks          // Block registration
@wordpress/block-editor    // InnerBlocks, MediaUpload
@wordpress/components      // UI controls
@wordpress/element         // React hooks (useState, useEffect)
```

### Key Functions

#### `generateUniqueId(clientId)`
Generates a unique ID for the row based on WordPress block clientId:
```javascript
// Returns: 'abc123def456'
```

#### `generateSpacingCSS(attributes, scaleFactor)`
Generates responsive CSS for padding and margin:
- Implements cascading inheritance logic
- Applies scale factor for editor preview (1/3 scale)
- Only generates CSS for non-zero margin values
- Creates media queries for each breakpoint

**Returns:** CSS string with responsive spacing rules

#### `generateBackgroundCSS(attributes)`
Generates CSS for background styles:
- Handles solid colors
- Background image with size, position, repeat
- Linear gradients with color stops
- Overlay pseudo-element

**Returns:** CSS string with background rules

#### `getContainerWidthCSS(containerWidth, customWidth)`
Generates container width CSS based on selected option:
```javascript
// full-width: No max-width
// wide: max-width: 1400px
// boxed: max-width: 1200px
// custom: max-width: {customWidth}px
```

**Returns:** CSS string for container width

#### `getCascadedSpacing(breakpoint, attributes)`
Implements cascading inheritance:
```javascript
// Gets spacing for a breakpoint, falling back to lower breakpoints
// Example: LG inherits from MD if LG values are at default
```

---

## Cascading Inheritance System

### How It Works

The BS Row block uses a bottom-to-top cascading system:

```
Default → SM → MD → LG → XL → XXL
```

### Inheritance Rules

1. **Default is Base:** All breakpoints start with Default values
2. **Cascade Upward:** Each breakpoint inherits from the one below it
3. **Manual Override:** Changing a value breaks inheritance for that breakpoint
4. **Zero Margins:** Only applies margin CSS if values > 0 (avoids redundant CSS)

### Example Scenario

```javascript
Default: { paddingTop: 40, paddingBottom: 40 }
SM: { } // Inherits Default (40/40)
MD: { paddingTop: 60, paddingBottom: 60 } // Override
LG: { } // Inherits MD (60/60)
XL: { paddingTop: 80, paddingBottom: 80 } // Override
XXL: { } // Inherits XL (80/80)
```

Generated CSS:
```css
.emg-bs-sec-abc123 {
  padding-top: 40px;
  padding-bottom: 40px;
}

@media (min-width: 768px) {
  .emg-bs-sec-abc123 {
    padding-top: 60px;
    padding-bottom: 60px;
  }
}

@media (min-width: 1200px) {
  .emg-bs-sec-abc123 {
    padding-top: 80px;
    padding-bottom: 80px;
  }
}
```

---

## Integration with BS Column

### Parent-Child Structure
```
BS Row (Parent)
└── Container
    └── Row
        ├── BS Column
        ├── BS Column
        └── BS Column
```

### Workflow

1. **Add BS Row:** Creates container + row structure
2. **Add BS Columns:** Columns auto-calculate widths
3. **Add Content:** Content goes inside columns
4. **Style Row:** Background and spacing via row settings
5. **Style Columns:** Column widths via column settings

### Example Complete Layout
```html
<div class="emg-bs-sec-abc123"> <!-- BS Row -->
  <div class="container">
    <div class="row">
      <div class="col-md-4"> <!-- BS Column 1 -->
        Content 1
      </div>
      <div class="col-md-4"> <!-- BS Column 2 -->
        Content 2
      </div>
      <div class="col-md-4"> <!-- BS Column 3 -->
        Content 3
      </div>
    </div>
  </div>
</div>
```

---

## Styling Customization

### Via Custom CSS

```css
/* Target specific row */
.emg-bs-sec-abc123 {
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

/* Override container width */
.emg-bs-sec-abc123 .container {
  max-width: 1600px;
}

/* Adjust row gutters */
.emg-bs-sec-abc123 .row {
  row-gap: 30px;
}

/* Custom overlay effects */
.emg-bs-sec-abc123::before {
  background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.8));
}
```

### Via Theme
```css
:root {
  --row-default-padding: 70px;
  --row-container-max: 1200px;
  --row-overlay-default: 0.5;
}

.emg-bs-sec {
  padding-top: var(--row-default-padding);
  padding-bottom: var(--row-default-padding);
}
```

---

## Common Use Cases

### Hero Section
```
Container: Full Width
Background: Image + overlay
Padding: 120px top/bottom (desktop), 60px (mobile)
Content: Centered heading + CTA
```

### Content Section
```
Container: Boxed
Background: Solid color or none
Padding: 70px top/bottom
Content: 3 columns with text/images
```

### Call-to-Action Section
```
Container: Wide
Background: Gradient
Padding: 80px top/bottom
Content: Centered text + button
```

### Feature Grid
```
Container: Boxed
Background: None
Padding: 50px top/bottom
Content: 4 columns with icons + text
```

### Testimonial Section
```
Container: Full Width
Background: Image with overlay
Padding: 100px top/bottom
Content: BS Testimonial block
```

---

## Best Practices

### Background Images
1. **Resolution:** Use high-resolution images (1920px+ width)
2. **File Size:** Optimize to <200KB for performance
3. **Format:** Use WebP or optimized JPG
4. **Position:** Test background-position for key focal points
5. **Overlay:** Use overlay for text readability

### Spacing
1. **Mobile-First:** Start with mobile padding, increase for desktop
2. **Consistency:** Use consistent spacing increments (20px, 40px, 60px, 80px)
3. **Vertical Rhythm:** Keep vertical spacing consistent across sections
4. **Margins:** Use margins sparingly, prefer padding for internal spacing

### Container Width
1. **Content Sections:** Use "Boxed" (1200px) for reading comfort
2. **Hero Sections:** Use "Full Width" for impact
3. **Galleries:** Use "Wide" (1400px) for more space
4. **Custom:** Reserve for specific design requirements

### Performance
1. **Limit Backgrounds:** Too many background images slow page load
2. **Lazy Load:** Consider lazy loading for background images
3. **CSS Optimization:** Block generates minimal, scoped CSS
4. **Mobile:** Smaller images for mobile breakpoints

---

## Troubleshooting

### Background Not Showing
- **Check:** Verify image URL is correct and accessible
- **Solution:** Re-upload image through Media Library
- **Issue:** Check if overlay opacity is set to 100% (blocks image)

### Spacing Not Applied
- **Check:** Inspect element to see generated CSS
- **Solution:** Verify unique ID is generated correctly
- **Issue:** Check for CSS conflicts with theme styles

### Editor Preview Looks Wrong
- **Check:** Editor uses 1/3 scale for spacing
- **Solution:** This is intentional for better editing experience
- **Verify:** Preview on frontend for accurate spacing

### React Error #130
- **Check:** Console for unused imports
- **Solution:** Remove unused imports from index.js
- **Rebuild:** Run `npm run build`

### Duplicate Styles
- **Check:** Multiple blocks with same ID
- **Solution:** Verify each block generates unique ID on creation
- **Issue:** Clear block cache and recreate

---

## Accessibility

- ✅ **Semantic Structure:** Uses proper HTML5 structure
- ✅ **Color Contrast:** Overlay system helps maintain text contrast
- ✅ **Keyboard Navigation:** All inner content accessible via keyboard
- ✅ **Screen Readers:** Semantic container structure
- ⚠️ **Background Images:** Decorative, not conveying information

### Accessibility Tips
1. **Text Contrast:** Ensure text has sufficient contrast over backgrounds
2. **Focus Indicators:** Don't hide focus outlines
3. **Heading Hierarchy:** Use proper heading levels inside rows
4. **Alternative Content:** Don't rely on background images to convey info

---

## Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers
- ✅ CSS Grid & Flexbox support required

---

## Future Enhancements

- 🔄 Vertical alignment controls
- 🔄 Border and shadow options
- 🔄 Animation controls (parallax, fade-in)
- 🔄 Video backgrounds
- 🔄 Pattern backgrounds
- 🔄 Custom CSS class input
- 🔄 Row templates/presets

---

## Support & Documentation

For more information:
- **Main Documentation:** `PROJECT_HISTORY.md`
- **Plugin File:** `bootstrap-blocks.php`
- **Source Code:** `src/bs-row/`
- **Related:** `BS-COLUMN.md`

---

*Last Updated: October 2025*  
*API Version: 2*  
*Status: Production Ready ✅*

