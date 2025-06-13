import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const navItems = [
  { name: 'Dashboard', path: '/' },
  { name: 'Today in Space', path: '/today' },
  { name: 'Asteroids', path: '/asteroids' },
  { name: 'Space Weather', path: '/space-weather' },
  { name: 'Earth', path: '/earth' },
  { name: 'Mars', path: '/mars' },
  { name: 'Orbit Tracker', path: '/orbit' },
];

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <RocketLaunchIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Cosmic Pulse
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {navItems.map((item) => (
            <Button
              key={item.name}
              color="inherit"
              component={RouterLink}
              to={item.path}
            >
              {item.name}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 