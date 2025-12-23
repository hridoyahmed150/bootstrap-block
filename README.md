# Bootstrap Blocks

A WordPress plugin providing custom Gutenberg blocks styled with Bootstrap 5.

## Features

- **Bootstrap Row Block**: Create responsive sections with Bootstrap grid system
- **Column Management**: Add/remove columns with visual controls
- **Responsive Design**: Set different column widths for each Bootstrap breakpoint (XS, SM, MD, LG, XL, XXL)
- **Offset Support**: Add column offsets for advanced layouts
- **Auto-adjustment**: Smart column width distribution to maintain 12-column grid
- **Background Options**: Color or image backgrounds
- **Custom Padding**: Set padding for top, right, bottom, left

## Development Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the plugin directory:
   ```bash
   cd wp-content/plugins/bootstrap-blocks
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Build Commands

- **Development** (with watch mode):
  ```bash
  npm start
  ```

- **Production build**:
  ```bash
  npm run build
  ```

- **Format code**:
  ```bash
  npm run format
  ```

- **Lint JavaScript**:
  ```bash
  npm run lint:js
  ```

- **Lint CSS**:
  ```bash
  npm run lint:css
  ```

## Usage

1. Activate the plugin in WordPress admin
2. Create or edit a post/page
3. Add the "Bootstrap Row" block from the block inserter
4. Configure columns, padding, and background in the block sidebar

## Block Structure

The Bootstrap Row block outputs:
```html
<div class="emg-bs-sec-{unique-id}">
  <div class="container">
    <div class="row">
      <div class="col-12 col-lg-6 col-xxl-5 offset-lg-1">
        <!-- Column content -->
      </div>
      <div class="col-12 col-lg-6 col-xxl-7">
        <!-- Column content -->
      </div>
    </div>
  </div>
</div>
```

## Development

### Adding New Blocks

1. Create a new directory in `src/` for your block
2. Add the block to `webpack.config.js` entry points
3. Create `block.json` for block configuration
4. Build with `npm run build`

### File Structure

```
bootstrap-blocks/
├── src/
│   └── bs-row/
│       ├── index.js
│       ├── block.json
│       └── style.css
├── build/
│   └── bs-row/
│       ├── index.js
│       └── index.css
├── bootstrap-blocks.php
├── package.json
├── webpack.config.js
└── README.md
```

## License

GPL-2.0-or-later 