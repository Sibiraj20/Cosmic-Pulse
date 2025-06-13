import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AirIcon from '@mui/icons-material/Air';
import SpeedIcon from '@mui/icons-material/Speed';

function MarsCorner() {
  const [marsData, setMarsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarsData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/mars');
        // Get the latest sol data
        const sols = response.data.sol_keys;
        const latestSol = sols[sols.length - 1];
        setMarsData({
          ...response.data[latestSol],
          sol: latestSol,
          season: response.data.season
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Mars data:', error);
        setLoading(false);
      }
    };

    fetchMarsData();
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
        Mars Corner
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Current Weather on Mars
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Temperature
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ThermostatIcon sx={{ mr: 1 }} />
                <Typography variant="h4">
                  {marsData?.AT?.av?.toFixed(1)}°C
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Min: {marsData?.AT?.mn?.toFixed(1)}°C | Max: {marsData?.AT?.mx?.toFixed(1)}°C
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Wind
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AirIcon sx={{ mr: 1 }} />
                <Typography variant="h4">
                  {marsData?.HWS?.av?.toFixed(1)} m/s
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Direction: {marsData?.WD?.most_common?.compass_point || 'N/A'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Pressure
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SpeedIcon sx={{ mr: 1 }} />
                <Typography variant="h4">
                  {marsData?.PRE?.av?.toFixed(1)} Pa
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Additional Information
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sol: {marsData?.sol}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Season: {marsData?.season}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Last Updated: {new Date().toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MarsCorner; 