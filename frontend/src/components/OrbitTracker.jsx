import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Paper,
  useTheme,
} from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import styled from '@emotion/styled';

// Custom styled components
const SpaceContainer = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(45deg, #1a237e 30%, #000051 90%)',
  color: '#fff',
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
    pointerEvents: 'none',
  }
}));

const StarField = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: 'hidden',
  pointerEvents: 'none',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(2px 2px at 20px 30px, #fff, rgba(0,0,0,0)), radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)), radial-gradient(2px 2px at 50px 160px, #fff, rgba(0,0,0,0)), radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)), radial-gradient(2px 2px at 130px 80px, #fff, rgba(0,0,0,0)), radial-gradient(2px 2px at 160px 120px, #fff, rgba(0,0,0,0))',
    backgroundRepeat: 'repeat',
    backgroundSize: '200px 200px',
    animation: 'twinkle 4s infinite',
    opacity: 0.3,
  },
  '@keyframes twinkle': {
    '0%': { opacity: 0.3 },
    '50%': { opacity: 0.6 },
    '100%': { opacity: 0.3 },
  }
});

const MapWrapper = styled(Box)({
  position: 'relative',
  height: '500px',
  width: '100%',
  borderRadius: '8px',
  overflow: 'hidden',
  '& .leaflet-container': {
    background: 'transparent !important',
  },
  '& .leaflet-tile-pane': {
    opacity: 0.7,
  }
});

// Custom satellite icon
const createSatelliteIcon = (color) => {
  return L.divIcon({
    className: 'custom-satellite-icon',
    html: `
      <div style="
        width: 20px;
        height: 20px;
        background: ${color};
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 0 10px ${color};
        position: relative;
      ">
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
        "></div>
      </div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

const satellites = [
  { id: '25544', name: 'International Space Station', color: '#00ff00' },
  { id: '20580', name: 'Hubble Space Telescope', color: '#ff0000' },
  { id: '37820', name: 'Tiangong-1', color: '#0000ff' }
];

const OrbitTracker = () => {
  const [selectedSatellite, setSelectedSatellite] = useState(satellites[0].id);
  const [satelliteData, setSatelliteData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orbitTrail, setOrbitTrail] = useState([]);
  const theme = useTheme();
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchSatelliteData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:8000/api/tle/${selectedSatellite}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Failed to fetch satellite data');
        }
        const data = await response.json();
        if (!data.latitude || !data.longitude) {
          throw new Error('Invalid satellite position data received');
        }
        setSatelliteData(data);
        
        // Update orbit trail
        setOrbitTrail(prev => {
          const newTrail = [...prev, [data.latitude, data.longitude]];
          return newTrail.slice(-50); // Keep last 50 positions
        });
      } catch (error) {
        console.error('Error fetching satellite data:', error);
        setError(error.message || 'Failed to fetch satellite data. Please try again later.');
      }
      setLoading(false);
    };

    fetchSatelliteData();
    const interval = setInterval(fetchSatelliteData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [selectedSatellite]);

  const selectedSat = satellites.find(s => s.id === selectedSatellite);

  return (
    <SpaceContainer elevation={3}>
      <StarField />
      <Typography variant="h5" gutterBottom sx={{ color: '#fff', mb: 3 }}>
        Orbit Tracker
      </Typography>
      <Select
        value={selectedSatellite}
        onChange={(e) => setSelectedSatellite(e.target.value)}
        fullWidth
        sx={{
          mb: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: '#fff',
          '& .MuiSelect-icon': {
            color: '#fff',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.3)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.5)',
          },
        }}
      >
        {satellites.map((sat) => (
          <MenuItem key={sat.id} value={sat.id}>
            {sat.name}
          </MenuItem>
        ))}
      </Select>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {loading ? (
        <Box display="flex" justifyContent="center" p={3}>
          <CircularProgress sx={{ color: '#fff' }} />
        </Box>
      ) : (
        <MapWrapper>
          <MapContainer
            center={satelliteData ? [satelliteData.latitude, satelliteData.longitude] : [0, 0]}
            zoom={2}
            style={{ height: '100%', width: '100%' }}
            ref={mapRef}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {satelliteData && (
              <>
                <Marker
                  position={[satelliteData.latitude, satelliteData.longitude]}
                  icon={createSatelliteIcon(selectedSat.color)}
                >
                  <Popup>
                    <Typography variant="subtitle2">
                      {selectedSat.name}
                    </Typography>
                    <Typography variant="body2">
                      Latitude: {satelliteData.latitude.toFixed(2)}°
                    </Typography>
                    <Typography variant="body2">
                      Longitude: {satelliteData.longitude.toFixed(2)}°
                    </Typography>
                    <Typography variant="body2">
                      Altitude: {satelliteData.altitude} km
                    </Typography>
                    <Typography variant="body2">
                      Velocity: {satelliteData.velocity} km/s
                    </Typography>
                  </Popup>
                </Marker>
                {orbitTrail.map((pos, index) => (
                  <Circle
                    key={index}
                    center={pos}
                    radius={100}
                    pathOptions={{
                      color: selectedSat.color,
                      fillColor: selectedSat.color,
                      fillOpacity: 0.1,
                      weight: 1,
                    }}
                  />
                ))}
              </>
            )}
          </MapContainer>
        </MapWrapper>
      )}
    </SpaceContainer>
  );
};

export default OrbitTracker; 