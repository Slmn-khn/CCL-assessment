import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';

import UserList from './components/UsersTable/UserList';
import UserDetail from './components/UserDetails';
import ErrorBoundary from './components/ErrorBoundary';

import { headerFooterText } from './const'

const App: React.FC = () => {
  const HeaderFooterView = () => (
    <Box component="header" textAlign="center" bgcolor="primary.main" p={2}>
      <Typography variant="h5" color="white">
        {headerFooterText}
      </Typography>
    </Box>
  )
  return (
    <Router>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <HeaderFooterView />
        <Container component="main" sx={{ flex: 1, py: 3 }}>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<UserList />} />
              <Route path="/users/:id" element={<UserDetail />} />
            </Routes>
          </ErrorBoundary>
        </Container>
        <HeaderFooterView />
      </Box>
    </Router>
  );
}

export default App;
