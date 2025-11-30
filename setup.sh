#!/bin/bash

# Installation and Setup Script for Dark Matter Portfolio

echo "🌑 Dark Matter Portfolio - Setup"
echo "================================"

# Install dependencies
echo "📦 Installing npm dependencies..."
npm install

# Create public directories
echo "📁 Creating public directories..."
mkdir -p public/images
mkdir -p public/fonts

# Download 3D font
echo "🔤 Downloading 3D text font..."
curl -o public/fonts/helvetiker_regular.typeface.json https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/fonts/helvetiker_regular.typeface.json

echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Add project images to public/images/"
echo "2. (Optional) Download Geist fonts - see FONTS.md"
echo "3. Run 'npm run dev' to start development server"
echo ""
echo "🚀 Happy coding!"
