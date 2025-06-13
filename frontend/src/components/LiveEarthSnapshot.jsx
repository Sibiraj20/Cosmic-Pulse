import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import axios from 'axios';
import WarningIcon from '@mui/icons-material/Warning';
import PublicIcon from '@mui/icons-material/Public';

function LiveEarthSnapshot() {
  const [epicData, setEpicData] = useState(null);
  const [earthEvents, setEarthEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [epicRes, eventsRes] = await Promise.all([
          axios.get('http://localhost:8000/api/epic'),
          axios.get('http://localhost:8000/api/eonet'),
        ]);

        setEpicData(epicRes.data[0]);
        setEarthEvents(eventsRes.data.events.slice(0, 5)); // Get first 5 events
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Live Earth Snapshot
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={`https://epic.gsfc.nasa.gov/archive/natural/${epicData?.date.split(' ')[0].replace(/-/g, '/')}/png/${epicData?.image}.png`}
              alt="Earth from space"
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Earth from DSCOVR Satellite
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Captured on: {epicData?.date}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Natural Events
              </Typography>
              <List>
                {earthEvents.map((event) => (
                  <ListItem key={event.id}>
                    <ListItemIcon>
                      <WarningIcon color="error" />
                    </ListItemIcon>
                    <ListItemText
                      primary={event.title}
                      secondary={`Category: ${event.categories[0].title}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LiveEarthSnapshot; 