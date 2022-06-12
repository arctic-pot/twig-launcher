import React from 'react';
import {
  Box,
  Button,
  Chip,
  Divider,
  Icon,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { getVersionDetails, versionState } from '@/base/version';
import { shell } from 'electron';

export default function HomePage(): React.ReactElement {
  //const [, setPage] = useNavigate();
  const [game] = useRecoilState(versionState);
  const navigate = useNavigate();

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
      {process.env.NODE_ENV === 'development' && (
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            bottom: 0,
          }}
        >
          <Typography fontSize={12}>Debug version / 调试版本</Typography>
        </Box>
      )}
      <Stack
        sx={{
          position: 'absolute',
          bottom: 32,
          left: 32,
          right: 32,
          alignItems: 'flex-end',
          gap: '32px',
        }}
        direction="row"
      >
        <Paper sx={{ p: 2, width: '65.5%', flexGrow: 1 }}>
          <Stack direction="row" gap={0.5}>
            <Typography variant="h6" sx={{ mr: 0.5 }}>
              {game.displayName}
            </Typography>
            <IconButton size="small" onClick={() => navigate('/versions')}>
              <Icon>build</Icon>
            </IconButton>
            <IconButton size="small" onClick={() => shell.openPath(game.path)}>
              <Icon>folder</Icon>
            </IconButton>
            <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 0.5 }} />
            <IconButton size="small" onClick={() => navigate('/mods')}>
              <Icon>widgets</Icon>
            </IconButton>
          </Stack>
          <br />
          <Stack direction="row" gap={1}>
            {getVersionDetails(game).map((detail) => (
              <Chip key={detail} label={detail} />
            ))}
          </Stack>
        </Paper>
        <Button
          variant="contained"
          size="large"
          startIcon={<Icon>rocket_launch</Icon>}
          sx={{ height: 84, minWidth: 184 }}
          disableElevation={false}
        >
          Launch Game
        </Button>
      </Stack>
      {/*<Stack*/}
      {/*  sx={{ position: 'absolute', bottom: 32, right: 32, alignItems: 'flex-end' }}*/}
      {/*  direction="column"*/}
      {/*  gap={1}*/}
      {/*>*/}
      {/*  <ButtonGroup variant="text">*/}
      {/*    /!*<Button startIcon={<Icon>person</Icon>} size="small">*!/*/}
      {/*    /!*  TheColdPot*!/*/}
      {/*    /!*</Button>*!/*/}
      {/*    /!*<Button size="small" onClick={() => navigate('/accounts')}>*!/*/}
      {/*    /!*  <Icon fontSize="small">settings</Icon>*!/*/}
      {/*    /!*</Button>*!/*/}
      {/*  </ButtonGroup>*/}
      {/*</Stack>*/}
    </Box>
  );
}
