import { Box } from '@mui/material';
import React from 'react';
import { Typing } from '../components/typing/Typing';
import { Footer } from '../components/footer/Footer';

const Home = () => {
  return (
    <Box width={'100%'} height={'100%'}>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          mx: 'auto',
          mt: 3,
        }}
      >
        <Box>
          <Typing />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;
