# F1 Telemetry Analysis Platform

A professional, high-performance web application for post-race F1 telemetry analysis with detailed lap-by-lap comparisons.

## 🚀 Features

### Core Features
- **Multi-Race Selection** - Browse all 24 races of the F1 season
- **Session Selection** - Choose from FP1, FP2, FP3, Qualifying, Race, or Sprint sessions
- **Multi-Driver Comparison** - Select and compare multiple drivers simultaneously
- **Lap Selection** - Choose specific laps per driver for detailed analysis
- **Color Customization** - Customize driver colors for better visualization
- **Team-Based Colors** - Auto-assigned team colors for drivers (Mercedes, Ferrari, Red Bull, etc.)

### Telemetry Data Visualization
- **Speed Trace** - Real-time speed data throughout the lap (0-350 km/h)
- **Throttle Input** - Throttle percentage along the circuit
- **Brake Pressure** - Braking intensity at each point
- **DRS Status** - DRS activation visualization

### Analysis Tools
- **Lap Times Table** - Side-by-side lap time comparison with gaps
- **Sector Comparison** - Detailed S1, S2, S3 breakdown
- **Sector Differences** - Shows which driver gained/lost time in each sector

### Design & UX
- **Dual Design Systems** - Toggle between Flat (clean, minimal) and Glassmorphism (Windows 11 style)
- **Light/Dark Mode** - Smooth theme switching with system preference detection
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Smooth Animations** - GSAP-powered interactions with intentional motion
- **Fast Performance** - Optimized for 60fps animations and instant interactions

## 📋 Getting Started

### Installation
1. Clone this repository
2. No dependencies needed for local testing (uses CDN for Chart.js and GSAP)
3. Open `index.html` in your browser

```bash
git clone https://github.com/euvcoderbot/f1.git
cd f1
open index.html  # macOS
# or
start index.html  # Windows
# or
xdg-open index.html  # Linux
```

### First Time Setup
1. The app loads with **2024 Australian GP Race** as default
2. **Select drivers** from the grid on the right side
3. **Choose laps** from the sidebar (auto-shows selected drivers' laps)
4. **View telemetry graphs** - Speed, Throttle, Brake, DRS data displays automatically

## 🎨 Design Modes

### Flat Design (Default)
- Clean, minimal aesthetic
- No shadows or depth effects
- Perfect for technical analysis
- Focus on data clarity

### Glassmorphism Mode
- Windows 11-inspired design
- Semi-transparent frosted glass cards
- Subtle backdrop blur
- Premium, modern feel

**Toggle:** Click the "FLAT/GLASS" button in the header (next to theme toggle)

## 🌓 Theme Modes

### Light Mode (Default)
- White background, dark text
- High contrast for readability
- Professional appearance

### Dark Mode
- Dark charcoal background (#1E1E1E)
- Light text
- Easier on eyes for extended use
- High contrast maintained

**Toggle:** Click the sun/moon icon in the header

## 📱 Responsive Behavior

### Desktop (1024px+)
- Sidebar always visible
- Full-width telemetry graphs
- Multi-column layouts

### Tablet (768px - 1023px)
- Sidebar toggleable via hamburger menu
- Auto-collapses after selection
- Optimized graph sizes

### Mobile (<768px)
- Sidebar hidden by default (hamburger menu)
- Full-width main content
- Touch-optimized buttons
- Vertical layout for better readability

## 🎮 How to Use

### Select a Race
1. Use the **Year** dropdown to select season (2024, 2025, etc.)
2. Use the **Race** dropdown or click race in sidebar list
3. Select a **Session** (FP1, FP2, FP3, Qualifying, Race)

### Compare Drivers
1. Click driver boxes in the **"Select Drivers"** grid
2. Selected drivers appear in the **"Selected Drivers"** box
3. Click the color circle to customize driver colors
4. Click the ✕ button to remove a driver

### Analyze Laps
1. **Laps** list in sidebar shows all laps for selected drivers
2. Click "BEST" filter to show only best laps
3. Click "Last 5" to show most recent laps
4. Click "All" to show all laps
5. Select laps by clicking them

### View Telemetry
- **Speed Graph** - Shows km/h throughout lap
- **Throttle Graph** - 0-100% throttle input
- **Brake Graph** - 0-100% brake pressure
- **DRS Graph** - Binary on/off visualization

### Compare Statistics
- **Lap Times Table** - Best lap highlighted, gap to best shown
- **Sector Comparison** - S1, S2, S3 times and differences

## 🔧 Technical Stack

### Frontend
- **HTML5** - Semantic structure
- **CSS3** - Custom properties, Grid, Flexbox
- **JavaScript (ES6+)** - Modular class-based architecture

### Libraries
- **GSAP 3.12** - Smooth animations
- **Chart.js 3.9** - Interactive telemetry graphs

### Data
- **Mock Data** - Pre-generated realistic F1 telemetry
- Ready to integrate with **FastF1 Python backend**

## 📊 Data Structure

Mock data includes:
- 24 F1 races for 2024 season
- 10 drivers per race
- Multiple sessions (FP1-3, Qualifying, Race)
- Full telemetry per lap:
  - Speed, Throttle, Brake, DRS
  - Sector times (S1, S2, S3)
  - Lap classifications

## 🔄 Next Steps

### Planned Features
1. **Real FastF1 Data Integration** - Replace mock data with real telemetry
2. **Incident Markers** - Show safety cars, yellows, accidents
3. **Fuel Analysis** - Track fuel consumption and strategy
4. **Tire Degradation** - Visualize tire performance over stint
5. **Export** - Download comparisons as PDF/PNG
6. **Share** - Generate shareable comparison links
7. **Season Overview** - Multi-race stats and trends
8. **Qualifying Analysis** - Detailed Q1, Q2, Q3 breakdowns

## 🐛 Known Limitations (Current Version)

- Mock data is randomly generated (not real race data)
- No incident/safety car markers
- Graphs don't animate (intentional - user requested no graph animation)
- No real-time data updates
- Single lap comparison per driver (can compare multiple laps from same driver)

## 🚀 Deployment

### Local Testing
```bash
python -m http.server 8000
# Open http://localhost:8000
```

### GitHub Pages
Push to your `gh-pages` branch and enable in repository settings.

### Vercel/Netlify
Connect your repository and deploy with one click.

## 📝 File Structure

```
f1/
├── index.html          # Main HTML structure
├── styles.css          # All styles (flat + glass + animations)
├── app.js              # Main application logic
├── data/
│   └── mock-data.js    # Test data generator
├── DESIGN_SPEC.md      # Design specification
└── README.md           # This file
```

## 🎯 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔐 Privacy

This is a client-side application:
- No data sent to external servers (except CDN for libraries)
- All processing happens in browser
- No tracking or analytics

## 📄 License

Open source - feel free to modify and use!

## 🤝 Contributing

Suggestions? Found a bug? Want to improve the design?
- Create an issue
- Submit a pull request
- Share feedback

## 📞 Support

For questions or issues:
1. Check the DESIGN_SPEC.md for detailed specifications
2. Review the code comments in app.js
3. Create a GitHub issue with details

---

**Built with ❤️ for F1 enthusiasts and data analysts**

*Last Updated: 2026-06-20*
