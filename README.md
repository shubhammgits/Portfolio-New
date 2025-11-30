# Dark Matter Portfolio

A world-class, award-winning 3D portfolio website built with Next.js 15, React Three Fiber, and advanced WebGL techniques.

## Features

- 🌑 **Dark Matter Aesthetic**: Moody, premium design with sophisticated charcoal gradients
- 🎭 **Cinema Preloader**: 3D assembling wireframe shard with particle explosion
- 🎮 **Living 3D Avatar**: Mouse-tracking avatar with physics-based floating shards
- 📜 **Scroll-Driven Camera**: Fly-through experience synchronized with scroll
- 🖼️ **Liquid Shader Cards**: Project cards with chromatic aberration and ripple effects
- 🧲 **Magnetic Navigation**: Glass-morphic navbar with physical button attraction
- 🎉 **3D Confetti**: Geometric primitives explosion using instancedMesh
- 🎨 **Post-Processing**: Bloom, noise, and vignette for cinematic quality
- ⚡ **Performance Optimized**: Instancing, LOD, and efficient render loops

## Tech Stack

- **Framework**: Next.js 15 (App Router, TypeScript)
- **3D Engine**: React Three Fiber, Drei
- **Physics**: Rapier (via @react-three/rapier)
- **Animation**: GSAP with ScrollTrigger
- **Smooth Scroll**: Lenis (React-Lenis)
- **State**: Zustand
- **Styling**: Tailwind CSS
- **Post-Processing**: @react-three/postprocessing

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
Portfolio-New/
├── app/
│   ├── layout.tsx        # Root layout with Lenis wrapper
│   ├── page.tsx          # Main page with all sections
│   └── globals.css       # Dark Matter styles & animations
├── components/
│   ├── Scene.tsx         # 3D Canvas wrapper with Noir lighting
│   ├── LoadingScreen.tsx # Cinema preloader with 3D shard
│   ├── HeroScene.tsx     # Living bio with avatar & shards
│   ├── FloatingElement.tsx # Reusable physics object
│   ├── ProjectCard.tsx   # Liquid shader project cards
│   ├── Navigation.tsx    # Magnetic glass-morph navbar
│   ├── LikeButton.tsx    # 3D confetti like button
│   └── LenisWrapper.tsx  # Smooth scroll provider
├── store/
│   └── sceneStore.ts     # Zustand state management
└── public/
    ├── images/           # Project images
    └── fonts/            # Custom fonts
```

## Color Palette (Dark Matter)

- **Background Dark**: `#222222`
- **Background Light**: `#313647`
- **Primary Elements**: `#44444E`
- **Secondary Elements**: `#333446`
- **Text**: `#FFFFFF` (80-100% opacity)

## Performance Tips

- Uses `instancedMesh` for confetti particles
- Rapier physics with optimized collision detection
- LOD (Level of Detail) for distant objects
- Efficient `useFrame` loops with conditional rendering
- Mobile-responsive with 3D elements hidden on small screens

## Customization

### Update Projects

Edit the projects array in `components/ProjectCard.tsx`:

```typescript
const projects = [
  { id: 0, title: 'Your Project', image: '/images/yourimage.jpg' },
  // Add more projects...
];
```

### Modify Colors

Update Tailwind config in `tailwind.config.ts`:

```typescript
colors: {
  'dm-bg-dark': '#222222',
  'dm-bg-light': '#313647',
  // Customize...
}
```

### Adjust Scroll Pages

In `app/page.tsx`, change the `scrollPages` prop:

```tsx
<Scene scrollPages={5}> {/* Increase for more sections */}
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- WebGL 2.0 required

## License

MIT

## Credits

Inspired by award-winning studios:
- Billo Design (scroll-driven experiences)
- Nature Beyond (parallax cards)
- TensorStax (cinema preloaders)
- Oscar Hernandez (interactive UI)

---

Built with 🌑 Dark Matter energy
