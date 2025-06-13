import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Chip,
} from '@mui/material';
import axios from 'axios';

function SpaceWeatherWatch() {
  const [spaceWeather, setSpaceWeather] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpaceWeather = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/donki');
        setSpaceWeather(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching space weather data:', error);
        setLoading(false);
      }
    };

    fetchSpaceWeather();
  }, []);

  const getEventTypeColor = (type) => {
    const colors = {
      'CME': 'error',
      'FLR': 'warning',
      'GST': 'info',
      'IPS': 'success',
    };
    return colors[type] || 'default';
  };

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
        Space Weather Watch
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Latest Space Weather Events
      </Typography>
      <Grid container spacing={3}>
        {spaceWeather.map((event) => (
          <Grid item xs={12} md={6} key={event.messageID}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" component="div">
                    {event.messageType}
                  </Typography>
                  <Chip
                    label={event.messageType}
                    color={getEventTypeColor(event.messageType)}
                    size="small"
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {new Date(event.messageIssueTime).toLocaleString()}
                </Typography>
                <Typography variant="body1">
                  {event.messageBody}
                </Typography>
                {event.link && (
                  <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                    <a href={event.link} target="_blank" rel="noopener noreferrer">
                      Learn More
                    </a>
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default SpaceWeatherWatch; 