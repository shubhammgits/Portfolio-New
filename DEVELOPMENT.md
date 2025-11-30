# Dark Matter Portfolio - Development Guide

## 🚀 Quick Start

The project is now **fully set up and running**!

### Development Server
```bash
npm run dev
```
Visit: **http://localhost:3000**

### Production Build
```bash
npm run build
npm start
```

## 📁 Project Structure Overview

```
Portfolio-New/
├── app/
│   ├── layout.tsx          # Root layout with Lenis smooth scrolling
│   ├── page.tsx            # Main page (5 sections)
│   ├── globals.css         # Dark Matter styles + animations
│   └── fonts/              # Font files (placeholders)
│
├── components/
│   ├── Scene.tsx           # 3D Canvas with Noir lighting
│   ├── LoadingScreen.tsx   # Cinema preloader (3D shard)
│   ├── HeroScene.tsx       # Living avatar + floating shards
│   ├── FloatingElement.tsx # Physics-based 3D objects
│   ├── ProjectCard.tsx     # Liquid shader project cards
│   ├── Navigation.tsx      # Magnetic glass-morph navbar
│   ├── LikeButton.tsx      # 3D confetti button
│   └── LenisWrapper.tsx    # Smooth scroll provider
│
├── store/
│   └── sceneStore.ts       # Zustand state management
│
└── public/
    ├── images/             # Project images (add yours)
    └── fonts/              # 3D text fonts
```

## 🎨 Implemented Features

### ✅ Core Components

1. **Cinema Preloader**
   - 3D assembling wireframe icosahedron
   - Real-time loading percentage
   - Particle explosion transition
   - Located: `components/LoadingScreen.tsx`

2. **Hero Section**
   - Mouse-tracking 3D avatar sphere
   - 20 floating physics-based shards
   - Scroll-triggered text shattering effect
   - Located: `components/HeroScene.tsx`

3. **Scene Lighting (Noir Setup)**
   - Key light (top-left, soft)
   - Rim light (back, cool white)
   - Ambient occlusion simulation
   - Volumetric fog
   - Located: `components/Scene.tsx`

4. **Post-Processing**
   - Bloom (for rim lights)
   - Film grain noise
   - Vignette (cinematic framing)
   - Located: `components/Scene.tsx`

5. **Navigation**
   - Glass-morphic pill design
   - Magnetic button attraction
   - Backdrop blur effect
   - Auto-scrolling to sections
   - Located: `components/Navigation.tsx`

6. **Project Cards**
   - Custom liquid distortion shader
   - Chromatic aberration on hover
   - Z-axis parallax scrolling
   - Focus mode (camera zoom)
   - Located: `components/ProjectCard.tsx`

7. **Like Button**
   - Global like counter
   - 3D geometric confetti explosion
   - InstancedMesh for performance
   - Located: `components/LikeButton.tsx`

8. **Smooth Scrolling**
   - Lenis integration
   - Scroll progress tracking
   - Camera fly-through animation
   - Located: `components/LenisWrapper.tsx`

## 🎯 Customization Guide

### Change Colors

Edit `tailwind.config.ts`:
```typescript
colors: {
  'dm-bg-dark': '#YOUR_COLOR',     // Main background
  'dm-bg-light': '#YOUR_COLOR',    // Gradient end
  'dm-primary': '#YOUR_COLOR',     // Primary elements
  'dm-secondary': '#YOUR_COLOR',   // Secondary elements
  'dm-text': '#FFFFFF',            // Text color
}
```

### Add Your Projects

Edit `components/ProjectCard.tsx`:
```typescript
const projects = [
  { id: 0, title: 'My Awesome Project', image: '/images/project1.jpg' },
  { id: 1, title: 'Another Cool One', image: '/images/project2.jpg' },
  // Add more...
];
```

Then add images to `public/images/`:
- `project1.jpg`
- `project2.jpg`
- etc.

### Update Content

Edit `app/page.tsx` sections:

**Hero Section** (Line ~42):
```tsx
<h1 className="text-7xl...">Your Name</h1>
<p className="text-xl...">Your tagline</p>
```

**About Section** (Line ~55):
```tsx
<p className="text-lg...">Your bio</p>
```

**Contact Section** (Line ~87):
```tsx
<a href="mailto:YOUR_EMAIL">YOUR_EMAIL</a>
```

### Adjust Scroll Pages

In `app/page.tsx` (Line ~35):
```tsx
<Scene scrollPages={5}> {/* Change number for more/fewer sections */}
```

## 🔧 Advanced Customization

### Replace Avatar Mesh

In `components/HeroScene.tsx`, replace the placeholder sphere with your model:

```tsx
// Before (placeholder)
<sphereGeometry args={[1.5, 32, 32]} />

// After (with your model)
import { useGLTF } from '@react-three/drei';
const { scene } = useGLTF('/models/avatar.glb');
<primitive object={scene} />
```

### Add More Floating Shards

In `components/HeroScene.tsx` (Line ~108):
```tsx
const shardPositions = useMemo(() => {
  return Array.from({ length: 50 }, () => [ // Increase from 20 to 50
    // ...
  ]);
}, []);
```

### Modify Physics

In `components/FloatingElement.tsx`:

**Brownian Motion Speed**:
```tsx
const brownianForce = new THREE.Vector3(
  Math.sin(time * 0.5 + ...) * 0.05, // Increase 0.3 and 0.02 for faster/stronger
  // ...
);
```

**Mouse Repulsion**:
```tsx
const repulsionRadius = 10; // Increase from 5 for larger radius
const forceMagnitude = (1 - distance / repulsionRadius) * 1.0; // Increase 0.5
```

### Change Shader Effects

In `components/ProjectCard.tsx`:

**Liquid Ripple Intensity**:
```tsx
float rippleEffect = sin(distance * 20.0 - time * 5.0) * 0.05 * uHover; // Change 0.01 to 0.05
```

**Chromatic Aberration Amount**:
```tsx
vec3 color = chromaticAberration(uTexture, uv, 0.01 * uHover); // Change 0.003 to 0.01
```

## 📱 Performance Optimization

### Current Optimizations
- ✅ Dynamic imports (no SSR for 3D components)
- ✅ InstancedMesh for confetti particles
- ✅ Conditional rendering based on scroll
- ✅ DPR limiting [1, 2]
- ✅ Physics damping for stability
- ✅ Rapier physics (efficient)

### For Mobile
Add in `components/Scene.tsx`:
```tsx
<Canvas
  dpr={typeof window !== 'undefined' && window.innerWidth < 768 ? [1, 1] : [1, 2]}
  // ...
>
```

Reduce particle counts in `LoadingScreen.tsx` and `LikeButton.tsx`:
```tsx
const particleCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 50 : 100;
```

## 🐛 Troubleshooting

### White Screen
- Check browser console (F12)
- Ensure dev server is running (`npm run dev`)
- Clear browser cache

### 3D Not Loading
- Check if WebGL is enabled in browser
- Verify all components are dynamically imported
- Check for TypeScript errors: `npm run build`

### Performance Issues
- Reduce `scrollPages` in Scene
- Lower particle counts
- Reduce number of floating shards
- Disable post-processing temporarily

### Scroll Not Smooth
- Verify Lenis is initialized in `LenisWrapper`
- Check browser doesn't have other scroll scripts
- Try adjusting `lerp` value (0.05 to 0.1)

## 🎓 Learning Resources

### Three.js & R3F
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Drei Components](https://github.com/pmndrs/drei)
- [Three.js Journey](https://threejs-journey.com/)

### Shaders
- [The Book of Shaders](https://thebookofshaders.com/)
- [Shader Toy](https://www.shadertoy.com/)

### GSAP
- [GSAP Docs](https://gsap.com/docs/v3/)
- [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
```bash
npm run build
# Deploy the .next folder + public folder + package.json
```

## 📝 Next Steps

1. ✅ Add your project images to `public/images/`
2. ✅ Update text content in `app/page.tsx`
3. ✅ (Optional) Replace placeholder avatar
4. ✅ (Optional) Download Geist fonts (see `FONTS.md`)
5. ✅ Test on different devices
6. ✅ Deploy to Vercel

## 💡 Tips

- Use `leva` for live debugging: `npm install leva`
- Add performance monitoring: `<Perf />` from `r3f-perf`
- Test in Chrome DevTools Performance tab
- Consider adding a "Reduce Motion" toggle for accessibility

---

**Built with 🌑 Dark Matter energy**

Need help? Check the code comments in each component file!
