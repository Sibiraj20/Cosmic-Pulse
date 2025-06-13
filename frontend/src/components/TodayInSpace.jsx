import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

function TodayInSpace() {
  const [apod, setApod] = useState(null);
  const [exoplanet, setExoplanet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [apodRes, exoplanetRes] = await Promise.all([
          axios.get('http://localhost:8000/api/apod'),
          axios.get('http://localhost:8000/api/exoplanets'),
        ]);

        setApod(apodRes.data);
        // Get a random exoplanet from the list
        const exoplanets = exoplanetRes.data;
        setExoplanet(exoplanets[Math.floor(Math.random() * exoplanets.length)]);
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
        Today in Space
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={apod?.url}
              alt={apod?.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {apod?.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {apod?.explanation}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Exoplanet Discovery
              </Typography>
              {exoplanet && (
                <>
                  <Typography variant="subtitle1">
                    {exoplanet.pl_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Host Star: {exoplanet.hostname}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Discovery Year: {exoplanet.disc_year}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Orbital Period: {exoplanet.pl_orbper} days
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Radius: {exoplanet.pl_rade} Earth radii
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Mass: {exoplanet.pl_bmasse} Earth masses
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TodayInSpace; 