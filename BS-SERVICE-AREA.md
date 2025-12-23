# BS Service Area Block

## Overview
The BS Service Area block displays a service area map with a list of service locations. Perfect for businesses that want to showcase their service coverage areas with an interactive map and clickable city links.

**Block Name:** `bootstrap-blocks/bs-service-area`  
**Category:** Bootstrap Blocks  
**Icon:** Location Alt  
**Version:** 1.0.0

---

## Key Features

### Core Functionality
- ✅ **Google Maps Integration:** Embed custom coverage area maps
- ✅ **Dynamic Service Areas:** Add unlimited city/location entries
- ✅ **Clickable Links:** Each location can link to a dedicated page
- ✅ **Flexible Layout:** Map can be positioned left or right
- ✅ **Customizable Ratio:** Adjust map-to-list column ratio (8-4, 6-6, 5-7)
- ✅ **Drag & Drop Reordering:** Easily reorder service locations

### Styling Options
- ✅ **Title Colors:** Customize title text and background colors
- ✅ **Item Colors:** Customize location item colors (normal state)
- ✅ **Hover Effects:** Separate colors for hover state
- ✅ **Icon Support:** Custom location marker icons (gray/white)
- ✅ **Responsive Design:** Mobile-optimized stacked layout
- ✅ **Wide/Full Width Support:** Align with container width options

---

## Block Attributes

### Map Settings
| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `mapEmbedUrl` | string | `""` | Google Maps embed URL |
| `mapPosition` | string | `"left"` | Map position: "left" or "right" |
| `mapListRatio` | string | `"8-4"` | Column ratio: "8-4", "6-6", or "5-7" |

### Service Areas Array
```javascript
serviceAreas: [
  {
    cityName: "Boise, ID",
    url: ""
  },
  {
    cityName: "Cascade, ID",
    url: ""
  }
]
```

### Color Customization
| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `titleColor` | string | `"#06AFE2"` | Title text color |
| `titleBackground` | string | `"rgba(0, 97, 166, 0.03)"` | Title background color |
| `itemColor` | string | `"#000000"` | Location item text color |
| `itemBackground` | string | `"#ffffff"` | Location item background |
| `itemHoverColor` | string | `"#ffffff"` | Item text color on hover |
| `itemHoverBackground` | string | `"#06AFE2"` | Item background on hover |

---

## Column Ratio Options

The block supports three map-to-list column ratios:

| Ratio | Map Width | List Width | Best For |
|-------|-----------|------------|----------|
| **8-4** | 66.66% (8 cols) | 33.33% (4 cols) | Emphasize map |
| **6-6** | 50% (6 cols) | 50% (6 cols) | Equal emphasis |
| **5-7** | 41.66% (5 cols) | 58.33% (7 cols) | Emphasize list |

All ratios use `col-12` on mobile (stack vertically).

---

## Editor Interface

### Inspector Controls (Right Sidebar)

#### 1. Map Settings Panel
- **Google Maps Embed URL:** Text input
  - Help: "Paste the Google Maps embed URL here"
- **Map Position Right:** Toggle switch
  - ON: Map displays on right
  - OFF: Map displays on left (default)
- **Map/List Ratio:** Dropdown selector
  - 8-4 (Map Emphasis)
  - 6-6 (Equal)
  - 5-7 (List Emphasis)

#### 2. Service Areas Panel
For each service area:
- **City Name:** Text input
  - Example: "Tampa, FL" or "Hillsborough County"
- **URL:** Text input (optional)
  - Link to city-specific landing page
- **Delete Button (×):** Remove service area
- **Move Up/Down Buttons:** Reorder in list

**Add Service Area Button:** Add new locations

#### 3. Title Colors Panel
- **Title Text Color:** Color picker
- **Title Background Color:** Color picker (supports RGBA for transparency)

#### 4. Item Colors Panel
- **Item Text Color:** Color picker
- **Item Background Color:** Color picker
- **Item Hover Text Color:** Color picker
- **Item Hover Background Color:** Color picker

### Main Editor Area
- Visual preview of layout with map and service list
- Real-time color updates
- Map position reflects settings
- Service areas displayed as styled list items

---

## Usage Instructions

### Basic Setup

#### 1. Add the Block
```
1. Click "+" button in editor
2. Search for "BS Service Area"
3. Click to add block to page
```

#### 2. Add Google Maps
```
1. Create a custom map in Google My Maps:
   - Go to https://mymaps.google.com
   - Create new map
   - Draw your service area boundaries
   - Style the map
   
2. Get embed URL:
   - Click "Share"
   - Get embed link
   - Copy the iframe src URL
   
3. Paste in "Google Maps Embed URL" field
```

#### 3. Add Service Locations
```
1. Scroll to "Service Areas" panel
2. Default locations are pre-filled
3. Edit city names:
   - Click on city name field
   - Type your city/location name
   
4. Add URLs (optional):
   - Enter full URL to city-specific page
   - Example: https://yoursite.com/tampa
   
5. Add more locations:
   - Click "Add Service Area" button
   - Fill in city name and URL
```

#### 4. Customize Layout
```
1. Choose map position:
   - Toggle "Map Position Right"
   
2. Select column ratio:
   - 8-4: Large map, small list
   - 6-6: Equal sizes
   - 5-7: Small map, large list
```

#### 5. Customize Colors
```
1. Open "Title Colors" panel:
   - Set title text color
   - Set title background color
   
2. Open "Item Colors" panel:
   - Set normal state colors
   - Set hover state colors
```

### Advanced Usage

#### Custom Google Map Creation

1. **Go to Google My Maps**
   - Visit https://mymaps.google.com
   - Sign in with Google account

2. **Create New Map**
   - Click "Create a New Map"
   - Name your map (e.g., "Service Coverage Area")

3. **Add Service Area**
   - Use drawing tools to outline service area
   - Add markers for key cities
   - Customize colors and styles

4. **Get Embed Code**
   - Click menu (⋮)
   - Select "Embed on my site"
   - Copy iframe src URL
   - Paste in block settings

#### Multiple Service Area Blocks
For businesses with multiple service regions:
```
1. Create separate maps for each region
2. Add multiple BS Service Area blocks
3. Use BS Row + BS Column for layout
4. Example: North Region | South Region side-by-side
```

#### Reordering Locations
Organize cities by priority:
```
1. Use move up/down arrows
2. Or manually reorder in settings
3. Consider ordering by:
   - Alphabetically
   - By population
   - By service priority
   - By region/county
```

---

## Frontend Output

### HTML Structure
```html
<div class="bs-servicearea-container">
  <div class="bs-servicearea-layout">
    <!-- Map Column -->
    <div class="bs-servicearea-map col-12 col-lg-8">
      <iframe 
        src="[Google Maps Embed URL]"
        width="100%" 
        height="600"
        style="border:0;"
        allowfullscreen=""
        loading="lazy">
      </iframe>
    </div>
    
    <!-- Service Areas List -->
    <div class="bs-servicearea-list col-12 col-lg-4">
      <div class="bs-servicearea-title">
        Service Areas
      </div>
      <ul class="bs-servicearea-items">
        <li class="bs-servicearea-item">
          <span class="bs-servicearea-icon">📍</span>
          <a href="[URL]" class="bs-servicearea-link">
            Boise, ID
          </a>
        </li>
        <!-- More items... -->
      </ul>
    </div>
  </div>
</div>

<style>
  .bs-servicearea-{blockId} {
    /* Custom colors applied */
  }
</style>
```

### CSS Classes
- `.bs-servicearea-container` - Main wrapper
- `.bs-servicearea-layout` - Two-column layout wrapper
- `.bs-servicearea-map` - Map container column
- `.bs-servicearea-list` - Service list column
- `.bs-servicearea-title` - "Service Areas" heading
- `.bs-servicearea-items` - Unordered list of locations
- `.bs-servicearea-item` - Individual location item
- `.bs-servicearea-icon` - Location marker icon
- `.bs-servicearea-link` - Clickable city link

### Layout Examples

#### 8-4 Ratio (Default)
```
┌─────────────────────────────────┐
│         Service Areas           │
├─────────────────────┬───────────┤
│                     │ • Boise   │
│    [Google Map]     │ • Cascade │
│    (66% width)      │ • Eagle   │
│                     │ • Meridian│
└─────────────────────┴───────────┘
```

#### 6-6 Ratio (Equal)
```
┌─────────────────────────────────┐
│         Service Areas           │
├───────────────┬─────────────────┤
│               │ • Boise         │
│  [Google Map] │ • Cascade       │
│  (50% width)  │ • Eagle         │
│               │ • Meridian      │
└───────────────┴─────────────────┘
```

#### 5-7 Ratio (List Emphasis)
```
┌─────────────────────────────────┐
│         Service Areas           │
├──────────┬──────────────────────┤
│          │ • Boise              │
│ [Google  │ • Cascade            │
│  Map]    │ • Eagle              │
│ (42%)    │ • Meridian           │
│          │ • More cities...     │
└──────────┴──────────────────────┘
```

---

## Use Cases

### Local Service Businesses
Perfect for businesses serving specific geographic areas:
- HVAC companies
- Plumbing services
- Landscaping
- Home cleaning
- Pest control

**Example:** "We Serve These Cities in Idaho"
- Map showing service radius
- List of all cities covered
- Links to city-specific landing pages

### Real Estate Agencies
Showcase market coverage:
- List of neighborhoods served
- County/region boundaries on map
- Links to local market pages

### Delivery & Transportation
Display delivery zones:
- Coverage area map
- List of delivery locations
- Service area boundaries

### Healthcare Providers
Show clinic/hospital locations:
- Multiple location markers
- List of cities with clinics
- Links to location-specific pages

### Franchise/Multi-Location Businesses
Display all locations:
- Map with all locations marked
- Clickable list of locations
- Links to individual location pages

---

## Technical Implementation

### File Structure
```
src/bs-service-area/
├── index.js                  # Main block logic
├── block.json                # Block metadata and attributes
├── style.css                 # Frontend and editor styles
├── template.js               # HTML generation helper
└── images/
    ├── map-marker-gray.png   # Gray location marker
    └── map-marker-white.png  # White location marker
```

### Dependencies
```javascript
@wordpress/blocks          // Block registration
@wordpress/block-editor    // Editor components
@wordpress/components      // UI controls
@wordpress/i18n           // Internationalization
```

### Key Functions

#### `addServiceArea()`
Adds a new service area to the list:
```javascript
{
  cityName: '',
  url: ''
}
```

#### `removeServiceArea(index)`
Removes a service area at the specified index.

#### `updateServiceArea(index, field, value)`
Updates a specific field of a service area:
```javascript
updateServiceArea(0, 'cityName', 'Tampa, FL');
updateServiceArea(0, 'url', 'https://site.com/tampa');
```

#### `moveServiceArea(index, direction)`
Moves a service area up or down in the list:
```javascript
moveServiceArea(2, 'up');   // Move index 2 up to index 1
moveServiceArea(2, 'down'); // Move index 2 down to index 3
```

#### `getColumnClasses()`
Returns Bootstrap column classes based on selected ratio:
```javascript
// 8-4: { map: 'col-12 col-lg-8', list: 'col-12 col-lg-4' }
// 6-6: { map: 'col-12 col-lg-6', list: 'col-12 col-lg-6' }
// 5-7: { map: 'col-12 col-lg-5', list: 'col-12 col-lg-7' }
```

#### `getResponsiveColumnClasses()`
Handles cases where map or list is missing:
- Both present: Use selected ratio
- Only map: Full width for map, hide list
- Only list: Hide map, full width for list

#### `generateServiceAreaHTML(attributes)`
External template function that generates frontend HTML with:
- Styled service area list
- Embedded map
- Custom colors applied
- Responsive layout

---

## Styling Customization

### Via Block Settings
All color customizations available through color pickers in the block settings.

### Via Custom CSS

```css
/* Container */
.bs-servicearea-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* Layout */
.bs-servicearea-layout {
  display: flex;
  gap: 30px;
  align-items: flex-start;
}

@media (max-width: 991px) {
  .bs-servicearea-layout {
    flex-direction: column;
  }
}

/* Map */
.bs-servicearea-map iframe {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

/* Title */
.bs-servicearea-title {
  font-size: 24px;
  font-weight: bold;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
}

/* List items */
.bs-servicearea-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.bs-servicearea-item {
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 4px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
}

.bs-servicearea-link {
  text-decoration: none;
  font-weight: 500;
  flex: 1;
}

.bs-servicearea-icon {
  font-size: 20px;
}

/* Hover effects */
.bs-servicearea-item:hover {
  transform: translateX(5px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
```

### Via Theme
```css
:root {
  --servicearea-title-color: #06AFE2;
  --servicearea-item-color: #000;
  --servicearea-hover-bg: #06AFE2;
  --servicearea-spacing: 20px;
}

.bs-servicearea-container {
  --title-color: var(--servicearea-title-color);
  --item-color: var(--servicearea-item-color);
}
```

---

## SEO Benefits

### Local SEO
The BS Service Area block provides several SEO benefits:

1. **Geographic Keywords:** City names in HTML
2. **Internal Linking:** Links to city-specific pages
3. **Service Area Coverage:** Clear indication of service areas
4. **Structured Data:** Can be enhanced with schema markup

### Schema Markup Enhancement
Add structured data for better SEO:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Your Business",
  "areaServed": [
    {
      "@type": "City",
      "name": "Boise",
      "containedIn": "Idaho"
    }
  ]
}
</script>
```

---

## Best Practices

### Content Guidelines
1. **City Names:** Use consistent format (City, State)
2. **Number of Locations:** 10-30 locations optimal for readability
3. **Grouping:** Consider grouping by county or region for many locations
4. **URLs:** Link to dedicated city pages for better SEO
5. **Map:** Ensure map clearly shows service boundaries

### Map Guidelines
1. **Coverage Area:** Draw clear boundaries on the map
2. **Key Cities:** Mark major cities with pins
3. **Zoom Level:** Set appropriate zoom to show full service area
4. **Style:** Use brand colors in map styling
5. **Clarity:** Ensure map is easy to read

### Color Guidelines
1. **Contrast:** Ensure sufficient contrast for text readability
2. **Brand Colors:** Use your brand's color palette
3. **Hover Effects:** Make hover state distinct but not jarring
4. **Accessibility:** Check WCAG color contrast ratios
5. **Consistency:** Use consistent colors across your site

### Layout Guidelines
1. **Mobile:** List always stacks below/above map on mobile
2. **Map Height:** 500-600px height works well
3. **List Length:** Long lists may need scrolling or pagination
4. **Ratio:** Choose ratio based on number of locations
   - Few locations (5-10): Use 8-4 (emphasize map)
   - Many locations (20+): Use 5-7 (emphasize list)

---

## Accessibility

- ✅ **Semantic HTML:** Proper list structure (`<ul>`, `<li>`)
- ✅ **Keyboard Navigation:** All links keyboard accessible
- ✅ **Focus Indicators:** Visible focus states
- ✅ **Color Contrast:** Customizable for WCAG compliance
- ✅ **Alt Text:** Icons should have appropriate alt text
- ✅ **Screen Readers:** Proper heading hierarchy

### Accessibility Improvements
```html
<!-- Add iframe title -->
<iframe 
  src="..." 
  title="Map showing our service coverage area">
</iframe>

<!-- Add aria labels -->
<a href="..." aria-label="View services in Tampa, Florida">
  Tampa, FL
</a>

<!-- Semantic heading -->
<h2 class="bs-servicearea-title">Our Service Areas</h2>
```

---

## Troubleshooting

### Map Not Displaying
- **Check:** Verify embed URL is complete and correct
- **Solution:** Get fresh embed URL from Google Maps/My Maps
- **Issue:** Some maps have embedding restrictions

### Colors Not Applying
- **Check:** Inspect element to verify CSS
- **Solution:** Check color picker values, rebuild with `npm run build`
- **Issue:** Theme CSS may be overriding block styles

### Layout Breaking on Mobile
- **Check:** Responsive CSS media queries
- **Solution:** Verify Bootstrap grid classes are correct
- **Test:** Use browser responsive mode

### Links Not Working
- **Check:** Verify URLs are complete (include https://)
- **Solution:** Test links in frontend (not just editor)
- **Issue:** Relative URLs may need full domain

### Items Not Reordering
- **Check:** JavaScript console for errors
- **Solution:** Verify moveServiceArea function
- **Rebuild:** Run `npm run build`

---

## Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ✅ Bootstrap 5 grid system

---

## Future Enhancements

Potential features for future versions:
- 🔄 Multiple column layouts (3-column list)
- 🔄 Search/filter functionality for long lists
- 🔄 Accordion-style grouping by region
- 🔄 Custom icons per service area
- 🔄 Interactive map markers with popups
- 🔄 Distance calculator from user location
- 🔄 Auto-generate schema markup
- 🔄 Export service area list

---

## Related Blocks

- **BS NAP:** Similar block for individual location contact info
- **BS Row:** Use as parent container for layout control
- **BS Column:** Nest multiple service area blocks in columns

---

## Support & Documentation

For more information, bug reports, or feature requests, please refer to:
- **Main Documentation:** `PROJECT_HISTORY.md`
- **Plugin File:** `bootstrap-blocks.php`
- **Source Code:** `src/bs-service-area/`
- **Related:** `BS-NAP.md`

---

*Last Updated: October 2025*  
*Version: 1.0.0*  
*Status: Production Ready ✅*

