# Dark Matter Portfolio - Setup Script for Windows

Write-Host "🌑 Dark Matter Portfolio - Setup" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Install dependencies
Write-Host "📦 Installing npm dependencies..." -ForegroundColor Yellow
npm install

# Create public directories
Write-Host "📁 Creating public directories..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path "public\images" | Out-Null
New-Item -ItemType Directory -Force -Path "public\fonts" | Out-Null

# Download 3D font
Write-Host "🔤 Downloading 3D text font..." -ForegroundColor Yellow
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/fonts/helvetiker_regular.typeface.json" -OutFile "public\fonts\helvetiker_regular.typeface.json"

Write-Host ""
Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next steps:" -ForegroundColor Cyan
Write-Host "1. Add project images to public/images/"
Write-Host "2. (Optional) Download Geist fonts - see FONTS.md"
Write-Host "3. Run 'npm run dev' to start development server"
Write-Host ""
Write-Host "🚀 Happy coding!" -ForegroundColor Magenta
