# BS NAP Block (Name, Address, Phone)

## Overview
The BS NAP block displays contact information with an embedded map - perfect for showing business location, address, phone numbers, and office hours. Features dynamic items, customizable icons, and flexible map positioning.

**Block Name:** `bootstrap-blocks/bs-nap`  
**Category:** Bootstrap Blocks  
**Icon:** Location Alt  
**Version:** 1.0.0

---

## Key Features

### Core Functionality
- ✅ **Google Maps Integration:** Embed Google Maps directly in the block
- ✅ **Dynamic Contact Items:** Add unlimited contact information items
- ✅ **Custom Icons:** Upload custom icons for each contact item
- ✅ **Flexible Layout:** Map can be positioned left or right
- ✅ **Inline Editing:** Edit all content directly in the editor
- ✅ **HTML Content Support:** Rich text formatting in content areas

### Advanced Features
- ✅ **Location Title:** Customizable location/city title
- ✅ **Drag & Drop Reordering:** Reorder contact items easily
- ✅ **Icon Upload:** Media library integration for custom icons
- ✅ **Multi-line Content:** Supports line breaks with `<br>` tags
- ✅ **Responsive Design:** Mobile-optimized layout
- ✅ **Wide/Full Width Support:** Aligns with content width options

---

## Block Attributes

### Map Settings
| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `mapEmbedUrl` | string | Google Maps URL | Embed URL from Google Maps |
| `mapPosition` | string | `"right"` | Map position: "left" or "right" |
| `locationTitle` | string | `"Boise | ID"` | Location/city display title |

### Contact Items Array
```javascript
items: [
  {
    id: "location",
    iconUrl: "",
    title: "Location",
    content: "123 Main St, Boise, ID 83702"
  },
  {
    id: "phone",
    iconUrl: "",
    title: "Phone",
    content: "Phone: (208) 295 9919<br>Fax: (208) 295 9920"
  },
  {
    id: "office-hours",
    iconUrl: "",
    title: "Office Hours",
    content: "Monday - Friday | 8:00AM - 5:00PM CST<br>Saturday | By Appointment Only"
  }
]
```

### Item Structure
Each contact item contains:
- `id` - Unique identifier
- `iconUrl` - URL to custom icon image
- `title` - Item heading (e.g., "Phone", "Location")
- `content` - Item details (supports HTML)

---

## Editor Interface

### Inspector Controls (Right Sidebar)

#### 1. Location Settings Panel
- **Location Title:** Text input for city/location name
  - Example: "Boise | ID", "New York | NY"

#### 2. Map Settings Panel
- **Map Embed URL:** Text input for Google Maps embed URL
  - Help text: "Paste the embed URL from Google Maps or other map services"
- **Map Position Left:** Toggle switch
  - ON: Map displays on left side
  - OFF: Map displays on right side (default)

#### 3. Contact Items Panel
For each contact item:
- **Icon Upload:** Media library button for custom icon
  - Shows preview if icon is uploaded
  - "Remove" button to clear icon
- **Title:** Text input for item heading
- **Content:** Textarea for item details
  - Supports HTML (e.g., `<br>` for line breaks)
- **Delete Button (×):** Remove the item
- **Move Up/Down Buttons:** Reorder items

**Add Contact Item Button:** Add new items to the list

### Main Editor Area
- Split layout preview showing map and contact info
- Visual representation of the final layout
- Map position reflects the selected setting
- Location title displayed prominently

---

## Usage Instructions

### Basic Setup

#### 1. Add the Block
```
1. Click "+" button in the editor
2. Search for "BS NAP" or "Name Address Phone"
3. Click to add the block
```

#### 2. Configure Map
```
1. Get Google Maps Embed URL:
   - Go to Google Maps
   - Search for your location
   - Click "Share" → "Embed a map"
   - Copy the iframe src URL
   
2. Paste URL in "Map Embed URL" field
3. Toggle "Map Position Left" if desired
```

#### 3. Set Location Title
```
1. In "Location Settings" panel
2. Enter your city/location (e.g., "Tampa | FL")
```

#### 4. Edit Contact Items
```
1. Click on any item in "Contact Items" panel
2. Update Title (e.g., "Location", "Phone", "Hours")
3. Update Content with your information
4. Add <br> tags for line breaks
```

### Adding Custom Icons

#### Upload Icon
```
1. In Contact Items panel, find the item
2. Click "Upload Icon" button
3. Select image from Media Library or upload new
4. Icon appears in the preview
```

#### Remove Icon
```
1. Click "Remove" button next to icon preview
2. Item will display without icon
```

### Adding More Items

#### Add New Contact Item
```
1. Scroll to bottom of Contact Items panel
2. Click "Add Contact Item" button
3. New item appears with default text
4. Edit title, content, and upload icon
```

#### Reorder Items
```
1. Use ↑ (up) and ↓ (down) buttons
2. Or drag and drop items (if supported)
3. Items reorder immediately
```

#### Delete Items
```
1. Click the "×" button on any item
2. Item is removed immediately
3. Minimum of 1 item recommended
```

---

## Frontend Output

### HTML Structure
```html
<div class="bs-nap-container">
  <div class="bs-nap-header">
    <h2 class="bs-nap-location-title">Boise | ID</h2>
  </div>
  
  <div class="bs-nap-layout">
    <!-- Map Column -->
    <div class="bs-nap-map-column">
      <div class="bs-nap-map">
        <iframe 
          src="[Google Maps Embed URL]"
          width="100%" 
          height="450"
          style="border:0;"
          allowfullscreen=""
          loading="lazy">
        </iframe>
      </div>
    </div>
    
    <!-- Contact Info Column -->
    <div class="bs-nap-info-column">
      <div class="bs-nap-items">
        <div class="bs-nap-item">
          <div class="bs-nap-item-icon">
            <img src="[Icon URL]" alt="Location" />
          </div>
          <div class="bs-nap-item-content">
            <h3 class="bs-nap-item-title">Location</h3>
            <div class="bs-nap-item-text">
              123 Main St, Boise, ID 83702
            </div>
          </div>
        </div>
        <!-- More items... -->
      </div>
    </div>
  </div>
</div>
```

### CSS Classes
- `.bs-nap-container` - Main wrapper
- `.bs-nap-header` - Header section with location title
- `.bs-nap-location-title` - Location title text
- `.bs-nap-layout` - Two-column layout wrapper
- `.bs-nap-map-column` - Map container column
- `.bs-nap-map` - Map iframe wrapper
- `.bs-nap-info-column` - Contact info column
- `.bs-nap-items` - Contact items container
- `.bs-nap-item` - Individual contact item
- `.bs-nap-item-icon` - Icon container
- `.bs-nap-item-content` - Text content wrapper
- `.bs-nap-item-title` - Item title/heading
- `.bs-nap-item-text` - Item detail text

### Layout Variations

#### Map Position Right (Default)
```
┌─────────────────────────────────┐
│     Location Title: Boise | ID  │
├───────────────┬─────────────────┤
│  Contact Info │      Map        │
│  • Location   │   [Google Map]  │
│  • Phone      │                 │
│  • Hours      │                 │
└───────────────┴─────────────────┘
```

#### Map Position Left
```
┌─────────────────────────────────┐
│     Location Title: Boise | ID  │
├─────────────────┬───────────────┤
│      Map        │  Contact Info │
│   [Google Map]  │  • Location   │
│                 │  • Phone      │
│                 │  • Hours      │
└─────────────────┴───────────────┘
```

---

## Use Cases

### Business Location Pages
Perfect for "Contact Us" or location pages:
- Display physical address
- Show phone numbers
- List office hours
- Embed map for directions

### Multi-Location Businesses
Use multiple BS NAP blocks for different locations:
- Each location gets its own block
- Custom location titles
- Individual maps per location
- Unique contact information

### Service Area Display
Show service coverage area:
- Central office location
- Service radius on map
- Contact information
- Hours of operation

### Real Estate Offices
Display office information:
- Office location
- Agent contact numbers
- Viewing hours
- Neighborhood map

---

## Getting Google Maps Embed URL

### Step-by-Step Guide

1. **Go to Google Maps**
   - Open [https://maps.google.com](https://maps.google.com)

2. **Search for Your Location**
   - Enter your business address
   - Confirm the correct location is shown

3. **Get Embed Code**
   - Click the "Share" button
   - Click "Embed a map" tab
   - Copy the URL from the `src` attribute of the iframe
   - Example: `https://www.google.com/maps/embed?pb=...`

4. **Paste in Block**
   - Open BS NAP block settings
   - Paste URL in "Map Embed URL" field
   - Map displays immediately

### Customizing Map Display
Google Maps allows customization:
- **Size:** Adjust iframe width/height in the embed code
- **Zoom Level:** Set zoom before getting embed code
- **Map Type:** Choose standard, satellite, or terrain
- **Markers:** Add custom markers before embedding

---

## Technical Implementation

### File Structure
```
src/bs-nap/
├── index.js      # Main block logic
├── block.json    # Block metadata and attributes
├── style.css     # Frontend and editor styles
└── template.js   # HTML generation helper
```

### Dependencies
```javascript
@wordpress/blocks          // Block registration
@wordpress/block-editor    // Editor components, MediaUpload
@wordpress/components      // UI controls
@wordpress/element         // React hooks
```

### Key Functions

#### `addItem()`
Adds a new contact item with default values:
```javascript
{
  id: `item-${Date.now()}`,
  iconUrl: '',
  title: 'New Item',
  content: 'Enter content here'
}
```

#### `removeItem(index)`
Removes a contact item at the specified index.

#### `updateItem(index, field, value)`
Updates a specific field of a contact item:
```javascript
updateItem(0, 'title', 'Phone Number');
updateItem(0, 'content', '(208) 555-1234');
updateItem(0, 'iconUrl', 'https://...');
```

#### `generateNAPHTML(attributes)`
External template function that generates the frontend HTML output including:
- Location title
- Map iframe
- Contact items with icons
- Responsive layout

### Media Upload Integration
Uses WordPress Media Library:
```javascript
<MediaUpload
  onSelect={(media) => updateItem(index, 'iconUrl', media.url)}
  allowedTypes={['image']}
  render={({ open }) => (
    <Button onClick={open}>Upload Icon</Button>
  )}
/>
```

---

## Styling Customization

### Via Custom CSS

```css
/* Main container */
.bs-nap-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* Location title */
.bs-nap-location-title {
  font-size: 36px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
}

/* Layout columns */
.bs-nap-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

@media (max-width: 768px) {
  .bs-nap-layout {
    grid-template-columns: 1fr;
  }
}

/* Contact items */
.bs-nap-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 20px;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 8px;
}

.bs-nap-item-icon img {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.bs-nap-item-title {
  font-size: 18px;
  font-weight: 600;
  color: #222;
  margin-bottom: 5px;
}

.bs-nap-item-text {
  font-size: 14px;
  line-height: 1.6;
  color: #666;
}

/* Map styling */
.bs-nap-map iframe {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
```

### Via Theme
Override in your theme's CSS:
```css
.bs-nap-container {
  --nap-primary-color: #007bff;
  --nap-text-color: #333;
  --nap-background: #fff;
  --nap-border-radius: 8px;
}
```

---

## Accessibility

The BS NAP block follows accessibility best practices:

- ✅ **Semantic HTML:** Proper heading hierarchy (h2, h3)
- ✅ **Alt Text:** Icons should have descriptive alt text
- ✅ **Keyboard Navigation:** All interactive elements accessible via keyboard
- ✅ **Screen Reader Support:** Clear content structure
- ✅ **Iframe Title:** Map iframe should include title attribute
- ✅ **Focus Indicators:** Visible focus states for links

### Improving Accessibility

Add iframe title:
```html
<iframe 
  src="..." 
  title="Map showing our location at 123 Main St, Boise, ID">
</iframe>
```

Add phone number links:
```html
<a href="tel:+12085551234">(208) 555-1234</a>
```

Add address schema markup:
```html
<div itemscope itemtype="https://schema.org/LocalBusiness">
  <span itemprop="name">Business Name</span>
  <div itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
    <span itemprop="streetAddress">123 Main St</span>
    <span itemprop="addressLocality">Boise</span>
    <span itemprop="addressRegion">ID</span>
  </div>
</div>
```

---

## Best Practices

### Content Guidelines
1. **Location Title:** Keep concise (City | State format)
2. **Contact Items:** 3-6 items optimal
3. **Phone Format:** Use consistent formatting: (XXX) XXX-XXXX
4. **Hours:** Use clear, consistent formatting
5. **Address:** Include full street address, city, state, zip

### Icon Guidelines
1. **Size:** Upload icons at 64x64 or 128x128 pixels
2. **Format:** Use PNG with transparency or SVG
3. **Style:** Keep icons consistent (all line, all solid, etc.)
4. **Color:** Match your brand colors
5. **File Size:** Optimize images (<50KB each)

### Map Guidelines
1. **Zoom Level:** Set appropriate zoom before embedding
2. **Map Size:** Default 450px height works well
3. **Privacy:** Use Google Maps privacy mode if available
4. **Loading:** Maps can slow page load - consider lazy loading
5. **Fallback:** Provide text address if map fails to load

### Layout Guidelines
1. **Mobile:** Map stacks above or below contact info
2. **Desktop:** Side-by-side layout for easy viewing
3. **Balance:** Keep similar amounts of content in each column
4. **Spacing:** Adequate padding around elements

---

## Troubleshooting

### Map Not Displaying
- **Check:** Verify embed URL is correct
- **Solution:** Get fresh embed URL from Google Maps
- **Issue:** Some URLs may have restrictions - try regenerating

### Icons Not Showing
- **Check:** Verify icon URL is accessible
- **Solution:** Re-upload icon through Media Library
- **Issue:** Broken image URLs - check file permissions

### Layout Breaking on Mobile
- **Check:** Responsive CSS media queries
- **Solution:** Verify mobile styles are loaded
- **Test:** Use browser dev tools responsive mode

### Content Not Saving
- **Check:** JavaScript console for errors
- **Solution:** Rebuild with `npm run build`
- **Verify:** Check attributes are properly defined in block.json

### Items Not Reordering
- **Check:** Move up/down button functionality
- **Solution:** Verify array manipulation in updateItem function
- **Debug:** Check React state updates

---

## Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ⚠️ IE11 (not officially supported)

---

## Future Enhancements

Potential features for future versions:
- 🔄 Multiple map providers (Apple Maps, Mapbox)
- 🔄 Interactive map markers
- 🔄 Click-to-call phone links
- 🔄 Schema markup generator
- 🔄 Social media links section
- 🔄 QR code generator for vCard
- 🔄 Directions link generator
- 🔄 Distance calculator

---

## Related Blocks

- **BS Row:** Use as parent container for layout control
- **BS Column:** Nest BS NAP in columns for multi-location layouts
- **BS Service Area:** Similar block for service coverage areas

---

## Support & Documentation

For more information, bug reports, or feature requests, please refer to:
- **Main Documentation:** `PROJECT_HISTORY.md`
- **Plugin File:** `bootstrap-blocks.php`
- **Source Code:** `src/bs-nap/`

---

*Last Updated: October 2025*  
*Version: 1.0.0*  
*Status: Production Ready ✅*

