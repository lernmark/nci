# Nordic Circular Investments
[![Netlify Status](https://api.netlify.com/api/v1/badges/5690d8a3-9530-4163-a0fd-06524ac381f6/deploy-status)](https://app.netlify.com/projects/nordiccircularinvestments/deploys)

## Shared header

All pages use the same header component from `site-header.js`. Include the shared stylesheet and script in the page `<head>`:

```html
<link rel="stylesheet" href="site-header.css">
<script src="site-header.js" defer></script>
```

Place the component where the header should appear:

```html
<site-header></site-header>
```

For a page inside a subfolder, use `../site-header.css` and `../site-header.js`. The component resolves shared navigation links and logos from the script's location, including on nested pages. The header works both from a local `file://` page and when served through HTTP.

## Styles and fonts

The site does not load anything from third parties. Fonts (Inter, Libre Baskerville) are served from `fonts/`, and Tailwind CSS is compiled to `tailwind.css`.

After adding or changing Tailwind classes in any HTML or JS file, rebuild with the [Tailwind CSS v3 standalone CLI](https://github.com/tailwindlabs/tailwindcss/releases/tag/v3.4.17):

```
tailwindcss -c tailwind.config.js -i tailwind-input.css -o tailwind.css --minify
```

Commit the regenerated `tailwind.css`. The privacy policy is `privacy.html`.
