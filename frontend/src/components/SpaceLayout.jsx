import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import styled from '@emotion/styled';

// Enhanced animated star field background with multiple layers
const StarField = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: '#000',
  overflow: 'hidden',
  zIndex: 0,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(1px 1px at 20px 30px, #fff, rgba(0,0,0,0)),
      radial-gradient(1px 1px at 40px 70px, #fff, rgba(0,0,0,0)),
      radial-gradient(1px 1px at 50px 160px, #fff, rgba(0,0,0,0)),
      radial-gradient(1px 1px at 90px 40px, #fff, rgba(0,0,0,0)),
      radial-gradient(1px 1px at 130px 80px, #fff, rgba(0,0,0,0)),
      radial-gradient(1px 1px at 160px 120px, #fff, rgba(0,0,0,0)),
      radial-gradient(2px 2px at 200px 200px, #fff, rgba(0,0,0,0)),
      radial-gradient(2px 2px at 300px 300px, #fff, rgba(0,0,0,0)),
      radial-gradient(2px 2px at 400px 400px, #fff, rgba(0,0,0,0)),
      radial-gradient(3px 3px at 500px 500px, #fff, rgba(0,0,0,0)),
      radial-gradient(1px 1px at 100px 100px, #90caf9, rgba(0,0,0,0)),
      radial-gradient(1px 1px at 200px 200px, #f48fb1, rgba(0,0,0,0)),
      radial-gradient(1px 1px at 300px 300px, #81c784, rgba(0,0,0,0))
    `,
    backgroundRepeat: 'repeat',
    backgroundSize: '600px 600px',
    animation: 'twinkle 4s infinite',
    opacity: 0.3,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(2px 2px at 150px 150px, #fff, rgba(0,0,0,0)),
      radial-gradient(2px 2px at 250px 250px, #fff, rgba(0,0,0,0)),
      radial-gradient(2px 2px at 350px 350px, #fff, rgba(0,0,0,0))
    `,
    backgroundRepeat: 'repeat',
    backgroundSize: '400px 400px',
    animation: 'twinkle 3s infinite',
    opacity: 0.2,
  },
  '@keyframes twinkle': {
    '0%': { opacity: 0.3 },
    '50%': { opacity: 0.8 },
    '100%': { opacity: 0.3 },
  }
});

// Nebula effect
const Nebula = styled(Box)({
  position: 'fixed',
  top: '20%',
  left: '10%',
  width: '300px',
  height: '300px',
  background: 'radial-gradient(circle at center, rgba(144, 202, 249, 0.1), transparent 70%)',
  borderRadius: '50%',
  zIndex: 1,
  animation: 'pulse 8s ease-in-out infinite',
  '@keyframes pulse': {
    '0%': { transform: 'scale(1)', opacity: 0.1 },
    '50%': { transform: 'scale(1.2)', opacity: 0.2 },
    '100%': { transform: 'scale(1)', opacity: 0.1 },
  }
});

// Enhanced animated Earth with continents
const Earth = styled(Box)({
  position: 'fixed',
  width: '400px',
  height: '400px',
  right: '-150px',
  bottom: '-150px',
  background: `
    radial-gradient(circle at center, #1a237e 0%, #000051 100%),
    linear-gradient(45deg, rgba(26, 35, 126, 0.3) 0%, rgba(0, 0, 81, 0.3) 100%)
  `,
  borderRadius: '50%',
  boxShadow: '0 0 100px rgba(26, 35, 126, 0.5)',
  opacity: 0.15,
  zIndex: 1,
  animation: 'rotate 60s linear infinite',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Blue_Marble_2002.png/1200px-Blue_Marble_2002.png")',
    backgroundSize: 'cover',
    borderRadius: '50%',
    opacity: 0.1,
    animation: 'rotate 60s linear infinite',
  },
  '@keyframes rotate': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  }
});

// Space debris particles
const Debris = styled(Box)({
  position: 'fixed',
  width: '2px',
  height: '2px',
  background: '#fff',
  borderRadius: '50%',
  zIndex: 2,
  animation: 'float 10s linear infinite',
  '@keyframes float': {
    '0%': { transform: 'translateY(0) translateX(0)' },
    '25%': { transform: 'translateY(-100px) translateX(50px)' },
    '50%': { transform: 'translateY(-200px) translateX(0)' },
    '75%': { transform: 'translateY(-100px) translateX(-50px)' },
    '100%': { transform: 'translateY(0) translateX(0)' },
  }
});

// Multiple debris particles
const DebrisField = () => (
  <>
    <Debris sx={{ top: '20%', left: '30%', animationDelay: '0s' }} />
    <Debris sx={{ top: '40%', left: '60%', animationDelay: '2s' }} />
    <Debris sx={{ top: '60%', left: '20%', animationDelay: '4s' }} />
    <Debris sx={{ top: '30%', left: '80%', animationDelay: '6s' }} />
    <Debris sx={{ top: '70%', left: '40%', animationDelay: '8s' }} />
  </>
);

// Enhanced animated satellite with trail
const Satellite = styled(Box)({
  position: 'fixed',
  width: '20px',
  height: '20px',
  background: '#fff',
  borderRadius: '50%',
  boxShadow: '0 0 20px #fff',
  zIndex: 2,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '8px',
    height: '8px',
    background: '#1a237e',
    borderRadius: '50%',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100px',
    height: '2px',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5))',
    transform: 'translate(-100%, -50%)',
    animation: 'trail 20s linear infinite',
  },
});

// Multiple satellites with different paths
const Satellite1 = styled(Satellite)({
  animation: 'orbit1 30s linear infinite',
  '@keyframes orbit1': {
    '0%': { transform: 'translate(0vw, 0vh)' },
    '25%': { transform: 'translate(100vw, 50vh)' },
    '50%': { transform: 'translate(50vw, 100vh)' },
    '75%': { transform: 'translate(-50vw, 50vh)' },
    '100%': { transform: 'translate(0vw, 0vh)' },
  }
});

const Satellite2 = styled(Satellite)({
  animation: 'orbit2 25s linear infinite',
  '&::before': {
    background: '#f48fb1',
  },
  '@keyframes orbit2': {
    '0%': { transform: 'translate(100vw, 0vh)' },
    '25%': { transform: 'translate(0vw, 100vh)' },
    '50%': { transform: 'translate(-50vw, 50vh)' },
    '75%': { transform: 'translate(50vw, 0vh)' },
    '100%': { transform: 'translate(100vw, 0vh)' },
  }
});

const Satellite3 = styled(Satellite)({
  animation: 'orbit3 35s linear infinite',
  '&::before': {
    background: '#81c784',
  },
  '@keyframes orbit3': {
    '0%': { transform: 'translate(-50vw, 100vh)' },
    '25%': { transform: 'translate(100vw, 50vh)' },
    '50%': { transform: 'translate(50vw, -50vh)' },
    '75%': { transform: 'translate(-100vw, 50vh)' },
    '100%': { transform: 'translate(-50vw, 100vh)' },
  }
});

const Satellite4 = styled(Satellite)({
  animation: 'orbit4 40s linear infinite',
  '&::before': {
    background: '#ffb74d',
  },
  '@keyframes orbit4': {
    '0%': { transform: 'translate(50vw, -50vh)' },
    '25%': { transform: 'translate(-100vw, 50vh)' },
    '50%': { transform: 'translate(0vw, 100vh)' },
    '75%': { transform: 'translate(100vw, 0vh)' },
    '100%': { transform: 'translate(50vw, -50vh)' },
  }
});

// Satellite group component
const Satellites = () => (
  <>
    <Satellite1 />
    <Satellite2 />
    <Satellite3 />
    <Satellite4 />
  </>
);

// Enhanced animated meteor with glow
const Meteor = styled(Box)({
  position: 'fixed',
  width: '3px',
  height: '3px',
  background: 'linear-gradient(45deg, #fff, transparent)',
  boxShadow: '0 0 10px #fff',
  animation: 'meteor 3s linear infinite',
  zIndex: 2,
  '@keyframes meteor': {
    '0%': {
      transform: 'rotate(45deg) translateX(0)',
      opacity: 1,
    },
    '70%': {
      opacity: 1,
    },
    '100%': {
      transform: 'rotate(45deg) translateX(-1000px)',
      opacity: 0,
    },
  }
});

// Multiple meteors with different positions and delays
const Meteors = () => (
  <>
    <Meteor sx={{ top: '10%', left: '20%', animationDelay: '0s' }} />
    <Meteor sx={{ top: '30%', left: '50%', animationDelay: '1s' }} />
    <Meteor sx={{ top: '50%', left: '80%', animationDelay: '2s' }} />
    <Meteor sx={{ top: '70%', left: '30%', animationDelay: '0.5s' }} />
    <Meteor sx={{ top: '20%', left: '70%', animationDelay: '1.5s' }} />
    <Meteor sx={{ top: '40%', left: '90%', animationDelay: '2.5s' }} />
    <Meteor sx={{ top: '60%', left: '10%', animationDelay: '3s' }} />
    <Meteor sx={{ top: '25%', left: '40%', animationDelay: '1.2s' }} />
    <Meteor sx={{ top: '45%', left: '60%', animationDelay: '2.2s' }} />
    <Meteor sx={{ top: '65%', left: '85%', animationDelay: '3.2s' }} />
  </>
);

// Main content container with enhanced glassmorphism
const ContentContainer = styled(Container)({
  position: 'relative',
  zIndex: 3,
  paddingTop: '2rem',
  paddingBottom: '2rem',
  '& .MuiPaper-root': {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#fff',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 5px 15px rgba(26, 35, 126, 0.3)',
    },
  },
  '& .MuiTypography-root': {
    color: '#fff',
  },
});

// Styled Footer component
const Footer = styled(Box)({
  position: 'relative',
  zIndex: 3,
  padding: '2rem 0',
  marginTop: 'auto',
  textAlign: 'center',
  color: '#fff',
  '& a': {
    color: '#90caf9',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#f48fb1',
    },
  },
  '& em': {
    color: '#81c784',
    fontStyle: 'italic',
  },
  '& .footer-content': {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    padding: '1.5rem',
    margin: '0 auto',
    maxWidth: '800px',
  },
  '& .footer-divider': {
    width: '50px',
    height: '2px',
    background: 'linear-gradient(90deg, transparent, #90caf9, transparent)',
    margin: '1rem auto',
  }
});

const SpaceLayout = ({ children }) => {
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: '#000', 
      position: 'relative', 
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <StarField />
      <Nebula />
      <Earth />
      <Satellites />
      <DebrisField />
      <Meteors />
      <ContentContainer maxWidth="lg" sx={{ flex: 1 }}>
        {children}
      </ContentContainer>
      <Footer>
        <div className="footer-content">
          <Typography variant="body1" sx={{ mb: 1 }}>
            🚀 Crafted with curiosity by <strong>Sibiraj T</strong>
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            💡 Inspired by the cosmos, driven by code.
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            📡 Live data powered by NASA's open APIs
          </Typography>
          <div className="footer-divider" />
          <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic' }}>
            "Somewhere, something incredible is waiting to be known." – Carl Sagan
          </Typography>
          <Typography variant="body2">
            🛠️ <Link href="https://github.com/Sibiraj20/Cosmic-Pulse" target="_blank">View Source Code</Link> | 
            📝 <Link href="https://www.linkedin.com/in/sibirajthirumoorthy/" target="_blank">Connect on LinkedIn</Link>
          </Typography>
        </div>
      </Footer>
    </Box>
  );
};

export default SpaceLayout; 