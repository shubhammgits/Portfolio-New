# Font Setup Instructions

## Download Required Fonts

### 1. Geist Font Family

Download from [Vercel Font](https://vercel.com/font):
- `GeistVF.woff` 
- `GeistMonoVF.woff`

Place them in `app/fonts/` directory.

### 2. Helvetiker Font (For 3D Text)

Download from Three.js examples:
```bash
# Navigate to public/fonts/
cd public/fonts

# Download helvetiker typeface
curl -O https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/fonts/helvetiker_regular.typeface.json
```

Or manually download from: https://github.com/mrdoob/three.js/tree/dev/examples/fonts

## Alternative: System Fonts

If you prefer to use system fonts, update `app/layout.tsx`:

```tsx
// Remove localFont imports
import type { Metadata } from "next";
import "./globals.css";
import LenisWrapper from "@/components/LenisWrapper";

// Remove font variables from className
<html lang="en">
  <body className="font-sans">
```

And update `tailwind.config.ts`:

```typescript
fontFamily: {
  sans: ['system-ui', 'sans-serif'],
  mono: ['monospace'],
},
```
