# F1 Telemetry Site - Design Specification

## Overview
Post-race telemetry analysis tool with detailed lap comparison, multi-driver support, and professional UI with light/dark modes.

---

## Screen Layout

### Desktop View
```
┌─────────────────────────────────────────────────────────────┐
│ HEADER: Breadcrumb + Logo + Light/Dark Toggle               │
├──────────────────┬──────────────────────────────────────────┤
│                  │                                          │
│  LEFT SIDEBAR    │         MAIN CONTENT AREA                │
│  (Always Open)   │                                          │
│                  │  - Telemetry Graphs (Speed/Throttle/    │
│  [Year ▼]        │    Brake/DRS stacked vertically)        │
│  [Race ▼]        │                                          │
│  [Session ▼]     │  - Selected Drivers Grid (4-6 boxes)    │
│                  │    (with driver no., name, team color)   │
│  Race list       │                                          │
│  (scrollable)    │  - Stats Table + Sector Diff Table      │
│                  │                                          │
│  Laps section    │  - All Laps List (with filtering)       │
│  (lap times)     │                                          │
│                  │                                          │
└──────────────────┴──────────────────────────────────────────┘
```

### Mobile View
```
┌───────────────────────────────────┐
│ HEADER: Logo | [☰] Hamburger       │  ← Sidebar hidden
├───────────────────────────────────┤
│                                   │
│  Main Content (Full Width)        │
│                                   │
│  (When user makes selection,      │
│   sidebar auto-collapses to ☰)    │
│                                   │
└───────────────────────────────────┘

[Tap ☰] → Sidebar slides in
```

---

## Components

### 1. Header Bar
- **Left:** F1 Telemetry Logo
- **Center:** Breadcrumb (e.g., "2024 > Australian GP > Race > Comparison")
- **Right:** Light/Dark Mode Toggle Button

### 2. Left Sidebar (Desktop: Always Visible | Mobile: Collapsible)

#### Dropdowns (at top, always visible):
```
[2024 ▼]           ← Year (defaults to current year)
[Australian GP ▼]  ← Race (defaults to last race that happened)
[RACE ▼]           ← Session (FP1, FP2, FP3, Qualifying, Race)
```

#### Race List Section:
- Scrollable list of all 24 races for selected year
- Show: Race name + date + round number
- Clickable to change race

#### Laps Section (Below race list):
- Shows lap times for selected driver(s)
- Group by stint (Stint 1, Stint 2, etc.) - auto-detect based on tire changes
- Show lap number + lap time
- Highlight best lap
- Clickable to select/deselect for comparison

#### Collapsibility:
- Desktop: Always open (can collapse manually)
- Mobile: Auto-collapse after user makes selections, toggle via ☰

---

### 3. Main Content Area

#### A. Telemetry Graphs (Stacked Vertically)
**X-axis:** Distance along circuit (% or km)
**Y-axis:** Value (Speed km/h, Throttle %, Brake %, DRS 0/1)

Each graph shows:
- Multiple driver traces (team-based colors)
- If same driver has multiple laps: different shades of same color
- Legend showing: Driver Name | Color | Lap Number

**Graphs:**
1. **Speed Trace** (0-350 km/h)
2. **Throttle %** (0-100%)
3. **Brake %** (0-100%)
4. **DRS Status** (0=Closed, 1=Open - binary/bar chart)

#### B. Selected Drivers Grid (Below graphs)
- Rectangular boxes in a grid (4-6 drivers per row)
- Each box shows:
  - Driver number (top-left corner)
  - Driver name (bottom)
  - Team logo (small icon)
  - Team color border/background
- Clicking a driver box:
  - Opens color picker (custom color selection)
  - Shows driver's lap list in sidebar
  - Updates telemetry graphs

#### C. Stats & Comparison Table

**Stats Table:**
| Driver | Selected Lap | Lap Time | Gap to Best | S1 | S2 | S3 |
|--------|--------------|----------|-------------|----|----|-----|
| Hamilton | Lap 42 | 1:23.456 | BEST | 0:28.1 | 0:27.9 | 0:27.4 |
| Verstappen | Lap 15 | 1:23.789 | +0.333s | 0:28.3 | 0:27.8 | 0:27.7 |

**Sector Difference Table:**
| Sector | Hamilton | Verstappen | Δ |
|--------|----------|-----------|-----|
| S1 | 0:28.1 | 0:28.3 | +0.2s (VER) |
| S2 | 0:27.9 | 0:27.8 | -0.1s (HAM) |
| S3 | 0:27.4 | 0:27.7 | +0.3s (VER) |

#### D. All Laps List (Expandable Section)
- Show all available laps for selected session
- Filter options: Best lap, Last 5 laps, Custom range
- User can multi-select laps to compare
- Displays: Lap # | Lap Time | Status (In/Out Lap, Best, etc.)

---

## Colors & Styling

### Team-Based Driver Colors
```
Mercedes: Silver (#00D4BE or #B6B8BB)
Red Bull: Navy Blue (#0600EF)
Ferrari: Red (#DC0000)
McLaren: Orange (#FF8700)
Alpine: Light Blue (#0082FA)
Alfa Romeo: Burgundy (#900000)
Haas: White (#FFFFFF border)
AlphaTauri: Navy (#2B4562)
Williams: Light Blue (#00A4EF)
Aston Martin: Dark Green (#006C3B)
```

### Light Mode
- Background: White/Light Gray (#F5F5F5)
- Text: Dark (#1A1A1A)
- Graphs: Light gridlines (#DDD)
- Borders: Light gray (#CCC)
- Hover: Slight shadow, light background change

### Dark Mode
- Background: Dark Charcoal (#1E1E1E)
- Text: Light (#E0E0E0)
- Graphs: Subtle gridlines (#333)
- Borders: Medium gray (#555)
- Hover: Bright accent highlight
- Accent colors: Neon/bright (for highlights, buttons)

### Color Customization for Drivers
- User can click on driver box → open color picker
- Saves preference for that session/comparison
- Shades: Same hue, varying saturation/brightness for multiple laps

---

## Data Flow

```
1. User defaults to:
   - Year: 2024 (or current season)
   - Race: Last race that happened (e.g., Australian GP)
   - Session: RACE
   
2. Sidebar shows available sessions + all drivers in that race
   
3. User selects driver(s) from sidebar:
   - Driver added to "Selected Drivers" grid
   - Laps populate in sidebar
   
4. User selects lap(s) from sidebar:
   - Telemetry graphs update
   - Stats table shows comparison
   
5. Optional: User can:
   - Change colors for drivers
   - Filter/search laps
   - Export data/graphs
```

---

## API & Data Requirements

### FastF1 Data Needed Per Race:
- Lap telemetry:
  - Time (seconds into lap)
  - Distance (meters)
  - Speed (km/h)
  - Throttle (0-100%)
  - Brake (0-100%)
  - DRS (0 or 1)
  - Gear (optional)
  - RPM (optional)
  
- Lap info:
  - Lap time
  - Sector times (S1, S2, S3)
  - Is best lap flag
  - Tire compound
  - Lap classification (In/Out/etc)

- Driver info:
  - Driver number
  - Driver name
  - Team
  - Team color(s)

### Data Format (JSON):
```json
{
  "year": 2024,
  "round": 3,
  "race": {
    "name": "Australian Grand Prix",
    "date": "2024-03-24",
    "circuit": "Albert Park"
  },
  "session": {
    "type": "Race",
    "duration": "2:08:43"
  },
  "drivers": {
    "44": {
      "name": "Lewis Hamilton",
      "number": 44,
      "team": "Mercedes",
      "teamColor": "#00D4BE",
      "laps": {
        "1": {
          "lapTime": 83.456,
          "isbestLap": false,
          "sector1": 28.1,
          "sector2": 27.9,
          "sector3": 27.4,
          "tireCompound": "soft",
          "telemetry": [
            {"time": 0, "distance": 0, "speed": 0, "throttle": 0, "brake": 0, "drs": 0},
            {"time": 0.1, "distance": 10, "speed": 50, "throttle": 100, "brake": 0, "drs": 0},
            ...
          ]
        }
      }
    }
  }
}
```

---

## Responsive Behavior

### Desktop (1024px+)
- Sidebar always visible (can collapse manually)
- 3-column layout possible for large screens
- Full-width telemetry graphs

### Tablet (768px - 1023px)
- Sidebar toggleable (hamburger)
- Auto-collapse after selections
- Graphs scale to screen width

### Mobile (< 768px)
- Sidebar hidden by default (☰ hamburger)
- Full-width main content
- Auto-collapse after each selection
- Graphs optimized for portrait/landscape

---

## Interactions & States

### Driver Selection
- [ ] Unselected (clickable)
- [✓] Selected (highlighted border, colored background)
- [Color Circle] Click to customize color

### Lap Selection
- Show all laps in sidebar
- Multi-select checkboxes
- Best lap highlighted with badge
- Live graph update as selections change

### Graph Hover States
- Show exact values (speed, throttle, brake at each distance point)
- Tooltip with driver name + value
- Highlight trace on hover

### Mobile Interactions
- Tap driver box → select
- Tap lap → select/deselect
- Swipe sidebar to dismiss
- Tab through graphs (scroll on mobile)

---

## Performance Considerations

- **Lazy load** race data only when selected
- **Cache** telemetry data client-side (localStorage)
- **Optimize graphs** for 60fps (use requestAnimationFrame)
- **Debounce** lap selection updates
- **Minimize bundle size** (chart.js + minimal dependencies)

---

## Accessibility

- ARIA labels for buttons/selects
- High contrast text (WCAG AA minimum)
- Keyboard navigation (Tab, Enter, Arrow keys)
- Screen reader friendly graph descriptions
- Color-blind friendly: Don't rely on color alone (use patterns/labels)

---

## Future Enhancements

1. Weather data overlay
2. Fuel consumption analysis
3. Tire degradation curves
4. DRS activation timeline
5. Incident/safety car markers
6. Race strategy visualization
7. Driver telemetry comparison (same lap, different drivers)
8. Export as PDF/PNG
9. Share comparison link
10. Historical season comparison
