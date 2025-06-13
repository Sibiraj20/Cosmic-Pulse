import { Grid, Paper, Typography, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ImageIcon from '@mui/icons-material/Image';
import WarningIcon from '@mui/icons-material/Warning';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import PublicIcon from '@mui/icons-material/Public';
import TerrainIcon from '@mui/icons-material/Terrain';
import SatelliteIcon from '@mui/icons-material/Satellite';

const dashboardItems = [
  {
    title: 'Today in Space',
    description: 'Astronomy Picture of the Day and space facts',
    icon: <ImageIcon sx={{ fontSize: 40 }} />,
    path: '/today',
  },
  {
    title: 'Asteroids Incoming',
    description: 'Track near-Earth objects and potential impacts',
    icon: <WarningIcon sx={{ fontSize: 40 }} />,
    path: '/asteroids',
  },
  {
    title: 'Space Weather Watch',
    description: 'Monitor solar activity and space weather events',
    icon: <WbSunnyIcon sx={{ fontSize: 40 }} />,
    path: '/space-weather',
  },
  {
    title: 'Live Earth Snapshot',
    description: 'View Earth from space and track natural events',
    icon: <PublicIcon sx={{ fontSize: 40 }} />,
    path: '/earth',
  },
  {
    title: 'Mars Corner',
    description: 'Current weather and conditions on Mars',
    icon: <TerrainIcon sx={{ fontSize: 40 }} />,
    path: '/mars',
  },
  {
    title: 'Orbit Tracker',
    description: 'Track satellites and space objects in real-time',
    icon: <SatelliteIcon sx={{ fontSize: 40 }} />,
    path: '/orbit',
  },
];

function Dashboard() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Cosmic Pulse
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Your daily dose of space awareness
      </Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {dashboardItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.title}>
            <Paper
              component={RouterLink}
              to={item.path}
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              {item.icon}
              <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                {item.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Dashboard; 