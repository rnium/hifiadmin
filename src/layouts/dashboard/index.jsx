import { Spin } from 'antd';
import { useState } from 'react';
import PropTypes from 'prop-types';

import { Box } from '@mui/material'

import { useRouter } from 'src/routes/hooks';

import { useUser } from 'src/hooks/useUser';

import Nav from './nav';
import Main from './main';
import Header from './header';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const { userIsAuthenticated, userIsLoaded } = useUser();
  const [openNav, setOpenNav] = useState(false);
  const router = useRouter();

  if (userIsLoaded && !userIsAuthenticated) {
    router.push('/login');
  } else if (!userIsLoaded) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ mt: '20vh' }}>
          <Spin
            size='large'
          />
        </Box>
      </Box>
    )
  }

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main>{children}</Main>
      </Box>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
