# Bootstrap Blocks - Complete Documentation Index

## 📚 Overview

This directory contains comprehensive documentation for all Bootstrap Blocks in this WordPress plugin. Each block has its own detailed documentation file covering features, usage, customization, and troubleshooting.

**Plugin Version:** 1.0.0  
**Last Updated:** October 2025  
**Status:** Production Ready ✅

---

## 🧱 Available Blocks

### Layout Blocks

#### 1. [BS Row Block](./BS-ROW.md)
**Block Name:** `bootstrap-blocks/bs-row`  
**Purpose:** Bootstrap 5 row container with responsive spacing and backgrounds

**Key Features:**
- Responsive padding & margin controls (6 breakpoints)
- Background options (color, image, gradient, overlay)
- Container width settings (full-width, wide, boxed, custom)
- Scoped CSS with unique IDs
- Cascading inheritance system

**Use Cases:**
- Hero sections
- Content sections
- Call-to-action areas
- Feature grids

[📖 Read Full Documentation →](./BS-ROW.md)

---

#### 2. [BS Column Block](./BS-COLUMN.md)
**Block Name:** `bootstrap-blocks/bs-column`  
**Purpose:** Bootstrap 5 responsive column system

**Key Features:**
- Auto-width calculation based on siblings
- 6 responsive breakpoints (Default, SM, MD, LG, XL, XXL)
- Cascading inheritance
- Column offset support
- Manual width override

**Use Cases:**
- Multi-column layouts
- Responsive grids
- Content organization
- Sidebar layouts

[📖 Read Full Documentation →](./BS-COLUMN.md)

---

### Content Blocks

#### 3. [BS Accordion Block](./BS-ACCORDION.md)
**Block Name:** `bootstrap-blocks/bs-accordion`  
**Purpose:** Collapsible accordion/FAQ component

**Key Features:**
- Multiple accordion items with drag & drop reordering
- Allow multiple open or single open modes
- Optional numbering system
- Custom icons (plus-minus, chevron, arrow)
- Full color customization
- Adjustable spacing

**Use Cases:**
- FAQ sections
- Product features
- Documentation
- Content organization

[📖 Read Full Documentation →](./BS-ACCORDION.md)

---

#### 4. [BS Testimonial Block](./BS-TESTIMONIAL.md)
**Block Name:** `bootstrap-blocks/bs-testimonial`  
**Purpose:** Customer testimonial/review slider

**Key Features:**
- Slick slider integration
- Read more functionality (configurable word limit)
- Random avatar colors (15 consistent colors)
- 5-star rating display
- Responsive slider settings
- Show/hide date and rating controls
- Full styling customization

**Use Cases:**
- Customer reviews
- Social proof sections
- Case studies
- Team testimonials

[📖 Read Full Documentation →](./BS-TESTIMONIAL.md)

---

### Location & Service Blocks

#### 5. [BS NAP Block](./BS-NAP.md)
**Block Name:** `bootstrap-blocks/bs-nap`  
**Purpose:** Name, Address, Phone with map integration

**Key Features:**
- Google Maps embed integration
- Dynamic contact items with custom icons
- Flexible map positioning (left/right)
- HTML content support (line breaks)
- Location title customization
- Media library icon upload

**Use Cases:**
- Contact pages
- Multi-location businesses
- Service area display
- Office information

[📖 Read Full Documentation →](./BS-NAP.md)

---

#### 6. [BS Service Area Block](./BS-SERVICE-AREA.md)
**Block Name:** `bootstrap-blocks/bs-service-area`  
**Purpose:** Service area map with location list

**Key Features:**
- Google Maps custom area integration
- Unlimited service locations with links
- Flexible map/list ratio (8-4, 6-6, 5-7)
- Full color customization (title, items, hover)
- Drag & drop location reordering
- SEO-friendly city links

**Use Cases:**
- Service coverage areas
- Multi-location display
- Geographic service boundaries
- Local SEO pages

[📖 Read Full Documentation →](./BS-SERVICE-AREA.md)

---

## 🚀 Quick Start Guide

### Installation
The blocks are already installed as part of the Bootstrap Blocks plugin.

### Using Blocks in Pages

1. **Add Layout Structure:**
   ```
   BS Row → BS Column → Content Blocks
   ```

2. **Common Patterns:**
   
   **Hero Section:**
   ```
   BS Row (full-width, background image)
   └── BS Column (12)
       └── Heading + CTA
   ```
   
   **Three Column Feature:**
   ```
   BS Row (boxed)
   ├── BS Column (4)
   ├── BS Column (4)
   └── BS Column (4)
   ```
   
   **Testimonials Section:**
   ```
   BS Row (wide, gradient background)
   └── BS Column (12)
       └── BS Testimonial Block
   ```

3. **Contact Page:**
   ```
   BS Row (boxed)
   ├── BS Column (6)
   │   └── Contact Form
   └── BS Column (6)
       └── BS NAP Block
   ```

---

## 📊 Block Comparison

| Block | Category | Complexity | Responsive | Custom Styles | Best For |
|-------|----------|------------|------------|---------------|----------|
| **BS Row** | Layout | Advanced | 6 breakpoints | High | Section containers |
| **BS Column** | Layout | Moderate | 6 breakpoints | Medium | Grid layouts |
| **BS Accordion** | Content | Moderate | N/A | High | FAQs, collapsible content |
| **BS Testimonial** | Content | Advanced | 3 breakpoints | High | Reviews, social proof |
| **BS NAP** | Location | Simple | Auto | Low | Contact info, single location |
| **BS Service Area** | Location | Moderate | Auto | Medium | Service coverage, multiple locations |

---

## 🎨 Common Workflows

### Creating a Landing Page

1. **Hero Section:**
   - Add BS Row (full-width)
   - Set background image + overlay
   - Add BS Column (12)
   - Add heading + CTA button

2. **Features Section:**
   - Add BS Row (boxed)
   - Add 3 BS Columns (4 each)
   - Add icon + text in each column

3. **Service Areas:**
   - Add BS Row (wide)
   - Add BS Service Area block
   - Configure map and locations

4. **Testimonials:**
   - Add BS Row (gradient background)
   - Add BS Testimonial block
   - Configure slider settings

5. **Contact Section:**
   - Add BS Row (boxed)
   - Add BS NAP block
   - Configure map and contact info

### Creating a Service Page

1. **Header:**
   - BS Row + Column with service title

2. **FAQ Section:**
   - BS Row + BS Accordion block
   - Add common questions

3. **Service Coverage:**
   - BS Service Area block
   - Show covered cities

4. **Social Proof:**
   - BS Testimonial block
   - Show relevant reviews

---

## 🔧 Technical Reference

### File Structure
```
bootstrap-blocks/
├── src/
│   ├── bs-row/
│   │   ├── index.js
│   │   ├── block.json
│   │   └── style.css
│   ├── bs-column/
│   ├── bs-accordion/
│   ├── bs-testimonial/
│   ├── bs-nap/
│   └── bs-service-area/
├── build/              # Compiled assets
├── bootstrap-blocks.php # Main plugin file
└── *.md               # Documentation files
```

### Build Commands
```bash
# Install dependencies
npm install

# Development build (with watch)
npm run start

# Production build
npm run build

# Lint JavaScript
npm run lint:js

# Format code
npm run format
```

### Dependencies
All blocks use these core WordPress packages:
- `@wordpress/blocks` - Block registration
- `@wordpress/block-editor` - Editor components
- `@wordpress/components` - UI controls
- `@wordpress/element` - React hooks

### Bootstrap Integration
- Bootstrap 5 grid system
- Responsive breakpoints (SM, MD, LG, XL, XXL)
- Utility classes
- Container system

---

## 🎯 Best Practices

### Layout Best Practices
1. **Mobile-First:** Start with mobile design, expand to desktop
2. **Container Hierarchy:** BS Row → BS Column → Content
3. **Consistent Spacing:** Use row padding for section spacing
4. **Background Images:** Optimize size (<200KB) for performance

### Content Best Practices
1. **Accordion:** 3-8 items optimal, clear concise titles
2. **Testimonials:** 50-150 words, include dates for credibility
3. **Real Content:** Use authentic customer names and reviews
4. **Accessibility:** Maintain color contrast, proper heading hierarchy

### Performance Best Practices
1. **Image Optimization:** Compress all images
2. **Minimal Nesting:** Avoid deep nesting of rows/columns
3. **CSS Efficiency:** Use block settings over custom CSS when possible
4. **Lazy Loading:** Consider for images and sliders

---

## 🐛 Common Issues & Solutions

### Layout Issues

**Columns Not Side-by-Side**
- ✅ Check if BS Column blocks are inside BS Row
- ✅ Verify editor CSS is loaded
- ✅ Rebuild with `npm run build`

**Spacing Not Applied**
- ✅ Check unique ID generation
- ✅ Inspect element for generated CSS
- ✅ Verify no theme CSS conflicts

### Content Issues

**Accordion Not Expanding**
- ✅ Check JavaScript console for errors
- ✅ Verify frontend JS is enqueued
- ✅ Rebuild block assets

**Testimonial Slider Not Working**
- ✅ Ensure Slick slider is loaded
- ✅ Check for JavaScript conflicts
- ✅ Verify slider configuration

### Map Issues

**Maps Not Displaying**
- ✅ Verify embed URL is correct
- ✅ Get fresh URL from Google Maps
- ✅ Check for embedding restrictions

---

## 📱 Responsive Design

### Breakpoint System
All blocks follow Bootstrap 5 breakpoints:

| Name | Min Width | Typical Device |
|------|-----------|----------------|
| Default | 0px | Mobile phones |
| SM | 576px | Large phones, small tablets |
| MD | 768px | Tablets |
| LG | 992px | Desktops |
| XL | 1200px | Large desktops |
| XXL | 1400px | Extra large screens |

### Testing Responsive Layouts
1. Use browser DevTools responsive mode
2. Test on actual devices when possible
3. Check at all major breakpoints
4. Verify touch interactions on mobile

---

## ♿ Accessibility

All blocks follow WCAG 2.1 AA guidelines:

- ✅ **Keyboard Navigation:** All interactive elements accessible
- ✅ **Color Contrast:** Minimum 4.5:1 for text
- ✅ **Focus Indicators:** Visible focus states
- ✅ **Screen Readers:** Semantic HTML structure
- ✅ **ARIA Attributes:** Proper labels where needed

### Accessibility Checklist
- [ ] Sufficient color contrast (use contrast checker)
- [ ] Keyboard accessible (test with Tab key)
- [ ] Screen reader friendly (test with VoiceOver/NVDA)
- [ ] Focus indicators visible
- [ ] Proper heading hierarchy
- [ ] Alt text for images (when applicable)

---

## 🔄 Version History

### Version 1.0.0 (October 2025)
**All Blocks Production Ready** ✅

**BS Row Block:**
- Complete responsive spacing system
- Background options (color, image, gradient, overlay)
- Container width controls
- React error #130 resolved

**BS Column Block:**
- Auto-width calculation
- Cascading inheritance
- Breakpoint persistence
- Stable and fully tested

**BS Accordion Block:**
- Multiple items with reordering
- Custom icons and colors
- Allow multiple open modes
- Production ready

**BS Testimonial Block:**
- Slick slider integration
- Read more functionality
- Random avatar colors
- Show/hide controls
- Block validation fixed

**BS NAP Block:**
- Map integration
- Dynamic contact items
- Icon upload support
- Production ready

**BS Service Area Block:**
- Service area mapping
- Location list with links
- Flexible layout ratios
- Full color customization

---

## 📞 Support & Resources

### Documentation Files
- `PROJECT_HISTORY.md` - Complete development history
- `README.md` - Plugin overview and setup
- `BS-ROW.md` - Row block documentation
- `BS-COLUMN.md` - Column block documentation
- `BS-ACCORDION.md` - Accordion block documentation
- `BS-TESTIMONIAL.md` - Testimonial block documentation
- `BS-NAP.md` - NAP block documentation
- `BS-SERVICE-AREA.md` - Service area block documentation

### Getting Help
1. Check individual block documentation
2. Review PROJECT_HISTORY.md for technical details
3. Check browser console for JavaScript errors
4. Rebuild blocks with `npm run build`
5. Inspect element to verify CSS generation

### Contributing
When extending these blocks:
1. Follow existing code patterns
2. Update relevant documentation
3. Test across all breakpoints
4. Verify accessibility compliance
5. Run build before committing

---

## 🎓 Learning Resources

### WordPress Block Development
- [Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [Block API Reference](https://developer.wordpress.org/block-editor/reference-guides/block-api/)
- [Components Reference](https://developer.wordpress.org/block-editor/reference-guides/components/)

### Bootstrap 5
- [Bootstrap Grid System](https://getbootstrap.com/docs/5.0/layout/grid/)
- [Bootstrap Breakpoints](https://getbootstrap.com/docs/5.0/layout/breakpoints/)
- [Bootstrap Utilities](https://getbootstrap.com/docs/5.0/utilities/)

### JavaScript Libraries
- [Slick Slider](https://kenwheeler.github.io/slick/) - Used in Testimonial block
- [React Hooks](https://react.dev/reference/react) - Used throughout blocks

---

## ✅ Block Status Summary

| Block | Status | Version | Last Updated |
|-------|--------|---------|--------------|
| BS Row | ✅ Production Ready | 1.0.0 | Oct 2025 |
| BS Column | ✅ Production Ready | 1.0.0 | Oct 2025 |
| BS Accordion | ✅ Production Ready | 1.0.0 | Oct 2025 |
| BS Testimonial | ✅ Production Ready | 1.0.0 | Oct 2025 |
| BS NAP | ✅ Production Ready | 1.0.0 | Oct 2025 |
| BS Service Area | ✅ Production Ready | 1.0.0 | Oct 2025 |

---

## 🎉 Conclusion

All Bootstrap Blocks are production-ready and fully documented. Each block has been designed to work seamlessly together while providing powerful standalone functionality. 

**Start Building:**
1. Choose your layout (BS Row + BS Column)
2. Add content blocks (Accordion, Testimonial, NAP, Service Area)
3. Customize styling and responsive behavior
4. Test across devices
5. Publish!

For detailed information on any specific block, refer to its individual documentation file linked above.

---

*Documentation Last Updated: October 2025*  
*All Blocks Version: 1.0.0*  
*Status: Production Ready ✅*

