# Cosmic Pulse 🌌

An interactive space awareness dashboard that provides daily cosmic updates, combining data on astronomy pictures, asteroids near Earth, space weather events, Mars weather, and natural disasters on Earth.

## Features

- 🌌 Today in Space: Astronomy Picture of the Day and exoplanet facts
- ☄️ Asteroids Incoming: Track near-Earth objects and potential impacts
- 🌞 Space Weather Watch: Monitor solar activity and space weather events
- 🌍 Live Earth Snapshot: View Earth from space and track natural events
- 🔴 Mars Corner: Current weather and conditions on Mars
- 🛰️ Orbit Tracker: Track satellites and space objects in real-time

## Tech Stack

- Frontend: React.js with Material-UI
- Backend: FastAPI (Python)
- APIs: NASA APIs (APOD, NeoWs, DONKI, EPIC), EONET, InSight, Exoplanet Archive, TLE API

## Prerequisites

- Python 3.8+
- Node.js 14+
- NASA API key (get one at https://api.nasa.gov/)

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cosmic-pulse.git
cd cosmic-pulse
```

2. Set up the backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. Create a `.env` file in the backend directory:
```
NASA_API_KEY=your_nasa_api_key_here
```

4. Set up the frontend:
```bash
cd ../frontend
npm install
```

## Running the Application

1. Start the backend server:
```bash
cd backend
uvicorn main:app --reload
```

2. In a new terminal, start the frontend development server:
```bash
cd frontend
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

- `/api/apod` - Astronomy Picture of the Day
- `/api/neo` - Near Earth Objects
- `/api/eonet` - Earth events
- `/api/donki` - Space weather
- `/api/epic` - Earth image
- `/api/mars` - Mars weather
- `/api/exoplanets` - Exoplanet data
- `/api/tle` - Satellite TLE data

## Acknowledgments

- NASA for providing the APIs
- Material-UI for the beautiful components
- React Leaflet for the map functionality 