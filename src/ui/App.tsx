import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  ButtonBase,
  createTheme,
  Divider,
  Icon,
  Stack,
  styled,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import { ipcRenderer } from 'electron';
import Navigation, { Page, NavContext } from './Navigation';
// eslint-disable-next-line import/no-unresolved
import HomePage from '@/ui/pages/HomePage';

const OperationButton = styled(ButtonBase)({
  width: 48,
  height: '100%',
});

const theme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  components: {
    MuiIcon: {
      defaultProps: {
        baseClassName: 'material-symbols-outlined',
      },
    },
  },
});

export default function App(): React.ReactElement {
  const [page, setPage] = useState(Page.home);
  const [maximized, setMaximized] = useState(false);
  useEffect(() => {
    ipcRenderer.on('maximize', () => setMaximized(true));
    ipcRenderer.on('unmaximize', () => setMaximized(false));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Stack direction="column" sx={{ width: '100vw', height: '100vh' }}>
        <AppBar position="static">
          <Toolbar
            variant="dense"
            sx={{
              WebkitAppRegion: 'drag',
              '& .nd': { WebkitAppRegion: 'no-drag' },
            }}
          >
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Twig Launcher
            </Typography>
            <Stack
              sx={{ position: 'absolute', top: 0, right: 0, height: '100%' }}
              className="nd"
              direction="row"
            >
              <OperationButton onClick={() => ipcRenderer.send('minimize')}>
                <Icon>minimize</Icon>
              </OperationButton>
              {maximized ? (
                <OperationButton onClick={() => ipcRenderer.send('unmaximize')}>
                  <Icon>fullscreen_exit</Icon>
                </OperationButton>
              ) : (
                <OperationButton onClick={() => ipcRenderer.send('maximize')}>
                  <Icon>fullscreen</Icon>
                </OperationButton>
              )}
              <OperationButton onClick={() => ipcRenderer.send('close')}>
                <Icon>close</Icon>
              </OperationButton>
            </Stack>
          </Toolbar>
        </AppBar>
        <NavContext.Provider value={[page, setPage]}>
          <Stack sx={{ flexGrow: 1 }} direction="row">
            <Navigation />
            <Divider orientation="vertical" flexItem />
            <Box sx={{ flexGrow: 1 }}>
              {/*<Box sx={{ position: 'absolute', top: 0, left: 0 }}>*/}
              {/*  <></>*/}
              {/*</Box>*/}
              <Box sx={{ width: '100%', height: '100%' }}>
                {{ [Page.home]: <HomePage /> }[page as number] ?? <>wip</>}
              </Box>
            </Box>
          </Stack>
        </NavContext.Provider>
      </Stack>
    </ThemeProvider>
  );
}
