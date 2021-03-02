import { Box, Container, CssBaseline, Typography } from '@material-ui/core';
import React from 'react';

const Wrapper: React.FC = ({ children }) => {
  return (
    <Box position='relative' overflow='hidden' width='100%' py={4}>
      <CssBaseline />
      <Container maxWidth='md'>
        <Box mb={3}>
          <Typography variant='h2' align='center' color="primary">
            Todos List
          </Typography>
        </Box>
        {children}
      </Container>
    </Box>
  );
};

export default Wrapper;
