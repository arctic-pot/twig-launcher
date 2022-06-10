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
  Theme,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import { ipcRenderer } from 'electron';
// eslint-disable-next-line import/no-unresolved
import HomePage from '@/ui/pages/HomePage';
import SponsorPage from '@/ui/pages/SponsorPage';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Navigation from '@/ui/Navigation';
import AccountsPage from '@/ui/pages/AccountsPage';
import { RecoilRoot } from 'recoil';
import { VersionsPage } from "@/ui/pages/VersionsPage";
import SettingsPage from "@/ui/pages/SettingsPage";

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
    allVariants: {
      textTransform: 'none',
    },
  },
  palette: {},
  components: {
    MuiIcon: {
      defaultProps: {
        baseClassName: 'material-symbols',
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'filled',
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        // root: {
        //   borderRadius: 99,
        // },
        sizeSmall: {
          padding: '5px 10px',
        },
        sizeMedium: {
          padding: '8px 20px',
        },
        sizeLarge: {
          padding: '10px 24px',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          // borderRadius: 8,
        },
      },
    },
  },
});

export default function App(): React.ReactElement {
  const [maximized, setMaximized] = useState(false);
  useEffect(() => {
    ipcRenderer.on('maximize', () => setMaximized(true));
    ipcRenderer.on('unmaximize', () => setMaximized(false));
  }, []);

  return (
    <HashRouter>
      <RecoilRoot>
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
            <Stack sx={{ flexGrow: 1 }} direction="row">
              <Navigation />
              <Divider orientation="vertical" flexItem />
              <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ width: '100%', height: '100%' }}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/accounts" element={<AccountsPage />} />
                    <Route path="/versions" element={<VersionsPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/sponsor" element={<SponsorPage />} />
                  </Routes>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </ThemeProvider>
      </RecoilRoot>
    </HashRouter>
  );
}
