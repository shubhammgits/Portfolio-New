# Portfolio Customization Guide

This guide will help you customize your portfolio to make it your own.

## 1. Personal Information

### Header
- Update your name in `src/components/Header.tsx`
- Update navigation links if needed

### Hero Section
- Update your name and title in `src/components/Hero.tsx`
- Update your bio and description
- Replace the profile image with your own

### About Section
- Update the content in `src/components/About.tsx` to reflect your personal story

## 2. Projects

### Adding New Projects
1. Add project information to the `projects` array in `src/components/Projects.tsx`
2. Create a placeholder image in the `public` directory or add your own project images
3. Update the project links to point to your actual projects

### Project Structure
Each project object should include:
```typescript
{
  id: number,
  title: string,
  description: string,
  image: string, // path to image in public directory
  githubUrl: string,
  liveUrl: string,
  technologies: string[]
}
```

## 3. Skills

Update the skills section in `src/components/Skills.tsx`:
- Modify the skill categories to match your expertise
- Add or remove skills from each category
- Update the "Currently Diving Deep Into" section

## 4. Contact Information

### Email
- Update your email address in `src/components/Contact.tsx`
- Update the email in the "Get In Touch" button in `src/components/Skills.tsx`

### Social Links
- Update GitHub and LinkedIn links in `src/components/Header.tsx`
- Update social links in `src/components/Contact.tsx`

## 5. Images

### Profile Image
- Replace `public/profile-placeholder.svg` with your own image
- Update the image source in `src/components/Hero.tsx`

### Project Images
- Replace the placeholder images in the `public` directory with your actual project screenshots
- Update the image paths in `src/components/Projects.tsx`

### Favicon
- Replace `public/favicon.svg` with your own favicon

## 6. Colors

To change the color scheme:
1. Update the gradient colors in `src/components/Hero.tsx`
2. Update the background gradient in `src/components/Skills.tsx`
3. Modify Tailwind CSS classes throughout the components

## 7. SEO & Analytics

### Meta Tags
- Update the title and description in `src/app/layout.tsx`

### Google Analytics
- Replace `G-YOUR-GA-ID` with your actual Google Analytics ID in `src/app/layout.tsx`

## 8. Deployment

### GitHub Pages
1. Update the deployment workflow in `.github/workflows/deploy.yml`
2. Set up GitHub Pages in your repository settings

### Other Platforms
1. Run `npm run build` to create a production build
2. Deploy the `out` directory to your hosting provider

## 9. Testing

1. Run `npm run dev` to start the development server
2. Visit `http://localhost:3000` to preview your changes
3. Test all functionality including:
   - Dark mode toggle
   - Navigation links
   - Contact form
   - External links

## 10. Optimization

### Performance
- Optimize images for web use
- Minimize the number of external dependencies
- Use code splitting where appropriate

### Accessibility
- Ensure proper contrast ratios for text
- Add alt text to all images
- Test with screen readers

### SEO
- Add meta descriptions to all pages
- Use semantic HTML elements
- Implement structured data where appropriate