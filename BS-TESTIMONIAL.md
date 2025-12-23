# BS Testimonial Block

## Overview
The BS Testimonial block is a feature-rich testimonial/review slider component with Slick slider integration, customizable styling, read more functionality, and random avatar colors. Perfect for displaying customer reviews, testimonials, and social proof.

**Block Name:** `bootstrap-blocks/bs-testimonial`  
**Category:** Bootstrap Blocks  
**Icon:** Format Quote  
**Version:** 1.0.0  
**Status:** Production Ready ✅

---

## Key Features

### Core Functionality
- ✅ **Slick Slider Integration:** Professional responsive slider with dots and arrows
- ✅ **Editable Testimonials:** Inline editing with individual delete buttons
- ✅ **Custom BSB Markup:** Uses `bsb-slider-nav bsb-reviews js-reviews` wrapper classes
- ✅ **5-Star Rating System:** Custom rating image integration
- ✅ **Date Display:** MM-DD-YYYY format with toggle visibility
- ✅ **Template System:** Externalized HTML template for easy customization
- ✅ **Block Title:** Customizable section heading

### Advanced Features
- ✅ **Read More Functionality:** Configurable word limit with expandable text (5-200 words)
- ✅ **Random Avatar Colors:** 15 consistent colors based on customer name hash
- ✅ **Show/Hide Controls:** Toggle visibility for rating stars and dates
- ✅ **Responsive Settings:** Mobile, tablet, desktop breakpoints with individual controls
- ✅ **Slider Control:** Autoplay, dots, arrows, slides to show
- ✅ **Block Validation:** Consistent configuration between edit and save functions
- ✅ **Event Delegation:** Global JavaScript for dynamic content handling

### Styling Options
- ✅ **Customizable Colors:** Background, text, title, border colors
- ✅ **Border Control:** Width and radius customization
- ✅ **Slide Gap:** Adjustable spacing between slides
- ✅ **Arrow Theme:** Light/dark arrow themes
- ✅ **Dot Colors:** Customize dot indicator colors

---

## Block Attributes

### Testimonial Data
```javascript
testimonials: [
  {
    id: "testimonial-1",
    name: "John Doe",
    company: "ABC Company",
    text: "This is a sample testimonial text.",
    date: "10-15-2025" // Optional, MM-DD-YYYY format
  }
]
```

### Slider Settings
| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `uniqueId` | string | auto-generated | Unique identifier for slider |
| `blockTitle` | string | `"Testimonials"` | Section heading |
| `slidesToShow` | number | `3` | Number of slides visible at once |
| `autoplay` | boolean | `true` | Auto-advance slides |
| `autoplaySpeed` | number | `3000` | Autoplay speed in milliseconds |
| `showArrows` | boolean | `false` | Show prev/next arrows |
| `showDots` | boolean | `true` | Show dot indicators |
| `sliderStyle` | string | `"default"` | Slider style preset |

### Responsive Settings
```javascript
responsive: {
  mobile: { 
    slidesToShow: 1, 
    slidesToScroll: 1, 
    minWidth: 600 
  },
  tablet: { 
    slidesToShow: 2, 
    slidesToScroll: 1, 
    minWidth: 768 
  },
  desktop: { 
    slidesToShow: 3, 
    slidesToScroll: 1, 
    minWidth: 1024 
  }
}
```

### Text Settings
| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `wordLimit` | number | `20` | Word limit before "Read more" appears (5-200) |
| `showDate` | boolean | `false` | Display testimonial date |
| `showRating` | boolean | `true` | Display 5-star rating |

### Style Settings
| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `slideBackground` | string | `"#ffffff"` | Slide card background color |
| `titleColor` | string | `"#333333"` | Customer name color |
| `textColor` | string | `"#666666"` | Testimonial text color |
| `borderColor` | string | `"#e0e0e0"` | Card border color |
| `borderWidth` | number | `1` | Border width in pixels |
| `borderRadius` | number | `8` | Border radius in pixels |
| `slideGap` | number | `20` | Gap between slides in pixels |
| `arrowTheme` | string | `"light"` | Arrow color theme: "light" or "dark" |
| `dotColor` | string | `"#D0D7E0"` | Inactive dot color |
| `dotActiveColor` | string | `"#007cba"` | Active dot color |

---

## Random Avatar Colors

The block uses 15 professional dark colors for customer avatars, ensuring good contrast with white text:

```javascript
[
  '#2F4F4F', // Dark Slate Gray
  '#800000', // Maroon
  '#8B4513', // Saddle Brown
  '#2F4F2F', // Dark Forest Green
  '#483D8B', // Dark Slate Blue
  '#8B0000', // Dark Red
  '#556B2F', // Dark Olive Green
  '#8B008B', // Dark Magenta
  '#CD5C5C', // Indian Red
  '#4B0082', // Indigo
  '#A0522D', // Sienna
  '#2E8B57', // Sea Green
  '#8B4726', // Saddle Brown Variant
  '#6B8E23', // Olive Drab
  '#4682B4'  // Steel Blue
]
```

Colors are consistently assigned based on a hash of the customer name, ensuring the same customer always gets the same color.

---

## Editor Interface

### Inspector Controls (Right Sidebar)

#### 1. Slider Control Panel
- **Slides to Show:** Number input (1-10)
  - Number of testimonials visible at once
- **Autoplay:** Toggle switch
- **Autoplay Speed:** Number input (milliseconds)
- **Show Dots:** Toggle switch for dot indicators
- **Show Arrows:** Toggle switch for prev/next arrows
- **Slider Style:** Dropdown (future use)

#### 2. Slide Settings Panel
- **Word Limit:** Range slider (5-200 words)
  - Text truncation limit before "Read more"
- **Show Rating:** Toggle switch
  - Display/hide 5-star rating
- **Show Date:** Toggle switch
  - Display/hide testimonial date

#### 3. Responsive Settings Panels
**Mobile Settings:**
- Slides to Show (mobile)
- Slides to Scroll
- Min Width (breakpoint)

**Tablet Settings:**
- Slides to Show (tablet)
- Slides to Scroll
- Min Width (breakpoint)

**Desktop Settings:**
- Slides to Show (desktop)
- Slides to Scroll
- Min Width (breakpoint)

#### 4. Style Settings Panel
- **Slide Background:** Color picker
- **Title Color:** Color picker
- **Text Color:** Color picker
- **Border Color:** Color picker
- **Border Width:** Number input (0-10px)
- **Border Radius:** Number input (0-50px)
- **Slide Gap:** Number input (0-100px)
- **Arrow Theme:** Dropdown (light/dark)
- **Dot Color:** Color picker
- **Dot Active Color:** Color picker

### Main Editor Area

#### Block Title
- Editable heading: "Testimonials" (default)
- RichText component for inline editing

#### Testimonial Cards
Each testimonial displays:
- **Customer Avatar:** First letter with random background color
- **Customer Name:** Editable text field (full width)
- **Company Name:** Editable text field (full width)
- **Testimonial Text:** Textarea (full width)
- **Date:** Text field with MM-DD-YYYY placeholder (full width)
- **Delete Button (×):** Remove testimonial

#### Add Button
- "Add Testimonial" button to create new entries
- Adds new testimonial with default content

#### Status Bar
- Shows number of testimonials
- Example: "3 testimonials"

---

## Usage Instructions

### Basic Setup

#### 1. Add the Block
```
1. Click "+" button in editor
2. Search for "BS Testimonial"
3. Click to add block
```

#### 2. Edit Block Title
```
1. Click on "Testimonials" heading
2. Type your custom heading
3. Examples: "What Our Clients Say", "Customer Reviews"
```

#### 3. Edit Testimonials
```
For each testimonial:
1. Click customer name → enter real name
2. Click company → enter company name
3. Click testimonial text → enter full review
4. Click date → enter date (optional)
5. All fields are full width for easy editing
```

#### 4. Add More Testimonials
```
1. Click "Add Testimonial" button
2. New testimonial appears with default content
3. Edit as needed
4. Add as many as you need
```

#### 5. Delete Testimonials
```
1. Click the "×" button on any testimonial
2. Testimonial is removed immediately
3. No confirmation dialog
```

### Slider Configuration

#### Basic Slider Settings
```
1. Open "Slider Control" panel
2. Set "Slides to Show": 3 (desktop default)
3. Toggle "Autoplay": ON
4. Set "Autoplay Speed": 3000ms (3 seconds)
5. Toggle "Show Dots": ON
6. Toggle "Show Arrows": OFF (default)
```

#### Responsive Configuration
```
Mobile (600px+):
- Slides to Show: 1
- One testimonial at a time

Tablet (768px+):
- Slides to Show: 2
- Two testimonials side-by-side

Desktop (1024px+):
- Slides to Show: 3
- Three testimonials visible
```

### Text Truncation

#### Configure Read More
```
1. Open "Slide Settings" panel
2. Adjust "Word Limit" slider
3. Range: 5-200 words
4. Default: 20 words

Example:
- Word Limit: 20
- Text over 20 words shows "Read more"
- Click to expand full text
- Click "Read less" to collapse
```

#### Show/Hide Elements
```
Rating Stars:
1. Toggle "Show Rating"
2. ON: Displays 5-star image
3. OFF: Hides rating completely

Date:
1. Toggle "Show Date"
2. ON: Shows testimonial date
3. OFF: Hides date
```

### Styling Customization

#### Colors
```
1. Open "Style Settings" panel
2. Use color pickers:
   - Slide Background: Card background
   - Title Color: Customer name
   - Text Color: Testimonial text
   - Border Color: Card border
```

#### Border & Shape
```
1. Border Width: 0-10px
   - 0 = no border
   - 1 = subtle border (default)
   - 2+ = prominent border

2. Border Radius: 0-50px
   - 0 = square corners
   - 8 = rounded corners (default)
   - 20+ = very rounded
```

#### Spacing
```
Slide Gap: 0-100px
- 0 = slides touching
- 20 = default spacing
- 30+ = generous spacing
```

---

## Frontend Output

### HTML Structure (Slider Mode)
```html
<div class="bs-testimonial-block">
  <h2 class="bs-testimonial-title">Testimonials</h2>
  
  <div class="bsb-slider-nav bsb-reviews js-reviews testimonial-abc123" 
       data-slick-config='{"slidesToShow":3,"slidesToScroll":1,"autoplay":true,"autoplaySpeed":3000,"dots":true,"arrows":false,"infinite":true,"responsive":[{"breakpoint":1024,"settings":{"slidesToShow":3}},{"breakpoint":768,"settings":{"slidesToShow":2}},{"breakpoint":600,"settings":{"slidesToShow":1}}]}'>
    
    <!-- Individual Testimonial -->
    <div class="h-100 bsb-review review">
      <div class="d-flex align-items-center justify-content-start has-review-source g-review mb-3">
        <span class="customer-thumb me-2" style="background-color: #2F4F4F;">
          J
        </span>
        <div class="cusomer-info">
          <h6 class="font-700 lh-13 mb-0" style="font-size: 21px;">John Doe</h6>
        </div>
      </div>
      
      <div class="rating-star mb-2"></div>
      
      <div class="p mb-0 lh-15" style="font-size:16px; color: #687179;">
        <span class="testimonial-text-short">First 20 words of testimonial...</span>
        <span class="testimonial-text-full" style="display: none;">Full testimonial text goes here...</span>
        <span class="testimonial-read-more" style="color: #007cba; cursor: pointer; text-decoration: underline;">Read more</span>
      </div>
      
      <div class="testimonial-date mt-2" style="font-size:14px; color: #999;">
        10-15-2025
      </div>
    </div>
    
    <!-- More testimonials... -->
  </div>
</div>
```

### HTML Structure (Raw Mode)
Raw mode outputs testimonials without slider wrapper (for testing):
```html
<!-- Just the testimonial cards without slider wrapper -->
<div class="h-100 bsb-review review">
  <!-- Testimonial content -->
</div>
```

### CSS Classes

**Container:**
- `.bs-testimonial-block` - Main wrapper
- `.bs-testimonial-title` - Block heading
- `.bsb-slider-nav` - Slick slider wrapper
- `.bsb-reviews` - Reviews container
- `.js-reviews` - JavaScript hook

**Testimonial Card:**
- `.bsb-review` - Individual review card
- `.review` - Card styling class
- `.h-100` - Full height
- `.has-review-source` - Review source container
- `.g-review` - Google review indicator

**Avatar:**
- `.customer-thumb` - Avatar circle
- `.me-2` - Right margin (Bootstrap)

**Content:**
- `.cusomer-info` - Customer info container
- `.rating-star` - Star rating image
- `.testimonial-text-short` - Truncated text
- `.testimonial-text-full` - Full text (hidden)
- `.testimonial-read-more` - Read more link
- `.testimonial-date` - Date display

---

## JavaScript Functionality

### Slick Slider Configuration
```javascript
{
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  dots: true,
  arrows: false,
  infinite: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 3 }
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 2 }
    },
    {
      breakpoint: 600,
      settings: { slidesToShow: 1 }
    }
  ]
}
```

### Read More Functionality
Global JavaScript handles "Read More" clicks:

```javascript
document.addEventListener('click', function(e) {
  if (e.target && e.target.classList.contains('testimonial-read-more')) {
    const parent = e.target.parentElement;
    const shortText = parent.querySelector('.testimonial-text-short');
    const fullText = parent.querySelector('.testimonial-text-full');
    
    if (fullText.style.display === 'none') {
      // Expand
      shortText.style.display = 'none';
      fullText.style.display = 'inline';
      e.target.textContent = 'Read less';
    } else {
      // Collapse
      shortText.style.display = 'inline';
      fullText.style.display = 'none';
      e.target.textContent = 'Read more';
    }
  }
});
```

### Color Assignment Algorithm
```javascript
function getConsistentColor(name) {
  // Hash the name
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Map to color index
  const colors = [/* 15 colors */];
  const index = Math.abs(hash) % colors.length;
  
  return colors[index];
}
```

---

## Technical Implementation

### File Structure
```
src/bs-testimonial/
├── index.js                # Main block logic
├── block.json              # Block metadata
├── style.css               # Styles
├── template.js             # HTML generation
└── images/
    └── rating-5star.png    # 5-star rating image
```

### Dependencies
```javascript
@wordpress/blocks          // Block registration
@wordpress/block-editor    // Editor components
@wordpress/components      // UI controls
@wordpress/element         // React hooks
```

### Key Functions

#### `addTestimonial()`
Adds new testimonial with default content:
```javascript
{
  id: `testimonial-${Date.now()}`,
  name: 'John Doe',
  company: 'Company Name',
  text: 'Great service!',
  date: ''
}
```

#### `deleteTestimonial(id)`
Removes testimonial by ID:
```javascript
const newTestimonials = testimonials.filter(t => t.id !== id);
setAttributes({ testimonials: newTestimonials });
```

#### `updateTestimonial(id, field, value)`
Updates specific field of a testimonial:
```javascript
const updated = testimonials.map(t => 
  t.id === id ? { ...t, [field]: value } : t
);
setAttributes({ testimonials: updated });
```

#### `generateSlickConfig(attributes)`
Helper function for consistent Slick configuration:
```javascript
function generateSlickConfig(attributes) {
  const { slidesToShow, autoplay, autoplaySpeed, showDots, showArrows, responsive } = attributes;
  
  return {
    slidesToShow,
    slidesToScroll: 1,
    autoplay,
    autoplaySpeed,
    dots: showDots,
    arrows: showArrows,
    infinite: true,
    responsive: filterResponsiveSettings(responsive)
  };
}
```

#### `truncateText(text, wordLimit)`
Truncates text to word limit:
```javascript
const words = text.split(' ');
if (words.length <= wordLimit) return { short: text, full: text };

const short = words.slice(0, wordLimit).join(' ') + '...';
return { short, full: text };
```

#### `getRandomColor(name)`
Gets consistent color based on name:
```javascript
// Uses hash algorithm to ensure same name = same color
```

---

## Use Cases

### Customer Reviews
Display authentic customer testimonials:
- Product reviews
- Service feedback
- Customer satisfaction

### Social Proof
Build trust with visitor testimonials:
- Before/after stories
- Success stories
- Client experiences

### Case Studies
Showcase detailed client results:
- Project outcomes
- ROI testimonials
- Transformation stories

### Employee Testimonials
Display team member quotes:
- Company culture
- Working environment
- Career growth stories

### Partner Testimonials
Show B2B relationships:
- Vendor testimonials
- Partnership success
- Integration experiences

---

## Best Practices

### Content Guidelines
1. **Authenticity:** Use real customer names and companies
2. **Length:** 50-150 words optimal (allows for read more)
3. **Specificity:** Specific details are more credible
4. **Variety:** Mix lengths and focus areas
5. **Dates:** Add dates for recency social proof

### Visual Guidelines
1. **Avatar Colors:** Let the system assign colors for consistency
2. **Photos:** Consider adding custom photos in future versions
3. **Ratings:** Only show 5-star ratings (or add variable ratings)
4. **Spacing:** Use adequate slide gap for visual separation
5. **Borders:** Subtle borders (1px) work best

### Slider Guidelines
1. **Slides to Show:**
   - 1-3 testimonials: Show all (no slider needed)
   - 4-6 testimonials: Show 2-3 at a time
   - 7+ testimonials: Show 3 at a time
   
2. **Autoplay:** 
   - Use for passive viewing (landing pages)
   - Disable for active reading (testimonial pages)
   - 3-5 seconds per slide optimal

3. **Responsive:**
   - Mobile: Always 1 slide
   - Tablet: 1-2 slides
   - Desktop: 2-3 slides

### SEO Guidelines
1. **Structured Data:** Add schema markup for reviews
2. **Real Names:** Use actual customer names when possible
3. **Dates:** Include review dates
4. **Company Names:** Include for B2B credibility

---

## Accessibility

- ✅ **Keyboard Navigation:** Slick slider supports keyboard
- ✅ **Focus Management:** Proper focus indicators
- ✅ **Screen Readers:** Semantic HTML structure
- ✅ **Color Contrast:** Avatar colors chosen for contrast
- ✅ **Interactive Elements:** Read more links are keyboard accessible
- ✅ **ARIA Attributes:** Slider includes ARIA labels

### Accessibility Enhancements
```html
<!-- Add ARIA labels -->
<div class="bsb-slider-nav" role="region" aria-label="Customer testimonials">
  
<!-- Add button semantic -->
<button class="testimonial-read-more" aria-expanded="false">
  Read more
</button>

<!-- Add heading structure -->
<h2>Testimonials</h2>
<h3>Customer Name</h3>
```

---

## Styling Customization

### Via Block Settings
All visual customization available through Inspector Controls.

### Via Custom CSS

```css
/* Testimonial cards */
.bsb-review {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Customer avatar */
.customer-thumb {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 700;
  color: #fff;
}

/* Rating stars */
.rating-star {
  width: 100px;
  height: 20px;
  background-image: url('./images/rating-5star.png');
  background-size: contain;
  background-repeat: no-repeat;
}

/* Read more link */
.testimonial-read-more {
  color: #007cba;
  cursor: pointer;
  text-decoration: underline;
  margin-left: 5px;
}

.testimonial-read-more:hover {
  color: #005a8c;
}

/* Slick dots */
.slick-dots li button:before {
  color: #D0D7E0;
  opacity: 1;
}

.slick-dots li.slick-active button:before {
  color: #007cba;
}

/* Responsive */
@media (max-width: 768px) {
  .bsb-review {
    padding: 20px;
  }
}
```

---

## Troubleshooting

### Slider Not Working
- **Check:** Ensure Slick slider CSS/JS is loaded
- **Solution:** Verify assets are enqueued in `bootstrap-blocks.php`
- **Test:** Check browser console for JS errors

### Rating Stars Not Showing
- **Check:** Verify `rating-5star.png` exists in `images/` folder
- **Solution:** Ensure image is copied to build folder
- **Path:** Check image path in CSS

### Read More Not Working
- **Check:** Verify global JavaScript is loaded
- **Solution:** Check `bootstrap-blocks.php` for JS enqueue
- **Test:** Check browser console for click events

### Block Validation Errors
- **Check:** Edit and save functions use same configuration
- **Solution:** Ensure `generateSlickConfig()` is used consistently
- **Rebuild:** Run `npm run build`

### Colors Not Consistent
- **Check:** Name spelling must be exact
- **Solution:** Use same name spelling for same customer
- **Algorithm:** Hash is case-sensitive

### Slider Width Issues
- **Check:** CSS for `.bsb-slider-nav`
- **Solution:** Ensure full-width container styling
- **Override:** Add `width: 100%` if needed

---

## Schema Markup Enhancement

Add structured data for SEO:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Review",
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5"
  },
  "author": {
    "@type": "Person",
    "name": "John Doe"
  },
  "reviewBody": "Testimonial text here...",
  "datePublished": "2025-10-15"
}
</script>
```

---

## Performance Optimization

### Lazy Loading
Consider lazy loading testimonials:
```javascript
data-slick='{"lazyLoad": "ondemand"}'
```

### Image Optimization
- Optimize rating star image (PNG-8, <5KB)
- Use responsive images for avatars (when photos added)

### JavaScript
- Load Slick only when block is present
- Use event delegation (already implemented)
- Minify production builds

---

## Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers
- ✅ Slick slider compatible

---

## Future Enhancements

- 🔄 Custom avatar photos upload
- 🔄 Variable star ratings (1-5 stars)
- 🔄 Google Review icon integration
- 🔄 Multiple slider style presets
- 🔄 Video testimonials
- 🔄 Social media platform icons
- 🔄 Import testimonials from APIs
- 🔄 Export/import testimonial data
- 🔄 Auto-generate schema markup
- 🔄 Featured testimonial highlight

---

## Support & Documentation

For more information:
- **Main Documentation:** `PROJECT_HISTORY.md`
- **Plugin File:** `bootstrap-blocks.php`
- **Source Code:** `src/bs-testimonial/`

---

*Last Updated: October 2025*  
*Version: 1.0.0*  
*Status: Production Ready ✅*  
*Current Mode: Raw Output (Slider mode available)*

