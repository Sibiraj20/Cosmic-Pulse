import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import TodayInSpace from './components/TodayInSpace';
import AsteroidsIncoming from './components/AsteroidsIncoming';
import SpaceWeatherWatch from './components/SpaceWeatherWatch';
import LiveEarthSnapshot from './components/LiveEarthSnapshot';
import MarsCorner from './components/MarsCorner';
import OrbitTracker from './components/OrbitTracker';
import SpaceLayout from './components/SpaceLayout';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#0a1929',
      paper: '#1a2027',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <SpaceLayout>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/today" element={<TodayInSpace />} />
                <Route path="/asteroids" element={<AsteroidsIncoming />} />
                <Route path="/space-weather" element={<SpaceWeatherWatch />} />
                <Route path="/earth" element={<LiveEarthSnapshot />} />
                <Route path="/mars" element={<MarsCorner />} />
                <Route path="/orbit" element={<OrbitTracker />} />
              </Routes>
            </Box>
          </Box>
        </SpaceLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
