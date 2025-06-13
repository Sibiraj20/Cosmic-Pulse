import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

function AsteroidsIncoming() {
  const [neos, setNeos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNeos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/neo');
        const today = new Date().toISOString().split('T')[0];
        const todayNeos = response.data.near_earth_objects[today] || [];
        setNeos(todayNeos);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching NEO data:', error);
        setLoading(false);
      }
    };

    fetchNeos();
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
        Asteroids Incoming
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Near Earth Objects for Today
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Estimated Diameter (m)</TableCell>
              <TableCell align="right">Miss Distance (km)</TableCell>
              <TableCell align="right">Velocity (km/h)</TableCell>
              <TableCell align="right">Hazardous</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {neos.map((neo) => (
              <TableRow key={neo.id}>
                <TableCell component="th" scope="row">
                  {neo.name}
                </TableCell>
                <TableCell align="right">
                  {neo.estimated_diameter.meters.estimated_diameter_min.toFixed(2)} -{' '}
                  {neo.estimated_diameter.meters.estimated_diameter_max.toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  {neo.close_approach_data[0].miss_distance.kilometers}
                </TableCell>
                <TableCell align="right">
                  {neo.close_approach_data[0].relative_velocity.kilometers_per_hour}
                </TableCell>
                <TableCell align="right">
                  {neo.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default AsteroidsIncoming; 