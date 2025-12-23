# BS Accordion Block

## Overview
The BS Accordion block is a fully customizable accordion/FAQ component for WordPress Gutenberg editor. It allows you to create collapsible content sections with multiple styling options and interactive behaviors.

**Block Name:** `bootstrap-blocks/bs-accordion`  
**Category:** Bootstrap Blocks  
**Icon:** Editor List (editor-ul)  
**Version:** 1.0.0

---

## Key Features

### Core Functionality
- ✅ **Multiple Accordion Items:** Add unlimited accordion items with unique content
- ✅ **Inline Editing:** Edit titles and content directly in the editor
- ✅ **Expandable/Collapsible:** Interactive accordion behavior with smooth transitions
- ✅ **Individual Item Control:** Each item has its own expand/collapse state
- ✅ **Drag & Drop Reordering:** Easily reorder accordion items

### Advanced Features
- ✅ **Allow Multiple Open:** Toggle to allow multiple items to be open simultaneously
- ✅ **Numbering System:** Optional numbering for accordion items (01, 02, 03, etc.)
- ✅ **Icon Styles:** Choose between different icon styles (plus-minus, chevron, arrow)
- ✅ **Custom Colors:** Full color customization for active/inactive states
- ✅ **Spacing Control:** Adjustable spacing between accordion items
- ✅ **Unique Block ID:** Auto-generated unique identifier for each block instance

---

## Block Attributes

### Items Array
```javascript
items: [
  {
    id: "item-1",
    title: "Accordion Title",
    content: "Accordion content goes here...",
    isOpen: true/false
  }
]
```

### Behavior Settings
| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `allowMultipleOpen` | boolean | `true` | Allow multiple items to be open at once |
| `showNumbering` | boolean | `true` | Display item numbers (01, 02, 03...) |
| `iconStyle` | string | `"plus-minus"` | Icon style: "plus-minus", "chevron", "arrow" |
| `itemSpacing` | number | `8` | Spacing between items (in pixels) |

### Color Settings
| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `backgroundColor` | string | `"#EAF9FF"` | Background color for closed items |
| `textColor` | string | `"#333333"` | Text color for closed items |
| `activeBackgroundColor` | string | `"#34B0E3"` | Background color for open items |
| `activeTextColor` | string | `"#ffffff"` | Text color for open items |

### System Attributes
| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `blockId` | string | `""` | Auto-generated unique block identifier |

---

## Editor Interface

### Inspector Controls (Right Sidebar)

#### 1. Accordion Settings Panel
- **Allow Multiple Open:** Toggle switch to allow multiple items open simultaneously
- **Show Numbering:** Toggle switch to display/hide item numbers
- **Icon Style:** Dropdown selector for icon style
  - Plus/Minus
  - Chevron
  - Arrow
- **Item Spacing:** Range slider (0-50px)

#### 2. Color Settings Panel
- **Background Color:** Color picker for inactive item background
- **Text Color:** Color picker for inactive item text
- **Active Background Color:** Color picker for active item background
- **Active Text Color:** Color picker for active item text

#### 3. Individual Item Controls
Each accordion item displays:
- **Editable Title:** Rich text field for the accordion header
- **Editable Content:** Rich text field for the accordion body
- **Delete Button (×):** Remove the accordion item
- **Move Up/Down Buttons:** Reorder items

### Main Editor Area
- Visual preview of accordion with proper styling
- Inline editing capabilities
- "Add Accordion Item" button to add new items
- Real-time preview of colors and spacing

---

## Usage Instructions

### Basic Usage

1. **Add the Block:**
   - Click the "+" button in the editor
   - Search for "BS Accordion" or "Accordion"
   - Click to add the block to your page

2. **Edit Content:**
   - Click on any accordion title to edit it
   - Click on any accordion content to edit it
   - Items come with default Lorem Ipsum text

3. **Add More Items:**
   - Click the "Add Accordion Item" button at the bottom
   - New items are added with default text

4. **Remove Items:**
   - Click the "×" button on any item to delete it
   - Minimum of 1 item required

5. **Reorder Items:**
   - Use the up/down arrow buttons to reorder items
   - Or drag and drop items to new positions

### Customization

#### Styling Colors
1. Open the right sidebar (Inspector Controls)
2. Navigate to "Color Settings" panel
3. Use color pickers to customize:
   - Inactive state colors (background + text)
   - Active state colors (background + text)

#### Behavior Settings
1. Open "Accordion Settings" panel
2. Toggle "Allow Multiple Open":
   - **ON:** Multiple items can be expanded at once
   - **OFF:** Opening one item closes all others (accordion mode)
3. Toggle "Show Numbering" to add/remove item numbers
4. Select icon style from dropdown menu

#### Spacing Adjustment
1. In "Accordion Settings" panel
2. Use the "Item Spacing" slider
3. Range: 0-50 pixels between items

---

## Frontend Output

### HTML Structure
```html
<div class="bs-accordion-container bs-accordion-{blockId}">
  <div class="bs-accordion-item" data-item-id="item-1">
    <div class="bs-accordion-header">
      <span class="bs-accordion-number">01</span>
      <h3 class="bs-accordion-title">Accordion Title</h3>
      <span class="bs-accordion-icon">+</span>
    </div>
    <div class="bs-accordion-content">
      <div class="bs-accordion-body">
        Accordion content goes here...
      </div>
    </div>
  </div>
  <!-- More items... -->
</div>

<style>
  .bs-accordion-{blockId} {
    /* Custom colors and spacing */
  }
</style>
```

### CSS Classes
- `.bs-accordion-container` - Main wrapper
- `.bs-accordion-item` - Individual accordion item
- `.bs-accordion-header` - Clickable header area
- `.bs-accordion-number` - Item number (if enabled)
- `.bs-accordion-title` - Item title text
- `.bs-accordion-icon` - Expand/collapse icon
- `.bs-accordion-content` - Collapsible content wrapper
- `.bs-accordion-body` - Content inner wrapper
- `.is-active` - Applied to open items

### JavaScript Functionality
The block includes frontend JavaScript that:
- Handles click events on accordion headers
- Animates the expand/collapse transitions
- Manages multiple open states based on settings
- Updates icon states (+ to -, etc.)

---

## Technical Implementation

### File Structure
```
src/bs-accordion/
├── index.js        # Main block registration and logic
├── block.json      # Block metadata and attributes
├── style.css       # Frontend and editor styles
└── template.js     # HTML generation helper
```

### Dependencies
```javascript
@wordpress/blocks          // Block registration
@wordpress/block-editor    // Editor components
@wordpress/components      // UI controls
@wordpress/element         // React hooks
```

### Key Functions

#### `addItem()`
Adds a new accordion item to the end of the list with default content.

#### `removeItem(index)`
Removes an accordion item at the specified index.

#### `updateItemTitle(index, title)`
Updates the title of a specific accordion item.

#### `updateItemContent(index, content)`
Updates the content of a specific accordion item.

#### `toggleItem(index)`
Toggles the open/closed state of an item. Handles multiple open logic.

#### `moveItemUp(index)` / `moveItemDown(index)`
Moves an accordion item up or down in the order.

#### `generateAccordionHTML(attributes)`
External template function that generates the frontend HTML output.

---

## Styling Customization

### Via Block Settings
All color customizations are available through the block settings panel with visual color pickers.

### Via Custom CSS
You can target specific elements with CSS:

```css
/* Target all accordions */
.bs-accordion-container {
  /* Your styles */
}

/* Target specific accordion by ID */
.bs-accordion-abc123 {
  /* Your styles */
}

/* Customize headers */
.bs-accordion-header {
  font-weight: bold;
  transition: all 0.3s ease;
}

/* Customize active state */
.bs-accordion-item.is-active .bs-accordion-header {
  /* Your active styles */
}

/* Customize content area */
.bs-accordion-content {
  padding: 20px;
}

/* Icon styles */
.bs-accordion-icon {
  font-size: 24px;
  transition: transform 0.3s ease;
}
```

### Via Theme
You can override default styles in your theme's CSS file:

```css
.bs-accordion-container {
  --accordion-border-radius: 8px;
  --accordion-transition-speed: 0.3s;
  --accordion-padding: 20px;
}
```

---

## Use Cases

### FAQ Section
Perfect for frequently asked questions with clean, organized presentation:
- Allow multiple open: ON
- Show numbering: ON
- Professional color scheme

### Product Features
Showcase product features with expandable details:
- Allow multiple open: OFF (one at a time)
- Show numbering: OFF
- Brand colors

### Documentation
Create expandable documentation sections:
- Allow multiple open: ON
- Show numbering: ON
- Clear hierarchy with numbering

### Content Sections
Organize long-form content into manageable sections:
- Custom colors to match site design
- Adjustable spacing for visual hierarchy

---

## Accessibility

The BS Accordion block is built with accessibility in mind:

- ✅ **Keyboard Navigation:** Full keyboard support (Tab, Enter, Space)
- ✅ **ARIA Attributes:** Proper aria-expanded, aria-controls
- ✅ **Focus Management:** Visual focus indicators
- ✅ **Screen Reader Support:** Semantic HTML structure
- ✅ **Color Contrast:** Customizable colors for WCAG compliance

---

## Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## Troubleshooting

### Accordion Not Expanding/Collapsing
- **Check:** Ensure frontend JavaScript is loaded
- **Solution:** Verify `editorScript` is properly enqueued in `bootstrap-blocks.php`

### Colors Not Applying
- **Check:** Inspect element to verify CSS is generated
- **Solution:** Ensure unique `blockId` is generated

### Numbering Not Showing
- **Check:** Verify "Show Numbering" toggle is ON
- **Solution:** Check CSS for `.bs-accordion-number` display property

### Multiple Items Opening When They Shouldn't
- **Check:** "Allow Multiple Open" setting
- **Solution:** Toggle OFF for accordion mode (one at a time)

### Items Not Reordering
- **Check:** JavaScript console for errors
- **Solution:** Rebuild block with `npm run build`

---

## Best Practices

1. **Content Length:** Keep accordion titles concise (1-2 lines)
2. **Number of Items:** Optimal 3-8 items per accordion block
3. **Color Contrast:** Ensure sufficient contrast for accessibility
4. **Mobile Optimization:** Test on mobile devices for touch interactions
5. **Default State:** Consider which items should be open by default
6. **Consistent Styling:** Use similar accordion styles across your site

---

## Future Enhancements

Potential features for future versions:
- 🔄 Animation speed control
- 🔄 Custom icon upload
- 🔄 Border and shadow options
- 🔄 Typography controls
- 🔄 Anchor links to individual items
- 🔄 Search/filter functionality

---

## Support & Documentation

For more information, bug reports, or feature requests, please refer to:
- **Main Documentation:** `PROJECT_HISTORY.md`
- **Plugin File:** `bootstrap-blocks.php`
- **Source Code:** `src/bs-accordion/`

---

*Last Updated: October 2025*  
*Version: 1.0.0*  
*Status: Production Ready ✅*

